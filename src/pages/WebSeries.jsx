import HeroSlider from "../components/heroSlider/HeroSlider";
import Tray from "../components/tray";


const WebSeries = () => {
    return (
        <>
            <HeroSlider type={'web series'} pageNumber={50} />
            <div className="trending mb-16">
                <Tray heading={`Web Series You Can't Miss`} pageNumber={3} type={'web series'} />

                <Tray heading={`Romantic Shows For You`} pageNumber={4} type={'web series'} />

                <Tray heading={`Nail Biting Thrillers`} pageNumber={5} type={'web series'} />

                <Tray heading={`Latest Web Series`} pageNumber={6} type={'web series'} />

                <Tray heading={`Must-Watch Web Series`} pageNumber={7} type={'web series'} />

                <Tray heading='World Hits | Free Dubbed Movies' pageNumber={8} type={`web series`} />

                <Tray heading='Free K-Dramas in Hindi' pageNumber={9} type={`web series`} />

                <Tray heading='Inspired From Real Life' pageNumber={10} type={`web series`} />

                <Tray heading='South Dubbed Dhamaka' pageNumber={11} type={`web series`} />
            </div>
        </>
    )
}

export default WebSeries;