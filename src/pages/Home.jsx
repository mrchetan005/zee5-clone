
import HeroSlider from "../components/heroSlider/HeroSlider";
import Tray from "../components/tray";


const Home = () => {
    return (
        <>
            <HeroSlider />
            <div className="trending mb-16 ">
                <Tray heading='Trending Near You' pageNumber={1} type={'movie'} />

                <Tray heading='Top 10 Movies in India' pageNumber={3} type={'movie'} />

                <Tray heading='Top 10 ZEE5 Original Shows' pageNumber={3} type={'tv show'} />

                <Tray heading='Bollywood Blockbusters' pageNumber={4} type={'movie'} />

                <Tray heading='Unmissable Movies & Shows' pageNumber={5} type={'tv show'} />

                <Tray heading='Spicy Webseries Now FREE' pageNumber={6} type={'web series'} />

                <Tray heading='World Hits | Free Dubbed Movies' pageNumber={7} />

                <Tray type={'web series'} heading='Free K-Dramas in Hindi' pageNumber={8} />

                <Tray type="documentary" heading='Inspired From Real Life' pageNumber={9} />

                <Tray type={'video song'} heading='South Dubbed Dhamaka' pageNumber={10} />
            </div>
        </>
    )
}

export default Home;