
import HeroSlider from "../components/heroSlider/HeroSlider";
import Tray from "../components/tray";


const TvShows = () => {
    return (
        <>
            <HeroSlider />
            <div className="trending mb-16 ">
                <Tray heading='Zee TV Shows' pageNumber={1} type={'tv show'} />

                <Tray heading='Popular Free Hindi Shows' pageNumber={2} type={'tv show'} />

                <Tray heading='Evergreen Romantic Shows | Hindi' pageNumber={3} type={'tv show'} />

                <Tray heading='Devotional Shows | Watch Free' pageNumber={4} type={'tv show'} />

                <Tray heading='Watch Again Exclusively on ZEE5' pageNumber={5} type={'tv show'} />

                <Tray heading='Horror & Supernatural Shows | Hindi' pageNumber={6} type={'tv show'} />

                <Tray heading='Women of Substance Drama | Hindi' pageNumber={7} type={'tv show'} />

                <Tray heading='Classic Chat Shows | Hindi' pageNumber={8} type={'tv show'} />

                <Tray heading='Best Comedy Shows | Hindi' pageNumber={9} type={'tv show'} />

                <Tray heading='Top Shows For Your Kids' pageNumber={10} type={'tv show'} />
            </div>
        </>
    )
}

export default TvShows;