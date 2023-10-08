/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Navbar from "../navbar";
import { startListeningToResize, stopListeningToResize } from "../utils/WindowResizeListener";
import { useSelector } from "react-redux";
import Footer from "../footer";
import BackToTopBtn from "../utils/BackToTopBtn";
import { useLocation } from "react-router-dom";


const Layout = ({ children }) => {
    const location = useLocation();
    const { width } = useSelector(state => state.windowSize);
    useEffect(() => {
        startListeningToResize();
        return () => {
            stopListeningToResize();
        }
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [location]);

    return (
        <>
            <Navbar />
            <div className={`${width < 900 ? 'mt-[160px]' : 'mt-[90px]'}`}>
                {children}
            </div>
            <Footer />
            <BackToTopBtn />
        </>
    )
}

export default Layout;