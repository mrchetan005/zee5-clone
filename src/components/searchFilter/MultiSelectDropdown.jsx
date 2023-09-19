/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import CloseIcon from "@mui/icons-material/Close";
import { FaMasksTheater } from 'react-icons/fa6';
import { PiMonitorPlayBold } from 'react-icons/pi';
import { LanguageOutlined } from '@mui/icons-material';


function MultiSelectDropdown({ options, title, type, handleSelectedData, clearAll }) {
    const [selectedValues, setSelectedValues] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (value) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues?.filter((item) => item !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };

    const handleSelectAll = () => {
        if (!selectAll) {
            setSelectedValues(options?.map((option) => option.value));
        } else {
            setSelectedValues([]);
        }
        setSelectAll(!selectAll);
    };

    const handleRemoveAll = () => {
        setSelectedValues([]);
        setSelectAll(false);
    };

    useEffect(() => {
        handleSelectedData(type, selectedValues);
    }, [selectedValues]);

    useEffect(() => {
        if (clearAll) {
            setIsDropdownOpen(false);
            handleRemoveAll();
        }
    }, [clearAll]);

    const handleOnBlur = () => {
        setIsDropdownOpen(false);
    }

    return (
        <div onBlur={handleOnBlur} className={`relative transition-all duration-500 text-left w-48 max-w-[220px] border rounded-md ${selectedValues.length > 0 ? 'boder-white bg-black' : 'border-transparent bg-[#271f2e]'}`}>
            <div>
                <div
                    className=" relative cursor-pointer rounded-md shadow-sm w-full py-1 px-3  text-white flex justify-between items-center transition-all duration-300"
                    onClick={toggleDropdown}
                >
                    <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
                        {selectedValues.length === 0 &&
                            (title === 'Cast' && <LanguageOutlined sx={{ fontSize: 20 }} />)}
                        {selectedValues.length === 0 &&
                            (title === 'Genres' && <FaMasksTheater />)}
                        {selectedValues.length === 0 &&
                            (title === 'Content Type' && <PiMonitorPlayBold />)}
                        <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                            {selectedValues.length > 0 ? selectedValues.join(',') : `${title}`}
                        </p>
                    </div>

                    <button
                        className={`transition-all h-full duration-500 absolute right-4 ${selectedValues.length > 0 ? 'rotate-180 z-10' : 'rotate-0 opacity-0'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownOpen(false);
                            handleRemoveAll();
                        }}
                    >
                        <CloseIcon className="" />
                    </button>
                    <div className={`transition-all ${selectedValues.length > 0 ? 'opacity-0 -z-10 ' : isDropdownOpen ? 'rotate-0' : 'rotate-180'} duration-500`} >
                        <ExpandLessRoundedIcon />
                    </div>
                </div>
            </div>

            {
                isDropdownOpen && (
                    <div className="w-full absolute right-0 mt-2 rounded-md shadow-lg bg-[#11051c] z-50 text-white overflow-y-auto max-h-[390px] ">
                        <div>
                            <label
                                key="selectAll"
                                className="flex capitalize items-center h-12 px-4 text-xs cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="mr-3 cursor-pointer h-5 w-5"
                                    onChange={handleSelectAll}
                                    checked={selectAll}
                                />
                                All
                            </label>
                            {options.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center h-12 px-4 text-xs capitalize cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="mr-3 capitalize  cursor-pointer h-5 w-5 text-white"
                                        onChange={() => handleOptionClick(option.value)}
                                        checked={selectedValues.includes(option.value)}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default MultiSelectDropdown;
