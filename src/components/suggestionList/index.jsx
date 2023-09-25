/* eslint-disable react/prop-types */


const SuggestionList = ({ searchData, searchValue, updateSearchHistory }) => {
    return (
        <ul>
            {
                searchData?.map(({ _id, title }) => {
                    const regex = new RegExp(`(${searchValue})`, 'gi');
                    const titleParts = title.split(regex);

                    return (
                        <li key={_id} className="text-sm px-2">
                            <button
                                tabIndex={0}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateSearchHistory(title);
                                }}
                                className="hover:bg-gray-800 border-b-[1px] border-[hsla(0,0%,100%,.15)] p-2 cursor-pointer rounded-md text-left w-full block" >
                                {
                                    titleParts.map((part, index) =>
                                        regex.test(part)
                                            ? (<span key={index} className="text-[#a785ff]">{part}</span>
                                            ) : (part)
                                    )
                                }
                            </button>
                        </li>
                    );
                })
            }
        </ul>
    );
};

export default SuggestionList;
