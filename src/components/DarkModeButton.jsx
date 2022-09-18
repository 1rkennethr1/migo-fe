import useDarkMode from "../hooks/useDarkMode";
import { AnimatePresence, motion } from "framer-motion";
import { HiMoon, HiSun } from "react-icons/hi";
const DarkModeButton = () => {
	const [setTheme, colorTheme] = useDarkMode();
	return (
		<div onClick={() => setTheme(colorTheme)}>
			<AnimatePresence>
				<motion.div className="text-2xl cursor-pointer hover:opacity-80 transition-opacity duration-300 text-[#2b3040]">
					{colorTheme === "dark" && <HiMoon />}
				</motion.div>
			</AnimatePresence>
			<AnimatePresence>
				<motion.div className="text-2xl cursor-pointer hover:opacity-80 transition-opacity duration-300 text-[#ffca2b]">
					{colorTheme === "light" && <HiSun />}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default DarkModeButton;
