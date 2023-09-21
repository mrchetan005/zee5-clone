
import { MyProfile, MyWatchlist, MyRentals, MySubscriptions, MyTransactions } from "../components/profile";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const leftBar = [
    { id: 101, title: 'My Profile', path: '/profile' },
    { id: 102, title: 'My Watchlist', path: '/profile/watchlist' },
    { id: 103, title: 'My Subscription', path: '/profile/subscriptions' },
    { id: 104, title: 'My Rentals', path: '/profile/rentals' },
    { id: 105, title: 'My Transactions', path: '/profile/transactions' },
]

const Profile = () => {
    const [activeBar, setActiveBar] = useState(leftBar[0].id);
    const { pathname: activeBarPath } = useLocation();
    const { width } = useSelector(state => state.windowSize);

    useEffect(() => {
        leftBar.forEach(({ id, path }) => {
            if (activeBarPath === path) {
                setActiveBar(id);
            }
        })
    }, [activeBarPath]);

    return (
        <>
            <div className="rounded-md lg:px-[6%] pb-14 w-full flex min-h-[600px] max-h-[870px]">
                {
                    width >= 1200 &&
                    <div className="leftContainer border-[1px] border-[hsla(0,0%,48%,.2)] rounded-tl-md rounded-bl-md  w-[22%] py-6 bg-[#1b1223]">
                        <ul>
                            {
                                leftBar?.map(({ id, title, path }) => (
                                    <Link key={id} onClick={() => setActiveBar(id)} to={path}>
                                        <li className={`text-base rounded-tr-md transition-all rounded-br-md py-4 px-8 relative ${activeBar === id ? 'font-semibold ' : 'text-[#828282]'}`}>{title}
                                            <div className={`${activeBar === id ? 'w-[1px]' : 'w-0'} h-9 absolute right-0 top-1/2 -translate-y-1/2  bg-white`}></div>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>}
                <div className="rightContainer overflow-y-auto border-l-black border-[1px] border-[hsla(0,0%,48%,.2)] lg:w-[78%] rounded-tr-md rounded-br-md bg-[#0f0617] px-4 w-full lg:px-8 py-6">
                    {activeBar === leftBar[0].id && activeBarPath === leftBar[0].path && <MyProfile />}
                    {activeBar === leftBar[1].id && activeBarPath === leftBar[1].path && <MyWatchlist />}
                    {activeBar === leftBar[2].id && activeBarPath === leftBar[2].path && <MySubscriptions />}
                    {activeBar === leftBar[3].id && activeBarPath === leftBar[3].path && <MyRentals />}
                    {activeBar === leftBar[4].id && activeBarPath === leftBar[4].path && <MyTransactions />}
                </div>
            </div>
        </>
    )
}

export default Profile;