import DarkModeButton from "./components/DarkModeButton";
import { Route, Router, Routes, useLocation, Navigate } from "react-router-dom";
import { useStateContext } from "./lib/context";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import TimeLogs from "./routes/main/TimeLogs";
import Dashboard from "./routes/main/Dashboard";
import Employees from "./routes/main/Employees";
import Benefits from "./routes/main/Benefits";
import Trainings from "./routes/main/Trainings";
import Assess from "./routes/main/Assess";
import { useState } from "react";
import Projects from "./routes/main/Projects";
function App() {
	const loc = useLocation();

	const { minimized, jwt } = useStateContext();
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
			className={`App ${
				loc.pathname.split("/").includes("main")
					? "dark:bg-[#1f1f1f]"
					: "dark:bg-[#1a1a1a]"
			}  transition-colors duration-500 ease-in-out dark:text-white overflow-x-hidden`}
		>
			<div
				className={`${loc.pathname.split("/").includes("main") ? "flex" : ""}`}
			>
				{loc.pathname.split("/").includes("main") && jwt ? (
					<motion.div
						initial="initial"
						animate="animate"
						variants={sidebarPadding}
					>
						<Sidebar />
					</motion.div>
				) : (
					""
				)}
				<AnimatePresence mode="wait" initial={false}>
					<Routes key={loc.pathname} location={loc}>
						<Route
							path="/main/dashboard"
							element={jwt ? <Dashboard /> : <Navigate to="/login" />}
						/>
						<Route
							path="/main/employees"
							element={jwt ? <Employees /> : <Navigate to="/login" />}
						/>
						<Route
							path="/main/projects"
							element={jwt ? <Projects /> : <Navigate to="/login" />}
						/>
						<Route
							path="/main/assess"
							element={jwt ? <Assess /> : <Navigate to="/login" />}
						/>
						<Route
							path="/main/timelogs"
							element={jwt ? <TimeLogs /> : <Navigate to="/login" />}
						/>
						<Route
							path="/main/benefits"
							element={jwt ? <Benefits /> : <Navigate to="/login" />}
						/>
						<Route
							path="/main/trainings"
							element={jwt ? <Trainings /> : <Navigate to="/login" />}
						/>
						<Route path="/" element={<Navigate to="/login" />} />
						<Route
							path="/login"
							element={jwt ? <Navigate to="/main/dashboard" /> : <LoginPage />}
						/>
						<Route path="/homepage" element={<HomePage />} />
					</Routes>
				</AnimatePresence>
			</div>
		</div>
	);
}

export default App;
