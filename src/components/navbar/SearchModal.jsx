/* eslint-disable react/prop-types */

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { useEffect, useState } from "react";
import MovieCard from "../card";
import { useSelector } from "react-redux";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import WarningPopup from "../utils/WarningPopup.jsx";
import useApi from "../../hooks/useApiService";
import SuggestionList from "../suggestionList";


const localSearchHistory = JSON.parse(window.localStorage.getItem('search_history_zee5')) || { items: [] };

const SearchModal = ({ openSearchModal, setOpenSearchModal }) => {
    const [searchValue, setSearchValue] = useState("");
    const [openWarningModal, setOpenWarningModal] = useState(false);
    const [searchHistory, setSearchHistory] = useState(localSearchHistory)
    const { width } = useSelector((state) => state.windowSize);
    const navigate = useNavigate();

    const { data, get } = useApi();
    const { data: searchData, error, loading, get: getSearchData } = useApi();

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (searchValue.trim()) {
                getSearchData(`/show?search={"title":"${searchValue.trim()}"}&limit=10`);
            }
        }, 700);
        return () => {
            clearTimeout(timerId);

        }
    }, [searchValue]);

    useEffect(() => {
        get(`/show?page=3&limit=10`);
    }, []);

    const updateSearchHistory = (searchValue) => {
        const trimValue = searchValue?.trim();
        if (!trimValue) return;
        const indexOf = searchHistory.items.indexOf(trimValue);
        if (indexOf !== -1) {
            searchHistory.items.splice(indexOf, 1);
        }
        searchHistory.items.unshift(trimValue);
        searchHistory.items.splice(5);
        localStorage.setItem('search_history_zee5', JSON.stringify(searchHistory));
        setOpenSearchModal(false);
        setSearchHistory({ ...searchHistory });
        navigate(`/search?q=${searchValue}`);
    }

    const handleRemoveSearch = (searchValue) => {
        searchHistory.items = searchHistory.items.filter((value) => value !== searchValue);
        localStorage.setItem('search_history_zee5', JSON.stringify(searchHistory));
        setSearchHistory({ ...searchHistory });
    }

    const clearAllSearchHistory = (confirm) => {
        if (!confirm) return;
        searchHistory.items.length = 0;
        localStorage.setItem('search_history_zee5', JSON.stringify(searchHistory));
        setSearchHistory({ ...searchHistory });
    }

    const handleSearch = (e) => {
        e?.preventDefault && e.preventDefault();
        updateSearchHistory(searchValue);
    }

    return (
        <>
            <div
                onClick={() => setOpenSearchModal(true)}
                className={`searchWrapper z-[65] px-2 relative flex border-2 items-center justify-between rounded-md bg-inherit ${width >= 1200 ? `${openSearchModal ? 'focus-within' : ''}` : ''} ${(width < 1200 && openSearchModal) ? 'fixed inset-0 z-[60]' : ''} `}
            >
                {
                    (width < 1200 && openSearchModal)
                        ? <div className="cursor-pointer z-[61] mr-2">
                            <ArrowBackIcon onClick={(e) => {
                                e.stopPropagation()
                                setOpenSearchModal(false)
                            }} />
                        </div>
                        : <SearchIcon />
                }
                <form onSubmit={handleSearch} className={`${width < 1200 ? `m-2 ${openSearchModal ? 'focus-within px-2 rounded-md' : ''} searchWrapper border-2` : ''}  relative flex items-center`}>
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search for Movies, Shows, Channels etc."
                        className={`bg-inherit p-2 text-sm w-full outline-none border-none `}
                        type="search"
                    />
                    <div className="micIcon cursor-pointer">
                        {
                            loading ? <div className="loader !h-6 !w-6"></div>
                                : searchValue ? (
                                    <CloseIcon onClick={() => setSearchValue("")} />
                                ) : (
                                    <MicNoneIcon />
                                )}
                    </div>
                </form>

                {
                    openSearchModal &&
                    <div className="searchModal bg-[#11051c] absolute top-[50px] left-0 right-0 z-[60] overflow-y-scroll">
                        {
                            searchValue
                                ? <div className="text-left">
                                    {
                                        error
                                            ? <div className="note m-4 p-4">
                                                <p className="text-base text-[#ff4848]">Sorry, no results found for <span className="text-white">"{searchValue}"</span></p>
                                            </div>
                                            : <SuggestionList searchValue={searchValue} updateSearchHistory={updateSearchHistory} searchData={searchData} />
                                    }
                                </div>
                                : <>
                                    {
                                        searchHistory.items.length >= 1 &&
                                        <div className="top-searches">
                                            <div className="px-4">
                                                <div className="flex justify-between items-center">
                                                    <h2 className="mt-2 font-bold text-left text-base">Recent Searches</h2>
                                                    <p onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenWarningModal(true);
                                                    }} className="clearAll cursor-pointer text-[#a785ff]  text-base">Clear all</p>
                                                </div>
                                                <ul className="py-4 flex flex-wrap gap-3">
                                                    {
                                                        searchHistory?.items?.map((value) => (
                                                            <li key={value} onClick={(e) => {
                                                                e.stopPropagation();
                                                                updateSearchHistory(value);
                                                            }} className=" cursor-pointer rounded-full transition-all hover:bg-[#300057] px-2 py-1 border border-[#ffffff3a] bg-[#ffffff10]">
                                                                <span className="pl-1 text-sm text-[#e0e0e0] pr-1">{value}</span>
                                                                <CloseIcon onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleRemoveSearch(value);
                                                                }} className="cursor-pointer " sx={{ fontSize: 22 }} />
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                    <div className="top-searches">
                                        <div className="px-4">
                                            <div>
                                                <h2 className="mt-2 font-bold text-left text-base">Top Searches</h2>
                                            </div>
                                            <div className="topSearchMovieList grid grid-cols-3 py-4 gap-y-4">
                                                {
                                                    data?.map((movie) => (
                                                        <div key={movie?._id} onClick={(e) => {
                                                            e.stopPropagation()
                                                            setOpenSearchModal(false);
                                                        }}>
                                                            <MovieCard {...movie} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                }
            </div>
            {
                openSearchModal &&
                <div onClick={() => setOpenSearchModal(false)}
                    className={` fixed top-0 inset-0 bg-[rgba(0,0,0,0.7)] z-50`}>
                </div>
            }
            {
                openWarningModal &&
                <WarningPopup title={'Clear all searches?'} message={'This action cannot be undone. You can choose to clear individual searches above.'} onConfirm={clearAllSearchHistory} setOpenWarningModal={setOpenWarningModal} />
            }
        </>
    )
}

export default SearchModal;