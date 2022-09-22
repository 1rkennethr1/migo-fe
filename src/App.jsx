import DarkModeButton from "./components/DarkModeButton";
import { Route, Router, Routes, useLocation, Navigate } from "react-router-dom";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "./routes/Dashboard";
import Employees from "./routes/Employees";
import Assess from "./routes/Assess";
import Main from "./routes/Main";
import Sidebar from "./components/Sidebar";
function App() {
	const loc = useLocation();
	console.log();
	return (
		<div
			className={`App dark:bg-[#1a1a1a] transition-colors duration-500 ease-in-out dark:text-white overflow-x-hidden`}
		>
			<div className="flex ">
				<AnimatePresence mode="wait">
					{loc.pathname.split("/").includes("main") && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, flexBasis: "300px" }}
							exit={{ opacity: 0 }}
						>
							<Sidebar />
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence mode="wait">
					<Routes key={loc.pathname} location={loc}>
						<Route path="/main/dashboard" element={<Dashboard />} />
						<Route path="/main/employees" element={<Employees />} />
						<Route path="/main/assess" element={<Assess />} />

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
