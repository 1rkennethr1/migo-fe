import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {
	return (
		<motion.div
			className="p-10 min-h-screen dark:bg-[#1f1f1f] transition duration-500 flex w-screen text-black dark:text-white "
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<h1 className="text-5xl font-semibold">Alliance Inc. Dashboard</h1>
		</motion.div>
	);
};

export default Dashboard;
