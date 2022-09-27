import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/migo.svg";
import { IoIosArrowForward } from "react-icons/io";
import {
	MdSpaceDashboard,
	MdPeople,
	MdOutlineAssessment,
	MdCardGiftcard,
} from "react-icons/md";

import { BiLogOut } from "react-icons/bi";
import DarkModeButton from "./DarkModeButton";
import { useStateContext } from "../lib/context";
const tabs = [
	{
		label: "Dashboard",
		icon: <MdSpaceDashboard />,
		path: "/main/dashboard",
	},
	{
		label: "Employees",
		icon: <MdPeople />,
		path: "/main/employees",
	},
	{
		label: "Assess",
		icon: <MdOutlineAssessment />,
		path: "/main/assess",
	},
	{
		label: "Benefits",
		icon: <MdCardGiftcard />,
		path: "/main/benefits",
	},
];
const Sidebar = () => {
	const location = useLocation();
	console.log(location.pathname);
	const [selectedTab, setSelectedTab] = useState(
		tabs.find((e) => e.path === location.pathname)
	);
	useEffect(() => {
		setSelectedTab(tabs.find((e) => e.path === location.pathname));
	}, [location]);
	const [clicked, setClicked] = useState(false);
	const active = {
		transition: "all .9 ease-in-out",
		color: "white",
	};
	const { minimized, setMinimized } = useStateContext();
	const linkBg = {
		initial: { y: -45 },
		animate: {
			y: minimized ? -45 : -48,
		},
	};
	return (
		<motion.div
			className={`  fixed top-0 h-screen bg-white dark:bg-[#1a1a1a] shadow-xl transition-all duration-500 px-5 pt-16 z-50 ${
				minimized ? "w-[90px]" : "w-[250px]"
			} `}
		>
			<div
				onClick={() => setMinimized(!minimized)}
				className={`absolute cursor-pointer transition-all top-5 duration-500  rounded-xl p-2 bg-white shadow-sm ${
					minimized ? "right-[-20px]" : " scale-x-[-1] right-[-10px]"
				} dark:bg-[#1a1a1a] dark:text-white text-black`}
			>
				<IoIosArrowForward />
			</div>
			<div className="w-full absolute bottom-0 left-0 h-max flex items-center justify-between">
				<div className="scale-75">
					<DarkModeButton />
				</div>
				<Link
					to={"/"}
					className="text-2xl pr-2 text-black dark:text-white transition duration-500"
				>
					<BiLogOut />
				</Link>
			</div>
			<div className="flex flex-col gap-5 justify-between">
				<img
					src={logo}
					width={120}
					height={120}
					alt=""
					srcset=""
					className="mb-8 self-center ml-2"
				/>
				{tabs.map((e) => {
					return (
						<div className="relative dark:text-white text-black">
							<div
								className={`transition duration-300 ${
									e === selectedTab
										? ""
										: "hover:bg-[#ededed] dark:hover:bg-[#282828]"
								} rounded-lg py-1`}
							>
								<NavLink
									to={e.path}
									onClick={() => {
										setSelectedTab(e);
										localStorage.setItem("tab", JSON.stringify(e));
									}}
									style={({ isActive }) => (isActive ? active : undefined)}
								>
									<div className="flex items-center gap-3 py-2 ml-3">
										<div className="text-2xl">{e.icon}</div>
										<AnimatePresence>
											{minimized ? null : (
												<motion.p
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													className="translate-y-[3.5%] text-lg font-semibold "
												>
													{e.label}
												</motion.p>
											)}
										</AnimatePresence>
									</div>
								</NavLink>
								{selectedTab === e ? (
									<motion.div
										initial="initial"
										animate="animate"
										variants={linkBg}
										layoutId="active "
										className="w-full bg-[#EC2224] absolute rounded-lg h-full -z-10 "
									></motion.div>
								) : null}
							</div>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
};

export default Sidebar;
