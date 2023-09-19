/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";

const castOptions = [
    { label: 'Ella Wilson', value: 'Ella Wilson' },
    { label: 'Ryan Taylor', value: 'Ryan Taylor' },
    { label: 'John Johnson', value: 'John Johnson' },
    { label: 'Emma Smith', value: 'Emma Smith' },
    { label: 'Michael Miller', value: 'Michael Miller' },
];

const genreOptions = [
    { label: 'action', value: 'action' },
    { label: 'adventure', value: 'adventure' },
    { label: 'love', value: 'love' },
    { label: 'comedy', value: 'comedy' },
    { label: 'suspense', value: 'suspense' },
    { label: 'romance', value: 'romance' },
    { label: 'betrayal', value: 'betrayal' },
    { label: 'magic', value: 'magic' },
    { label: 'revenge', value: 'revenge' },
    { label: 'thriller', value: 'thriller' },
    { label: 'mystery', value: 'mystery' },
];

const contentTypeOptions = [
    { label: 'movie', value: 'movie' },
    { label: 'tv show', value: 'tv show' },
    { label: 'web series', value: 'web series' },
    { label: 'video song', value: 'video song' },
    { label: 'short film', value: 'short film' },
    { label: 'trailer', value: 'trailer' },
];

const initialFiltersData = { keywords: [], type: [], cast: [] };

const SearchFilter = ({ filterData }) => {
    const [filtersData, setFiltersData] = useState(initialFiltersData);
    const [isDisabled, setIsDisabled] = useState(true);
    const [clearAll, setClearAll] = useState(false);

    const handleSelectedData = (type, selectedData) => {
        setFiltersData(prevState => ({
            ...prevState,
            [type]: selectedData
        }));
    }

    const handleClearAll = () => {
        setClearAll(true);
        handleApply();
    }

    const handleApply = () => {
        filterData(filtersData);
    }

    useEffect(() => {
        let len = 0;
        for (const key in filtersData) {
            len += filtersData[key]?.length;
        }
        setIsDisabled(len <= 0);
        !isDisabled && setClearAll(false);
    }, [filtersData, isDisabled]);

    return (
        <div className="flex gap-2 z-50 flex-wrap items-center">
            <div><MultiSelectDropdown clearAll={clearAll} type={'cast'} handleSelectedData={handleSelectedData} title={'Cast'} options={castOptions} /></div>
            <div><MultiSelectDropdown clearAll={clearAll} type={'keywords'} handleSelectedData={handleSelectedData} title={'Genres'} options={genreOptions} /></div>
            <div><MultiSelectDropdown clearAll={clearAll} type={'type'} handleSelectedData={handleSelectedData} title={'Content Type'} options={contentTypeOptions} /></div>
            <button className={`${isDisabled ? 'bg-[#333] text-[#4f4f4f]' : 'bg-[#8230c6]  text-white hover:bg-[#5c1695]'} transition-all duration-300 py-2 font-medium text-sm rounded-md px-6`} disabled={isDisabled} onClick={handleApply}>Apply</button>
            {
                !isDisabled &&
                <p onClick={handleClearAll} className="clearAll  cursor-pointer text-[#a785ff]  text-base">Clear all</p>
            }
        </div>
    )
}

export default SearchFilter;