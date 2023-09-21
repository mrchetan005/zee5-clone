import { useState } from "react";
import Movies from "../watchlistSections/Movies";
import Episodes from "../watchlistSections/Episodes";
import Videos from "../watchlistSections/Videos";
import Sports from "../watchlistSections/Sports";

const menuItems = [
    { id: 201, title: 'Episodes' },
    { id: 202, title: 'Movies' },
    { id: 203, title: 'Videos' },
    { id: 204, title: 'Sports' },
]

const MyWatchlist = () => {
    const [activeTab, setActiveTab] = useState(menuItems[0].id);

    return (
        <div className="">
            <h2 className="pageTitle font-bold pb-8 text-3xl">My Watchlist</h2>
            <ul className="tabPillsNav gap-9 pb-4 flex border-b-[1px] border-b-[hsla(0,0%,48%,.2)] text-base">
                {
                    menuItems.map(({ id, title }) => (
                        <li onClick={() => setActiveTab(id)} className={`tabMenuItem cursor-pointer ${activeTab === id ? 'text-[#a785ff]' : 'text-[#cfc3ca]'} py-[2px]`} key={id}>{title}</li>
                    ))
                }
            </ul>
            {
                activeTab === menuItems[0].id
                    ? <Episodes />
                    : activeTab === menuItems[1].id
                        ? <Movies />
                        : activeTab === menuItems[2].id
                            ? <Videos />
                            : <Sports />
            }
        </div>
    )
}

export default MyWatchlist;