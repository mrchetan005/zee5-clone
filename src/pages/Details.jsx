import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { PiShareFat } from 'react-icons/pi';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Tray from "../components/tray";
import MovieCard from "../components/card";
import AuthRequired from "../components/authCommon/AuthRequired";
import Popup from "../components/utils/Popup";
import Skeleton from "../components/utils/Skeleton";
import useApi from "../hooks/useApiService";
import ShareModal from "../components/utils/ShareModal";
import { addRemoveFromWatchlist, getWatchlistShows, checkIsAddedToWatchlist } from "../store/slices/watchlist";

const getUnique = (array) => array?.filter((name, index, array) => array.indexOf(name) === index);

const Details = () => {
    const location = useLocation();
    const { authenticated } = useSelector(state => state.auth);
    const [showPopup, setShowPopup] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const { width } = useSelector(state => state.windowSize);
    const { id } = useParams();
    const navigate = useNavigate();
    const randomPage = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
    const { data: recommendedData, loading, get: getRecommended } = useApi();
    const { data: movieData, getSingle } = useApi();
    const { shows, isAddedToWatchlist, fetchedShowsAlready, message } = useSelector(state => state.watchlist);

    const dispatch = useDispatch();

    useEffect(() => {
        if (authenticated) {
            dispatch(checkIsAddedToWatchlist(id));
            if (!fetchedShowsAlready) {
                dispatch(getWatchlistShows());
            }
        }
    }, [authenticated, shows, location]);

    useEffect(() => {
        getRecommended(`/show?page=${randomPage}&limit=10`);
        getSingle(`/show/${id}`);
    }, [id]);

    const uniqueCast = getUnique(movieData?.cast);
    const uniqueKeywords = getUnique(movieData?.keywords);

    const addToWatchList = async () => {
        if (authenticated) {
            setShowPopup(true);
            dispatch(addRemoveFromWatchlist(id));
        } else {
            setOpenAuthModal(true);
        }
    }

    const handleShare = async () => {
        if (!navigator.share) return;
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

    const handleMoreClick = (name) => {
        const heading = `${name}'s ${movieData?.type}`;
        navigate(`/more/${movieData?.type}/${heading}`);
    }

    const handleOpenShare = () => {
        setOpenShare(true);
    }

    const handleCloseShare = () => {
        setOpenShare(false);
    }

    return (
        <>
            <div className={` movieDetails ${width >= 1200 ? 'px-[5%]' : ''} bg-[#0f0617]`}>

                <div className={`flex top-0 relative justify-center`}>

                    <div className={`leftSection mb-6 flex-[2]`} >
                        <video autoPlay controls src={movieData?.video_url} className="w-full aspect-video mb-4"></video>

                        <div className="pl-4 flex flex-col gap-6">
                            <h3 className="font-bold  text-2xl sm:text-3xl">{movieData?.title}</h3>
                            <Link>
                                <div className="type capitalize text-xl text-[#a785ff]">{movieData?.type}</div>
                            </Link>
                            <div className="flex items-center gap-3 text-lg flex-wrap">
                                <span className="text-[#ffffff80]">2h 7m</span>
                                <div className="dot"></div>
                                {
                                    uniqueKeywords?.map((name) => (
                                        <React.Fragment key={name}>
                                            <div>
                                                <span onClick={() => handleMoreClick(name)} className="text-[#a785ff] cursor-pointer capitalize">{name}</span>
                                            </div>
                                            <div className="dot"></div>
                                        </React.Fragment>
                                    ))
                                }
                                <span className="text-[#ffffff80]">U/A 16+</span>
                            </div>
                            <div className="buttons relative flex flex-wrap w-fit gap-y-4">
                                <div onMouseLeave={handleCloseShare} onMouseMove={handleOpenShare} onClick={handleShare} className="bg-[#ffffff0a] relative  border-[#ffffff1a] flex flex-col justify-around items-center transition-all duration-500 cursor-pointer py-5 px-8">
                                    {
                                        openShare && <ShareModal />
                                    }
                                    <PiShareFat className="h-7 w-7" />
                                    <span className="text-sm mt-1 text-[#ffffff80]">Share</span>
                                </div>
                                <button onClick={addToWatchList} className={`${isAddedToWatchlist ? 'text-[#a785ff]' : ''} bg-[#ffffff0a] flex justify-around  border-[#ffffff1a] items-center p-4 px-6 flex-col`}>
                                    {
                                        isAddedToWatchlist
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
                                <div className={` relative`}>
                                    <p className="mr-20">{movieData?.description} {movieData?.description} {movieData?.description} {movieData?.description}</p>
                                </div>
                                <div className="castDiv mt-8">
                                    <p className="castTitle text-sm font-semibold mb-4 text-[#ffffff80]">Cast:</p>
                                    <div className="flex gap-4 mb-6">
                                        {
                                            uniqueCast?.map((name) => (
                                                <div key={name}>
                                                    <h2 onClick={() => handleMoreClick(name)} className="castName cursor-pointer font-medium text-base capitalize text-[#a785ff]">{name}</h2>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="createrDiv">
                                    <p className="castTitle mb-4 text-sm font-semibold text-[#ffffff80]">Creaters:</p>
                                    <p className="castName font-medium text-base capitalize mb-4">Director</p>
                                    <h2 onClick={() => handleMoreClick(movieData?.director)} className="text-base font-semibold cursor-pointer mb-6 text-[#a785ff]">{movieData?.director}</h2>
                                </div>
                            </div>

                        </div>
                    </div>

                    {
                        width >= 1200 &&
                        <div className={`rightSection overflow-y-auto px-1 relative flex-1`}>
                            <div className="absolute top-0 left-0 right-0">
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
                        </div>
                    }
                    {
                        !authenticated && openAuthModal &&
                        <AuthRequired setOpenAuthModal={setOpenAuthModal} />
                    }
                </div>

                <Tray heading={`${movieData?.type} You May Like`} type={movieData?.type} pageNumber={12} />
                {

                    uniqueCast?.map((name) => (
                        <Tray key={name} cast={name} heading={`${name}`} pageNumber={1} />
                    ))
                }
                {
                    uniqueKeywords?.map((name) => (
                        <Tray key={name} keywords={name} heading={`${name}`} pageNumber={1} />
                    ))
                }

                <div>
                    <h2 className="text-lg font-bold capitalize mb-4">Details about {movieData?.title} {movieData?.type}:</h2>
                    <div className="border-2 rounded-lg border-[#2c2531] py-2 px-4">
                        <div className="genre py-4 flex ">
                            <strong className="min-w-[100px] max-w-[100px]  pr-4">Genres</strong>
                            <ul className="flex flex-wrap gap-2">
                                {
                                    uniqueKeywords?.map((name) => (
                                        <li key={name} className="text-sm font-medium capitalize w-max rounded-full bg-[#ffffff14] py-[6px] px-3">{name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="genre py-2 flex ">
                            <strong className="min-w-[100px] max-w-[100px]  pr-4">Cast</strong>
                            <ul className="flex flex-wrap gap-2">
                                {
                                    uniqueCast?.map((name) => (
                                        <li key={name} className="text-sm font-medium capitalize w-max rounded-full bg-[#ffffff14] py-[6px] px-3">{name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="genre py-2 flex ">
                            <strong className="min-w-[100px] max-w-[100px] pr-4">Director</strong>
                            <ul className="flex flex-wrap gap-2">
                                <li className="text-sm font-medium capitalize w-max rounded-full bg-[#ffffff14] py-[6px] px-3">{movieData?.director}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Popup message={message} isOpen={showPopup} onClose={onClosePopUp} />
        </>
    )
}

export default Details;