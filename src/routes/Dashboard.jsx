import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {
	return (
		<motion.div
			className="min-h-screen dark:bg-[#1f1f1f] transition duration-500"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className="">hello</div>
		</motion.div>
	);
};

export default Dashboard;
