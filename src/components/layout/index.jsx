import { useEffect } from "react";
import Navbar from "../navbar";
import { startListeningToResize, stopListeningToResize } from "../utils/WindowResizeListener";
import { useSelector } from "react-redux";
import Footer from "../footer";
import BackToTopBtn from "../utils/BackToTopBtn";


const Layout = ({ children }) => {
    const { width } = useSelector(state => state.windowSize);
    useEffect(() => {
        startListeningToResize();
        return () => {
            stopListeningToResize();
        }
    });
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