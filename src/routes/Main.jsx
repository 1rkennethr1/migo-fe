import { motion } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Assess from "./Assess";
import Dashboard from "./Dashboard";
import Employees from "./Employees";

export default function Main() {
	return (
		<motion.div className="flex">
			<Sidebar />
			<Routes>
				<Route path="/main" element={<Dashboard />} />
				<Route path="/main/employees" element={<Employees />} />
				<Route path="/main/assess" element={<Assess />} />
			</Routes>
		</motion.div>
	);
}
