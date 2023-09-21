/* eslint-disable react/prop-types */
import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './tray.css';
import { useEffect } from "react";
import MovieCard from "../card";
import Skeleton from "../utils/Skeleton";
import useApi from "../../hooks/useApiService";

function ArrowNext({ onClick }) {
    return (
        <div className="arrow-bg">
            <div onClick={onClick} className="arrow arrow-next"><ArrowForwardIosRounded /></div>
        </div>
    );
}

function ArrowPrev({ onClick }) {
    return (
        <div className="arrow-bg">
            <div onClick={onClick} id='prevArrow' className="arrow arrow-prev"><ArrowBackIosRounded /></div>
        </div>
    );
}

const settings = {
    speed: 500,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 8,
    initialSlide: 0,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    responsive: [
        {
            breakpoint: 1800,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
    ]
};



const Tray = ({ heading, pageNumber = 1, type = 'movie', keywords, cast }) => {
    const { data, loading, get } = useApi();
    const navigate = useNavigate();

    let queryObj = { type: type };
    if (keywords) {
        queryObj = { keywords: keywords };
    } else if (cast) {
        queryObj = { cast: cast }
    }
    const queryString = JSON.stringify(queryObj);

    useEffect(() => {
        get(`/show?filter=${queryString}&page=${pageNumber}&limit=16`);
    }, []);

    const handleClick = () => {
        navigate(`/more/${type}/${heading}`);
    }

    return (
        <div className="pl-4 pb-4">
            <div className="min-h-[1rem] my-4 mx-4 flex justify-between items-center">
                <h2 onClick={handleClick} className="text-white cursor-pointer capitalize  font-medium lg:text-lg">
                    {heading}
                </h2>
                <div onClick={handleClick} to={`/more/${heading}`} className="flex gap-1 text-sm items-center cursor-pointer justify-center text-[#A280F7] font-medium ">
                    <div>More</div>
                    <ArrowForwardIosRounded sx={{ fontSize: '16px' }} />
                </div>
            </div>
            <div className="tray mx-3" >
                <Slider {...settings}>
                    {
                        data?.map((movie) => (
                            <MovieCard scale={1.1} key={movie._id} {...movie} />
                        ))
                    }
                    {
                        loading &&
                        new Array(20).fill('').map((_, id) => (
                            <Skeleton key={id} />
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}

export default Tray;

