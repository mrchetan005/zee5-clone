import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { setIsIntersecting } from '../../store/slices/intersection';
import { IconButton } from '@mui/material';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
    // const [expand, setExpand] = useState(false);
    const footerRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            dispatch(setIsIntersecting(entry.isIntersecting));
        }, {
            rootMargin: '500px',
        });

        footerRef?.current && observer.observe(footerRef?.current);
        return () => {
            observer.disconnect();
        }
    }, [dispatch])

    return (
        <footer ref={footerRef} className='w-full py-[1%] px-[5%]'>
            <div className='flex mt-8 justify-between lg:flex-row flex-col gap-8 items-center w-full'>
                <div className="storeIcons flex gap-4 items-center">
                    <h3 className="footerTitle hidden lg:block  text-[#d8d8d8] font-bold text-sm">Download Apps</h3>
                    <a href='https://play.google.com/store/apps/details?id=com.graymatrix.did' target='_blank' rel="noreferrer">
                        <img src={`/assets/icons/play_store.png`} alt="play_store" />
                    </a>
                    <a href='https://apps.apple.com/in/app/zee5-shows-live-tv-movies/id743691886' rel="noreferrer" target='_blank'>
                        <img src={`/assets/icons/app_store.png`} alt="app_store" />
                    </a>
                </div>
                <div className="socialIcons flex gap-4 items-center">
                    <h3 className="footerTitle lg:block hidden text-[#d8d8d8] font-bold text-sm">Connect with us</h3>
                    <a href='https://www.facebook.com/ZEE5/' target='_blank' rel="noreferrer">
                        <IconButton color='inherit' sx={{ '&:hover': { backgroundColor: '#3c5a99' } }}>
                            <AiFillFacebook />
                        </IconButton>
                    </a>
                    <a href='https://www.instagram.com/zee5/' target='_blank' rel="noreferrer">
                        <IconButton color='inherit' sx={{ '&:hover': { backgroundColor: '#dd2a7b' } }}>
                            <AiFillInstagram />
                        </IconButton>
                    </a>
                    <a href='https://twitter.com/zee5india' target='_blank' rel="noreferrer">
                        <IconButton color='inherit' sx={{ '&:hover': { backgroundColor: '#1da1f2' } }}>
                            <AiFillTwitterCircle />
                        </IconButton>
                    </a>
                    <a href='https://www.youtube.com/channel/UCXOgAl4w-FQero1ERbGHpXQ' target='_blank' rel="noreferrer">
                        <IconButton color='inherit' sx={{ '&:hover': { backgroundColor: '#c4302b' } }}>
                            <AiFillYoutube />
                        </IconButton>
                    </a>
                </div>
            </div>
            <ul className='flex flex-wrap gap-y-4 mt-8 justify-center lg:justify-start py-2 text-xs text-[#ffffffb2]'>
                <li className='border-r border-r-[#ffffff59] pr-6'>About Us</li>
                <li className='border-r border-r-[#ffffff59] px-6'>Help Center</li>
                <li className='border-r border-r-[#ffffff59] px-6'>Privacy Policy</li>
                <li className='border-r border-r-[#ffffff59] px-6'>Terms of Use</li>
                <li className='px-6'>Preferences</li>
            </ul>
            <div className="megaMenuFooter grid grid-cols-1 lg:grid-cols-6 lg:gap-8 pt-10">
                <div className='text-xs'>
                    <h3 className='text-white py-4 font-bold'>Movies By Language</h3>
                    <ul className='hidden lg:flex flex-col gap-4 text-[#d9d9d980]'>
                        <li>Hindi Movies</li>
                        <li>Telugu Movies</li>
                        <li>Tamil Movies</li>
                        <li>Kannada Movies</li>
                        <li>Marathi Movies</li>
                        <li>Bengali Movies</li>
                        <li>Malayalam Movies</li>
                        <li>English Movies</li>
                        <li>Bhojpuri Movies</li>
                        <li>Punjabi Movies</li>
                    </ul>
                </div>
                <div className='text-xs'>
                    <h3 className='text-white py-4 font-bold'>Movies By Genre</h3>
                    <ul className='hidden lg:flex flex-col gap-4  text-[#d9d9d980]'>
                        <h3>Movies By </h3>
                        <li>Action Movies</li>
                        <li>Comedy Movies</li>
                        <li>Romantic Movies</li>
                        <li>Horror Movies</li>
                        <li>Crime Movies</li>
                        <li>Thriller Movies</li>
                        <li>Animation Movies</li>
                        <li>Mythology Movies</li>
                        <li>War Movies</li>
                        <li>Sci-Fi Movies</li>
                    </ul>
                </div>
                <div className='text-xs'>
                    <h3 className='text-white py-4 font-bold'>Movies By Celeb</h3>
                    <ul className='hidden lg:flex flex-col gap-4 text-[#d9d9d980]'>
                        <h3>Movies By </h3>
                        <li>Salman Khan Movies</li>
                        <li>Sunny Leone Movies</li>
                        <li>Amitabh Bachhan Movies</li>
                        <li>Vicky Kaushal Movies</li>
                        <li>Nawazuddin Siddiqui Movies</li>
                        <li>Akshay Kumar Movies</li>
                        <li>Manoj Bajpayee Movies</li>
                        <li>Pooja Hegde Movies</li>
                        <li>Venkatesh Daggubati Movies</li>
                        <li>Sunny Deol Movies</li>
                    </ul>
                </div>
                <div className='text-xs'>
                    <h3 className='text-white py-4 font-bold'>Movies By Year</h3>
                    <ul className='hidden lg:flex flex-col gap-4 text-[#d9d9d980]'>
                        <h3>Movies By </h3>
                        <li>New Movies</li>
                        <li>2023 Movies</li>
                        <li>2022 Movies</li>
                        <li>2021 Movies</li>
                        <li>2020 Movies</li>
                        <li>2019 Movies</li>
                        <li>2018 Movies</li>
                        <li>2017 Movies</li>
                        <li>2016 Movies</li>
                        <li>2015 Movies</li>
                    </ul>
                </div>
                <div className='text-xs'>
                    <h3 className='text-white py-4 font-bold'>Top Bollywood Movies</h3>
                    <ul className='hidden lg:flex flex-col gap-4 text-[#d9d9d980]'>
                        <h3>Movies By </h3>
                        <li>Haddi</li>
                        <li>Kisi Ka Bhai Kisi Ki Jaan</li>
                        <li>Bandaa</li>
                        <li>The Kashmir Files</li>
                        <li>Uri: The Surgical Strike</li>
                        <li>Raksha Bandhan</li>
                        <li>Uunchai</li>
                        <li>Mrs Undercover</li>
                        <li>Jhund</li>
                        <li>Forensic</li>
                    </ul>
                </div>
                <div className='text-xs'>
                    <h3 className='text-white py-4 font-bold'>Top South Movies</h3>
                    <ul className='hidden lg:flex flex-col gap-4 text-[#d9d9d980]'>
                        <h3>Movies By </h3>
                        <li>RRR</li>
                        <li>Viduthalai Part-1</li>
                        <li>Agilan</li>
                        <li>Karthikeya 2</li>
                        <li>Macherla Niyojakavargam</li>
                        <li>Vikram</li>
                        <li>Captian</li>
                        <li>Valimai</li>
                        <li>Paappan</li>
                        <li>Vedha</li>
                    </ul>
                </div>
            </div>
            <div className='copyRightTxt text-xs text-[#ffffff80] py-10 '>
                <p>Best viewed on Google Chrome 80+, Microsoft Edge 81+, Mozilla Firefox 75+, Safari 5.1.5+</p>
                <p>Copyright © 2023 Zee Entertainment Enterprises Ltd. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;

