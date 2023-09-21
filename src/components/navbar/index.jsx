import NavMenuHeader from "./NavMenuHeader";
import { Link, useLocation } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import MenuIcon from "@mui/icons-material/Menu";
import RightMenu from "./RightMenu";
import BuyButton from "../utils/BuyButton";
import { useDispatch, useSelector } from "react-redux";
import SearchModal from "./SearchModal";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { GoPerson } from "react-icons/go";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { isUserLoggedIn, signOutUser } from "../../slices/auth";
import { navbarItems } from "./navbarItems";
import ExpandableMenu from "../utils/ExpandableMenu";
import "./nav.css";

const expandMenuData = [
	{ name: 'My Watchlist', path: '/profile/watchlist' },
	{ name: 'My Subscriptions', path: '/profile/subscriptions' },
	{ name: 'My Rentals', path: '/profile/rentals' },
	{ name: 'My Transactions', path: '/profile/transactions' },
]

const Navbar = () => {
	const [activeLink, setActiveLink] = useState(1);
	const [openRightModal, setOpenRightModal] = useState(false);
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const [openProfileModal, setOpenProfileModal] = useState(false);
	const { width } = useSelector((state) => state.windowSize);
	const [expandMenu, setExpandMenu] = useState(true);
	const location = useLocation();
	const { user } = useSelector(state => state.auth);

	useEffect(() => {
		let currentActiveNav = navbarItems.find(({ path }) => (path.includes(location?.pathname?.split('/')?.[1])));
		setActiveLink(currentActiveNav ? currentActiveNav?.id : 1);
	}, []);

	const toggleModal = () => {
		setOpenRightModal((m) => !m);
		document.body.style.overflow = !openRightModal ? "hidden" : "auto";
	};

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(isUserLoggedIn());
	}, [dispatch]);

	const { authenticated } = useSelector((state) => state.auth);

	if (openSearchModal && width < 1200) {
		return (
			<SearchModal
				openSearchModal={openSearchModal}
				setOpenSearchModal={setOpenSearchModal}
			/>
		);
	}

	const logout = () => {
		dispatch(signOutUser());
	}

	return (
		<>
			<header className="appHeader bg-[#0f0617] fixed z-[1000] top-0 w-full">
				<div className="headerWrap h-16 flex justify-between items-center lg:mx-10 mx-6 mt-2 mb-4 text-right">
					<Link to={"/"}>
						<img
							className="cursor-pointer block float-left mr-8 h-12 z-[100]"
							src="/zee5.svg"
							alt="ZEE5 Logo"
						/>
					</Link>

					{width > 900 && (
						<NavMenuHeader active={activeLink} setActive={setActiveLink} />
					)}
					<div
						className={`headerRight flex-1 ${width < 900 ? "justify-between" : ""
							} items-center gap-5 flex flex-row-reverse`}
					>
						<RightMenu openModal={openRightModal} toggleModal={toggleModal} />
						<div>
							{!openSearchModal && width <= 900 && (
								<Tooltip title="search">
									<IconButton color="inherit" sx={{
										"&:hover": {
											backgroundColor: "hsla(0,0%,100%,.15)",
										},
									}} onClick={() => setOpenSearchModal(true)}>
										<SearchIcon />
									</IconButton>
								</Tooltip>
							)}
							<Tooltip title="menu">
								<IconButton
									className="z-[100]"
									onClick={toggleModal}
									sx={{
										"&:hover": {
											backgroundColor: "hsla(0,0%,100%,.15)",
										},
									}}
									color="inherit"
								>
									{openRightModal ? (
										<CloseIcon sx={{ padding: 0 }} />
									) : (
										<MenuIcon sx={{ padding: 0 }} />
									)}
								</IconButton>
							</Tooltip>
						</div>
						<div className={`${width <= 350 ? 'hidden' : ''}`}>
							<BuyButton />
						</div>
						{width >= 900 && (
							<>
								{authenticated ? (
									<div className="relative">
										<Tooltip title="My Profile">
											<IconButton sx={{
												"&:hover": {
													backgroundColor: "hsla(0,0%,100%,.15)",
												},
											}}
												color="inherit" onClick={() => setOpenProfileModal(true)}>
												<GoPerson className={`text-white rounded-full h-[25px]  z-[65] w-[25px] ${openProfileModal ? 'bg-gray-900 z-[71]' : ''}`} />
											</IconButton>
										</Tooltip>
										{openProfileModal &&
											<div className="profileModal rounded-md z-[62] min-w-[300px] absolute top-16 overflow-y-auto left-0 -translate-x-1/2 bg-[#0F0617]">
												<Link to={'/profile'} onClick={() => setOpenProfileModal(false)} className="profileBar bg-[#ffffff0f] flex  py-3 px-4 ">
													<GoPerson className="text-[#828282] bg-[#ffffff1a] text-xl rounded-full h-10 w-10 mr-3 p-2" />
													<div className="username flex items-center justify-between w-full pr-4">
														<h4 className=" text-[#828282] font-semibold text-base">{user?.name || 'Guest'}</h4>
														<ArrowForwardIosRoundedIcon sx={{ fontSize: 20, color: '#a785ff' }} />
													</div>
												</Link>
												<ExpandableMenu expandMenu={expandMenu} setExpandMenu={setExpandMenu} logout={logout} setOpenModal={setOpenProfileModal} data={expandMenuData} />
												<div className="versionText border-t-[1px] border-t-[#7a7a7a33] mt-4 py-5 text-center">
													<p className="text-xs text-[#ffffff80]">Version 4.6.3</p>
												</div>
											</div>
										}
										{
											openProfileModal &&
											<div onClick={() => setOpenProfileModal(false)}
												className={` fixed top-[0px] inset-0 bg-[#000000d9] z-50`}>
											</div>
										}
									</div>
								) : (
									<Link to={"/signin"}>
										<Button
											sx={{
												backgroundColor: "transparent",
												fontSize: "12px",
												fontWeight: 600,
												borderRadius: "7px",
												transition: "all 0.3s ease-in",
												"&:hover": {
													backgroundColor: "white",
													color: "black",
												},
											}}
											variant="outlined"
											color="inherit"
										>
											LOGIN
										</Button>
									</Link>
								)}

								<div className="languageBtn">
									<Tooltip title="Change Language">
										<IconButton
											sx={{
												"&:hover": {
													backgroundColor: "hsla(0,0%,100%,.15)",
												},
											}}
											color="inherit"
										>
											<TranslateIcon />
										</IconButton>
									</Tooltip>
								</div>
							</>
						)}
						{/* {!openSearchModal && ( */}

						{/* )} */}
						{width <= 1200 && width > 900 && !openSearchModal ? (
							<Tooltip title="search">
								<IconButton color="inherit" sx={{
									"&:hover": {
										backgroundColor: "hsla(0,0%,100%,.15)",
									},
								}} onClick={() => setOpenSearchModal(true)}>
									<SearchIcon />
								</IconButton>
							</Tooltip>
						) : (
							(width > 1200 || openSearchModal) && (
								<SearchModal
									openSearchModal={openSearchModal}
									setOpenSearchModal={setOpenSearchModal}
								/>
							)
						)}
					</div>
				</div>
				<div>
					{width <= 900 && (
						<NavMenuHeader active={activeLink} setActive={setActiveLink} />
					)}
				</div>
			</header>
		</>
	);
};

export default Navbar;
