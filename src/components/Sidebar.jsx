import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/migo.svg";
import {
	MdSpaceDashboard,
	MdPeople,
	MdOutlineAssessment,
} from "react-icons/md";

import { BiLogOut } from "react-icons/bi";
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
	const active = {
		color: "white",
		transitionProperty: "all",
		transitionDuration: ".5",
	};
	const inactive = {
		transition: "all .9 ease-in-out",
	};
	const location = useLocation();
	const [selectedTab, setSelectedTab] = useState(
		tabs.find((e) => e.path === location.pathname)
	);
	useEffect(() => {
		setSelectedTab(tabs.find((e) => e.path === location.pathname));
	}, [location]);
	return (
		<div>
			<div className="flex flex-col shadow-xl h-full fixed w-[300px] px-[1.5rem] pt-[5rem] gap-10">
				<div className="flex justify-center mb-[2rem]">
					<img src={logo} alt="" width={100} height={100} />
				</div>
				{tabs.map((e) => {
					return (
						<div key={e.label} className="relative">
							<NavLink
								to={e.path}
								onClick={() => {
									setSelectedTab(e);
									localStorage.setItem("tab", JSON.stringify(e));
								}}
								style={({ isActive }) => (isActive ? active : inactive)}
							>
								<div className="flex font-[600] items-center gap-2 text-center text-lg">
									<div>{e.icon}</div>
									<p className="">{e.label}</p>
								</div>
							</NavLink>
							{selectedTab === e ? (
								<motion.div
									initial={{ y: -30, borderRadius: "5px" }}
									animate={{ y: -30, borderRadius: "5px" }}
									transition={{
										duration: 1,
										type: "spring",
										bounce: 0.3,
										damping: 20,
										stiffness: 100,
									}}
									layoutId="active "
									className="w-full   top-[1.5rem]  bg-[#EC2224] absolute h-[2.5rem] -z-10 "
								></motion.div>
							) : null}
							{e.label === "Employees" && <div pos="absolute" top="60px"></div>}
						</div>
					);
				})}
			</div>
			<Link to={"/"}>
				<div className="absolute bottom-[20px] left-[250px] text-3xl">
					<BiLogOut />
				</div>
			</Link>
		</div>
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
// 								<NavLink
// 									to={e.path}
// 									onClick={() => {
// 										setSelectedTab(e);
// 										localStorage.setItem("tab", JSON.stringify(e));
// 									}}
// 									style={({ isActive }) => (isActive ? active : undefined)}
// 								>
// 									<Flex fontSize={"lg"} fontWeight={600} align="center" gap={3}>
// 										<Box
// 											style={{
// 												transform: "translateY(8.5%)",
// 											}}
// 											ml={3}
// 										>
// 											{e.icon}
// 										</Box>
// 										<Text className="">{e.label}</Text>
// 									</Flex>
// 								</NavLink>
// 								{selectedTab === e ? (
// 									<motion.div
// 										initial={{ y: -30, borderRadius: "5px" }}
// 										animate={{ y: -30, borderRadius: "5px" }}
// 										layoutId="active "
// 										className="w-[95%] bg-[#EC2224] absolute h-full -z-10 "
// 									></motion.div>
// 								) : null}
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
