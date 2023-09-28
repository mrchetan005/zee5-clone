import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/card";
import Skeleton from "../components/utils/Skeleton";
import { useSelector } from "react-redux";
import useApi from "../hooks/useApiService";

const MovieList = () => {
    const [page, setPage] = useState(1);
    const { type, category } = useParams();
    const { isIntersecting } = useSelector(state => state.intersection);
    const { moreData: movies, error, loading, get } = useApi();

    const queryObjString = JSON.stringify({ type: type || 'movie' });
    useEffect(() => {
        const getMovies = async () => {
            get(`/show?filter=${queryObjString}&page=${page}&limit=30`);
        }
        getMovies();
    }, [page]);

    useEffect(() => {
        if (isIntersecting && !error) {
            setPage((prevState) => prevState + 1);
        }
    }, [isIntersecting, error]);


    return (
        <div className="px-6 flex flex-col">
            <div>
                <h2 className="mt-2 lg:mt-6  font-bold lg:text-3xl text-xl capitalize">{category}</h2>
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
    )
}

export default MovieList;