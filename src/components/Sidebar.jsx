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
		backgroundColor: "black",
		color: "white",
	};
	const { minimized, setMinimized } = useStateContext();
	return (
		<motion.div
			className={`relative ${
				minimized ? "w-[90px]" : "w-[300px]"
			} absolute h-full bg-white dark:bg-[#1a1a1a] shadow-xl transition-all duration-500 px-5 pt-16 z-50`}
		>
			<div
				onClick={() => setMinimized(!minimized)}
				className={`absolute cursor-pointer right-[-10px] rounded-full p-0.5 bg-white shadow-sm ${
					minimized ? "" : " scale-x-[-1]"
				} `}
			>
				<IoIosArrowForward />
			</div>
			<div className="w-max absolute bottom-0 left-0 h-max flex items-center justify-between">
				<DarkModeButton />
				<Link to={"/"}>
					<BiLogOut />
				</Link>
			</div>
			<div className="flex flex-col gap-7 justify-between">
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
							<div className="">
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
													className="translate-y-[3.5%] text-xl font-semibold "
												>
													{e.label}
												</motion.p>
											)}
										</AnimatePresence>
									</div>
								</NavLink>
								{selectedTab === e ? (
									<motion.div
										initial={{ y: -43, borderRadius: "6.9px" }}
										animate={{ y: -43, borderRadius: "6.9px" }}
										exit={{ y: -43, borderRadius: "6.9px" }}
										layoutId="active "
										className="w-[95%] bg-[#EC2224] absolute h-full -z-10 "
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

// import { Center, Flex, Box, Divider, Text } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import { motion } from "framer-motion";
// import DarkModeButton from "./DarkModeButton";
// import {
// 	MdSpaceDashboard,
// 	MdPeople,
// 	MdOutlineAssessment,
// } from "react-icons/md";
// const Sidebar = () => {
// 	const tabs = [
// 		{
// 			label: "Dashboard",
// 			icon: <MdSpaceDashboard />,
// 			path: "/main/dashboard",
// 		},
// 		{
// 			label: "Employees",
// 			icon: <MdPeople />,
// 			path: "/main/employees",
// 		},
// 		{
// 			label: "Assess",
// 			icon: <MdOutlineAssessment />,
// 			path: "/main/assess",
// 		},
// 	];
// 	const active = {
// 		color: "white",
// 		transition: "all .3s ease-in-out",
// 	};
// 	const location = useLocation();
// 	const [selectedTab, setSelectedTab] = useState(
// 		tabs.find((e) => e.path === location.pathname)
// 	);
// 	useEffect(() => {
// 		setSelectedTab(tabs.find((e) => e.path === location.pathname));
// 	}, [location]);
// 	return (
// 		<div>
// 			<Flex
// 				direction={"column"}
// 				shadow="xl"
// 				h={"100vh"}
// 				px={"1.5rem"}
// 				pos={"fixed"}
// 				className="w-[250px]"
// 			>
// 				<Box mt={5}>
// 					<DarkModeButton />
// 				</Box>
// 				<Center my={50}>
// 					<p>logo</p>
// 				</Center>
// 				<Flex direction="column" gap={5}>
// 					{tabs.map((e) => {
// 						return (
// 							<Box
// 								key={e.label}
// 								py={".3rem"}
// 								px={".3rem"}
// 								pos="relative"
// 								mt={e.label === "Assess" ? 5 : ""}
// 							>
// <NavLink
// 	to={e.path}
// 	onClick={() => {
// 		setSelectedTab(e);
// 		localStorage.setItem("tab", JSON.stringify(e));
// 	}}
// 	style={({ isActive }) => (isActive ? active : undefined)}
// >
// 									<Flex fontSize={"lg"} fontWeight={600} align="center" gap={3}>
// 										<Box
// 											style={{
// 												transform: "translateY(1%)",
// 											}}
// 											ml={3}
// 										>
// 											{e.icon}
// 										</Box>
// 										<Text className="">{e.label}</Text>
// 									</Flex>
// 								</NavLink>
// {selectedTab === e ? (
// 	<motion.div
// 		initial={{ y: -30, borderRadius: "5px" }}
// 		animate={{ y: -30, borderRadius: "5px" }}
// 		layoutId="active "
// 		className="w-[95%] bg-[#EC2224] absolute h-full -z-10 "
// 	></motion.div>
// ) : null}
// 								{e.label === "Employees" && (
// 									<Divider pos="absolute" top="60px"></Divider>
// 								)}
// 							</Box>
// 						);
// 					})}
// 				</Flex>
// 			</Flex>
// 		</div>
// 	);
// };

// export default Sidebar;
