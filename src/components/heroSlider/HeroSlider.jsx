/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './hero.css';
import { Typography } from "@mui/material";
import BuyButton from '../utils/BuyButton';
import WatchButton from "../utils/WatchButton";
import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApiService";

function ArrowNext({ onClick }) {
    return (
        <div onClick={onClick} className="arrow arrow-next"><ArrowForwardIosRounded fontSize='large' /></div>
    );
}

function ArrowPrev({ onClick }) {
    return (
        <div onClick={onClick} className="arrow arrow-prev"><ArrowBackIosRounded fontSize='large' /></div>
    );
}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    customPaging: () => (
        <div
            style={{
                color: 'transparent',
                backgroundColor: 'transparent'
            }}
        >.</div>
    ),
};

const HeroSlider = ({ type = 'movie', pageNumber = 2 }) => {
    const navigate = useNavigate();
    const handleOnClick = (id) => {
        navigate(`/details/${id}`);
    }
    const { data, get } = useApi();

    useEffect(() => {
        const queryObj = { type: type };
        const queryString = JSON.stringify(queryObj);
        get(`/show?filter=${queryString}&page=${pageNumber}&limit=7`);
    }, []);

    // /src/assets/hero/hero1.webp

    return (
        <div className="heroContainer lg:overflow-visible m-auto max-w-[1300px]  pb-4">
            <Slider {...settings}>
                {
                    data?.map(({ title, _id, thumbnail }, index) => (
                        <div key={_id}>
                            <div className="m-auto flex relative" >
                                <img onClick={() => handleOnClick(_id)} className="w-full h-full aspect-video cursor-pointer px-2 object-cover object-top max-h-[60vh]  m-auto" src={`/assets/hero/hero${index + 1}.webp`} alt={title} />

                                <div className="flex flex-col gap-2 absolute bottom-0 left-0 p-4 md:p-8 right-0 black-to-transparent">
                                    <Typography variant="p" sx={{ fontWeight: 'bold', fontFamily: 'Noto Sans, sans-serif' }}>{title}</Typography>
                                    <div className="flex gap-3">
                                        <WatchButton onClick={() => handleOnClick(_id)} />
                                        <BuyButton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
}

export default HeroSlider;
