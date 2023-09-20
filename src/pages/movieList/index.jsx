import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/card";
import './movieList.css'
import Skeleton from "../../components/utils/Skeleton";
import { useSelector } from "react-redux";
import api from "../../api";


const randomNumber = Math.floor(Math.random() * (100 - 30 + 1)) + 30;

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(randomNumber);
    // const [page, setPage] = useState(100);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { category } = useParams();
    const { isIntersecting } = useSelector(state => state.intersection);

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await api.get(`/show?page=${page}&limit=30`);

                setMovies(oldMovies => [...oldMovies, ...response.data.data]);
            } catch (error) {
                setError(true);
                console.log('error', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getMovies();
    }, [page]);

    useEffect(() => {
        if (isIntersecting && !error) {
            setPage((prevState) => prevState + 1);
        }
    }, [isIntersecting, error])


    return (
        <>
            <div className="px-6 flex flex-col">
                <div>
                    <h2 className="mt-2 lg:mt-6  font-bold lg:text-3xl text-xl">{category}</h2>
                </div>
                <div className={`grid relative grid-cols-2 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-6 py-4 gap-2 ${loading ? '' : 'm-auto'}`}>
                    {

                        movies.map((movie) => (
                            <MovieCard key={movie?._id} {...movie} scale={115} />
                        ))
                    }
                    {
                        loading && !error &&
                        new Array(20).fill('').map((_, id) => <Skeleton key={id + Math.random()} />)
                    }
                </div>
            </div>
        </>
    )
}

export default MovieList;