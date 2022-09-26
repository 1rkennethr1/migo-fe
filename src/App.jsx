import DarkModeButton from "./components/DarkModeButton";
import { Route, Router, Routes, useLocation, Navigate } from "react-router-dom";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "./routes/Dashboard";
import Employees from "./routes/Employees";
import Assess from "./routes/Assess";
import Benefits from "./routes/Benefits";

import Sidebar from "./components/Sidebar";
import { useStateContext } from "./lib/context";
function App() {
	const loc = useLocation();
	console.log();
	const { minimized, setMinimized } = useStateContext();
	const sidebarPadding = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			flexBasis: minimized ? "90px" : "300px",
			transition: {
				type: "spring",
				duration: 0.55,
				damping: 20,
				stiffness: 110,
			},
		},
	};
	return (
		<div
			className={`App dark:bg-[#1a1a1a] transition-colors duration-500 ease-in-out dark:text-white overflow-x-hidden`}
		>
			<div
				className={`${loc.pathname.split("/").includes("main") ? "flex" : ""}`}
			>
				{loc.pathname.split("/").includes("main") && (
					<motion.div
						initial="initial"
						animate="animate"
						variants={sidebarPadding}
					>
						<Sidebar />
					</motion.div>
				)}
				<AnimatePresence mode="wait">
					<Routes key={loc.pathname} location={loc}>
						<Route path="/main/dashboard" element={<Dashboard />} />
						<Route path="/main/employees" element={<Employees />} />
						<Route path="/main/assess" element={<Assess />} />
						<Route path="/main/benefits" element={<Benefits />} />
						<Route path="/" element={<Navigate to="/login" />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/homepage" element={<HomePage />} />
					</Routes>
				</AnimatePresence>
			</div>
		</div>
	);
}

export default App;
