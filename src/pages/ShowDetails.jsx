import { Link, useNavigate, useParams } from "react-router-dom";
import Tray from "../components/tray";
import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useSelector } from "react-redux";
import { PiShareFat } from 'react-icons/pi';
import BuyButton from "../components/utils/BuyButton";
import { IconButton } from "@mui/material";
import ShareModal from "../components/utils/ShareModal";
import useApi from "../hooks/useApiService";

const ShowDetails = () => {
    const [expandDetails, setExpandDetails] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const { width } = useSelector(state => state.windowSize);
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: movieData, getSingle } = useApi();

    const handleOpenShare = () => {
        setOpenShare(true);
    }

    const handleCloseShare = () => {
        setOpenShare(false);
    }

    useEffect(() => {
        getSingle(`/show/${id}`);
    }, [id]);

    useEffect(() => {
        if (width >= 1200) {
            setExpandDetails(true);
        }
    }, [width]);

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

    const handleClick = (id) => {
        navigate(`/details/${id}`);
    }

    const handleMoreClick = (name) => {
        const heading = `${name}'s ${movieData?.type}s`;
        navigate(`/more/${movieData?.type}/${heading}`);
    }

    return (
        <>
            <div className={`bg-[#0f0617]`}>
                <div style={{ background: `url(${movieData?.thumbnail})` }} className={`showDetails flex relative flex-col top-0 overflow-hidden justify-center`}>
                    <div className={`${width > 1200 ? 'hidden' : ''} backgroundImageOverlay relative`}>
                        <img src={movieData?.thumbnail} alt={movieData?.title} />
                        <div className="absolute inset-0 bg-gradient-to-t  from-black to-transparent "></div>
                    </div>
                    <div className={`${width > 1200 ? 'absolute right-10 bottom-10' : 'relative pt-4'} pl-4 flex gap-4 items-center`}>
                        <IconButton color="inherit" onClick={() => handleClick(movieData?._id)}>
                            <PlayCircleIcon sx={{ fontSize: 48 }} />
                        </IconButton>
                        <BuyButton />
                    </div>
                    <div className={`showDetailsOverlay ${width > 1200 ? 'py-10' : ''} pl-8 flex flex-col gap-6 ${width >= 1200 ? 'px-24' : ''}`}>
                        <h3 className="font-bold text-2xl sm:text-3xl ">{movieData?.title}</h3>
                        <Link>
                            <div className="type capitalize text-xl text-[#a785ff]">{movieData?.type}</div>
                        </Link>
                        <div className="flex items-center gap-3 text-lg flex-wrap">
                            <span className="text-[#ffffff80]">2h 7m</span>
                            <div className="dot"></div>
                            {
                                movieData?.keywords?.map((item) => (
                                    <div key={item + Math.random() * 100} className="flex items-center gap-4">
                                        <span onClick={() => handleMoreClick(item)} className="text-[#a785ff] cursor-pointer capitalize">{item}</span>
                                        <div className="dot"></div>
                                    </div>
                                ))
                            }
                            <span className="text-[#ffffff80]">U/A 16+</span>
                        </div>
                        <div className="descriptionWrapper">
                            <div className={`relative ${expandDetails ? '' : 'line-clamp-2 text-ellipsis'}`}>
                                <p className="mr-20">{movieData?.description} {movieData?.description} {movieData?.description} {movieData?.description}</p>
                                <div onClick={() => setExpandDetails(!expandDetails)} className={`${expandDetails ? 'rotate-0' : 'rotate-180 '} absolute ${width >= 1200 ? 'hidden' : ''}  right-4 top-0 cursor-pointer`}><KeyboardArrowUpIcon sx={{ fontSize: 35 }} /></div>
                            </div>
                            {
                                expandDetails &&
                                <>
                                    <div className="castDiv mt-8">
                                        <p className="castTitle text-sm font-semibold mb-4 text-[#ffffff80]">Cast:</p>
                                        <div className="flex gap-4 mb-6">

                                            {
                                                movieData?.cast?.map((name) => (
                                                    <div onClick={() => handleMoreClick(name)} key={name + Math.random() * 100}>
                                                        <h2 className="cursor-pointer  castName font-medium text-base capitalize text-[#a785ff]">{name}</h2>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="createrDiv">
                                        <p className="castTitle mb-4 text-sm font-semibold text-[#ffffff80]">Creaters:</p>
                                        <p className="castName font-medium text-base capitalize mb-4">Director</p>
                                        <h2 onClick={() => handleMoreClick(movieData?.director)} className=" cursor-pointer text-base font-semibold mb-6 text-[#a785ff]">{movieData?.director}</h2>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="buttons flex flex-wrap w-fit gap-y-4">
                            <div onMouseLeave={handleCloseShare} onMouseMove={handleOpenShare} onClick={handleShare} className=" flex flex-col justify-around relative cursor-pointer items-center transition-all duration-500 py-5 px-8">
                                <PiShareFat className="h-7 w-7" />
                                <span className="text-sm mt-1 ">Share</span>
                                {
                                    openShare && <ShareModal />
                                }
                            </div>
                            <button onClick={() => handleClick(movieData?._id)} className=" flex flex-col items-center justify-around cursor-pointer  transition-all duration-500 p-4 px-10">
                                <PlayCircleIcon sx={{ fontSize: 35 }} />
                                <span className="text-sm  mt-1">Watch Promo</span>
                            </button>
                        </div>
                    </div>
                </div>

                <Tray heading={`${movieData?.type} You May Like`} type={movieData?.type} pageNumber={12} />
                {
                    movieData?.cast?.map((name) => (
                        <Tray key={name} cast={name} heading={`${name}`} pageNumber={1} />
                    ))
                }
                {
                    movieData?.keywords?.map((name) => (
                        <Tray key={name + Math.random() * 100} keywords={name} heading={`${name}`} pageNumber={1} />
                    ))
                }
            </div>
        </>
    )
}

export default ShowDetails;