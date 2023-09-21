
import HeroSlider from "../components/heroSlider/HeroSlider";
import Tray from "../components/tray";


const Movies = () => {
    return (
        <>
            <HeroSlider type={'movie'} />
            <div className="trending mb-16 ">
                <Tray heading='ZEE5 Exclusive' pageNumber={1} type={'movie'} />

                <Tray heading='Bollywood Blockbusters' pageNumber={2} type={'movie'} />

                <Tray heading='World Hits | Free Dubbed Movies' pageNumber={3} type={'tv show'} />

                <Tray heading='Bollywood Blockbusters' pageNumber={4} type={'movie'} />

                <Tray heading='Unmissable Movies' pageNumber={5} type={'movie'} />

                <Tray heading='Inspired From Real Life' pageNumber={6} type={'movie'} />
            </div>
        </>
    )
}

export default Movies;