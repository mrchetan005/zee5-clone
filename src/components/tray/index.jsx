/* eslint-disable react/prop-types */
import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
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
            <div onClick={onClick} className="arrow arrow-prev"><ArrowBackIosRounded /></div>
        </div>
    );
}

const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    swipeToSlide: true,
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

    useEffect(() => {
        let queryObj = { type: type };
        if (keywords) {
            queryObj = { keywords: keywords };
        } else if (cast) {
            queryObj = { cast: cast }
        }

        const queryString = JSON.stringify(queryObj);
        get(`/show?filter=${queryString}&page=${pageNumber}&limit=20`);
    }, []);

    return (
        <div className="pl-4 pb-4">
            <div className="min-h-[1rem] my-4 mx-4 flex justify-between items-center">
                <h2 className="text-white capitalize  font-medium">
                    <Link to={`/more/`}>{heading}</Link>
                </h2>
                <Link to={`/more/${heading}`} className="flex gap-1 text-sm items-center justify-center text-[#A280F7] font-medium ">
                    <div>More</div>
                    <ArrowForwardIosRounded sx={{ fontSize: '16px' }} />
                </Link>
            </div>
            <div className="tray mx-3 pr-0 sm:pr-10" >
                <Slider {...settings}>
                    {
                        data?.data?.map((movie) => (
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

