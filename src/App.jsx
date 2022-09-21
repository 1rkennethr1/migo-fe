import DarkModeButton from "./components/DarkModeButton";
import { Route, Router, Routes, useLocation, Navigate } from "react-router-dom";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./routes/Dashboard";
import Employees from "./routes/Employees";
import Assess from "./routes/Assess";
import Main from "./routes/Main";
import Sidebar from "./components/Sidebar";
function App() {
	const loc = useLocation();
	return (
		<div className="App dark:bg-[#1a1a1a] transition-colors duration-500 ease-in-out dark:text-white overflow-x-hidden">
			<AnimatePresence exitBeforeEnter>
				<Routes key={loc.pathname} location={loc}>
					<Route path="main" element={<Sidebar />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="employees" element={<Employees />} />
						<Route path="assess" element={<Assess />} />
					</Route>
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/homepage" element={<HomePage />} />
				</Routes>
			</AnimatePresence>
		</div>
	);
}

export default App;
