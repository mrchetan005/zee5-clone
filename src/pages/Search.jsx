/* eslint-disable react/no-unescaped-entities */

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchFilter from '../components/searchFilter';
import useApi from '../hooks/useApiService';
import HorizontalCard from '../components/card/HorizontalCard';
import { useSelector } from 'react-redux';
import NothingToWatch from '../components/nothingToWatch';

const Search = () => {
    const [params] = useSearchParams();
    const query = params.get('q');
    const [filter, setFilter] = useState({ title: query });
    const [page, setPage] = useState(1);
    const { isIntersecting } = useSelector(state => state.intersection);
    const { moreData, setMoreData, error, loading, get } = useApi();

    const getData = (initialPage, queryFilter) => {
        const filterString = JSON.stringify(queryFilter || filter);
        get(`/show?search=${filterString}&page=${initialPage || page}&limit=30`);
    }

    useEffect(() => {
        setPage(1);
        setMoreData([]);
        setFilter({ title: query });
        getData(1, { title: query });
    }, [params]);

    useEffect(() => {
        if ('title' in filter) {
            return;
        }
        setPage(1);
        setMoreData([]);
        getData(1);
    }, [filter]);

    useEffect(() => {
        if (page === 1) return;
        getData();
    }, [page]);

    useEffect(() => {
        if (isIntersecting && !error) {
            setPage(prevState => prevState + 1);
        }
    }, [isIntersecting]);

    const filterData = (data) => {
        let newData = {};
        for (const key in data) {
            if (data[key]) {
                newData[key] = data?.[key]?.[data[key].length - 1];
            }
        }
        setFilter(newData);
    }

    return (
        <>
            <div className='mx-10'>
                <div className="searchHeader pb-4">
                    <span className='text-[#828282]'>Showing results for </span> <span>"{query}"</span>
                </div>

                <div className="search-filter py-4 z-50">
                    <SearchFilter filterData={filterData} />
                </div>

                <div className='grid relative z-40 my-4 gap-4 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-3 grid-cols-1 '>
                    {
                        moreData?.map((item) => (
                            <HorizontalCard
                                key={item._id}
                                {...item} />
                        ))
                    }
                    {
                        loading &&
                        <div className='grid h-96 w-screen'>
                            <div className="loader m-auto"></div>
                        </div>
                    }
                    {
                        !loading && moreData.length < 1 &&
                        <div className='flex items-center justify-center h-[50vh] w-screen m-auto'>
                            <NothingToWatch message={'Sorry, no results found!'} />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Search;

