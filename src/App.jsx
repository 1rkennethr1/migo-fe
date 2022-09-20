import DarkModeButton from "./components/DarkModeButton";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Info from "./components/Info";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import { Route, Router, Routes, useLocation, Navigate } from "react-router-dom";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import { AnimatePresence } from "framer-motion";
function App() {
	const loc = useLocation();
	return (
		<div className="App dark:bg-[#1a1a1a] transition-colors duration-500 ease-in-out dark:text-white overflow-x-hidden">
			<AnimatePresence exitBeforeEnter>
				<Routes key={loc.pathname} location={loc}>
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/home" element={<HomePage />} />
				</Routes>
			</AnimatePresence>
		</div>
	);
}

export default App;
