import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { PiShareFat } from 'react-icons/pi';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Tray from "../components/tray";
import MovieCard from "../components/card";
import AuthRequired from "../components/authCommon/AuthRequired";
import { addRemoveToWatchlist, getWatchlist } from "../api/watchlist";
import Popup from "../components/utils/Popup";
import Skeleton from "../components/utils/Skeleton";
import useApi from "../hooks/useApiService";
import api from "../api";

const getUnique = (array) => array?.filter((name, index, array) => array.indexOf(name) === index);

const Details = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [watchlistData, setWatchlistData] = useState({});
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [expandDetails, setExpandDetails] = useState(false);
    const [movieData, setMovieData] = useState({});
    const [isAdded, setIsAdded] = useState(fetchWatchlist());
    const { width } = useSelector(state => state.windowSize);
    const { authenticated } = useSelector(state => state.auth);
    const { id } = useParams();
    const randomPage = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
    const { data: recommendedData, loading, get: getRecommended } = useApi();

    useEffect(() => {
        setIsAdded(false);
        getRecommended(`/show?page=${randomPage}&limit=10`);
        (async () => {
            const data = await api.get(`/show/${id}`);
            setMovieData(data?.data?.data);
        })();
    }, [id]);

    let { video_url, title, description, director, cast, keywords, type } = movieData;
    const uniqueCast = getUnique(cast);
    const uniqueKeywords = getUnique(keywords);

    async function fetchWatchlist() {
        const list = await getWatchlist();
        const isPresentInList = list?.some((movie) => movie._id === movieData?._id);
        setIsAdded(isPresentInList);
    }

    const addToWatchList = async () => {
        if (authenticated) {
            const data = await addRemoveToWatchlist(movieData?._id);
            setWatchlistData(data);
            setShowPopup(true);
            const isAlreadyAdded = watchlistData?.data?.shows.some((movie) => movie._id === movieData?._id);
            setIsAdded(!isAlreadyAdded);
        } else {
            setOpenAuthModal(true);
        }
    }

    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'Shared from ZEE5 Cinema App',
                text: 'Check out this cool content!',
                url: location.href,
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    }

    const onClosePopUp = useCallback(() => setShowPopup(false), []);

    return (
        <>
            <div className={` movieDetails ${width >= 1200 ? 'px-[5%]' : ''} bg-[#0f0617]`}>

                <div className={`flex relative top-0 overflow-hidden justify-center h-screen`}>

                    <div className={`leftSection w-full overflow-y-auto mb-6 `}>
                        <video autoPlay controls src={video_url} className="w-full aspect-video mb-4"></video>

                        <div className="pl-4 flex flex-col gap-6">
                            <h3 className="font-bold text-4xl">{title}</h3>
                            <Link>
                                <div className="type capitalize text-xl text-[#a785ff]">{type}</div>
                            </Link>
                            <div className="flex items-center gap-3 text-lg">
                                <span className="text-[#ffffff80]">2h 7m</span>
                                <div className="dot"></div>
                                {
                                    uniqueKeywords?.map((name) => (
                                        <>
                                            <Link key={name + Math.random() * 100}>
                                                <span className="text-[#a785ff] capitalize">{name}</span>
                                            </Link>
                                            <div className="dot"></div>
                                        </>
                                    ))
                                }
                                <span className="text-[#ffffff80]">U/A 16+</span>
                            </div>
                            <div className="buttons flex flex-wrap w-fit gap-y-4">
                                <button onClick={handleShare} className="bg-[#ffffff0a]  border-[#ffffff1a] flex flex-col justify-around items-center transition-all duration-500 py-5 px-8">
                                    <PiShareFat className="h-7 w-7" />
                                    <span className="text-sm mt-1 text-[#ffffff80]">Share</span>
                                </button>
                                <button onClick={addToWatchList} className={`${isAdded ? 'text-[#a785ff]' : ''} bg-[#ffffff0a] flex justify-around  border-[#ffffff1a] items-center p-4 px-6 flex-col`}>
                                    {
                                        isAdded
                                            ? <PlaylistAddCheckIcon sx={{ fontSize: 35 }} />
                                            : <PlaylistAddOutlinedIcon sx={{ fontSize: 35 }} />
                                    }
                                    <span className="text-sm text-[#ffffff80]">Watchlist</span>
                                </button>
                                <button className="bg-[#ffffff22] flex flex-col items-center justify-around cursor-default opacity-50 transition-all duration-500 p-4 px-10">
                                    <PlayCircleIcon sx={{ fontSize: 35 }} />
                                    <span className="text-sm  mt-1 text-[#ffffff80]">Watch Trailer</span>
                                </button>
                            </div>
                            <div className="descriptionWrapper">
                                <div className={` relative line-clamp-2 text-ellipsis  `}>
                                    <p className="mr-20">{description} {description}</p>
                                    <div onClick={() => setExpandDetails(!expandDetails)} className={`${expandDetails ? 'rotate-0' : 'rotate-180 '} absolute right-4 top-0 cursor-pointer`}><KeyboardArrowUpIcon sx={{ fontSize: 35 }} /></div>
                                </div>
                                {
                                    expandDetails &&
                                    <>
                                        <div className="castDiv mt-8">
                                            <p className="castTitle text-sm font-semibold mb-4 text-[#ffffff80]">Cast:</p>
                                            <div className="flex gap-4 mb-6">
                                                {
                                                    uniqueCast?.map((name) => (
                                                        <Link key={name + Math.random() * 100}>
                                                            <h2 className="castName font-medium text-base capitalize text-[#a785ff]">{name}</h2>
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="createrDiv">
                                            <p className="castTitle mb-4 text-sm font-semibold text-[#ffffff80]">Creaters:</p>
                                            <p className="castName font-medium text-base capitalize mb-4">Director</p>
                                            <Link>
                                                <h2 className="text-base font-semibold mb-6 text-[#a785ff]">{director}</h2>
                                            </Link>
                                        </div>
                                    </>
                                }
                            </div>

                        </div>
                    </div>

                    {
                        width >= 1200 &&
                        <div className="rightSection h-screen overflow-y-auto px-1">
                            <h2 className="text-2xl font-bold text-[#d8d8d8] ml-[10px] pb-2">Recommended Movies For You</h2>
                            <div className="rightSectionMovies grid grid-cols-2">
                                {
                                    recommendedData?.map((movie) => (
                                        <MovieCard key={movie._id} {...movie} />
                                    ))
                                }
                                {
                                    loading &&
                                    new Array(20).fill('').map((_, id) => <Skeleton key={id} />)
                                }
                            </div>
                        </div>
                    }
                    {
                        !authenticated && openAuthModal &&
                        <AuthRequired setOpenAuthModal={setOpenAuthModal} />
                    }
                </div>

                <Tray heading={`${type} You May Like`} type={type} pageNumber={12} />
                {
                    uniqueCast?.map((name) => (
                        <Tray key={name + Math.random() * 100} cast={name} heading={`${name}`} pageNumber={1} />
                    ))
                }
                {
                    uniqueKeywords?.map((name) => (
                        <Tray key={name + Math.random() * 100} keywords={name} heading={`${name}`} pageNumber={1} />
                    ))
                }

                <div>
                    <h2 className="text-lg font-bold capitalize mb-4">Details about {title} {type}:</h2>
                    <div className="border-2 rounded-lg border-[#2c2531] py-2 px-4">
                        <div className="genre py-4 flex ">
                            <strong className="min-w-[100px] max-w-[100px]  pr-4">Genres</strong>
                            <ul className="flex flex-wrap gap-2">
                                {
                                    uniqueKeywords?.map((name) => (
                                        <li key={name + Math.random() * 100} className="text-sm font-medium capitalize w-max rounded-full bg-[#ffffff14] py-[6px] px-3">{name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="genre py-2 flex ">
                            <strong className="min-w-[100px] max-w-[100px]  pr-4">Cast</strong>
                            <ul className="flex flex-wrap gap-2">
                                {
                                    uniqueCast?.map((name) => (
                                        <li key={name + Math.random() * 100} className="text-sm font-medium capitalize w-max rounded-full bg-[#ffffff14] py-[6px] px-3">{name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="genre py-2 flex ">
                            <strong className="min-w-[100px] max-w-[100px] pr-4">Director</strong>
                            <ul className="flex flex-wrap gap-2">
                                <li className="text-sm font-medium capitalize w-max rounded-full bg-[#ffffff14] py-[6px] px-3">{director}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Popup message={watchlistData?.message} isOpen={showPopup} onClose={onClosePopUp} />
        </>
    )
}

export default Details;