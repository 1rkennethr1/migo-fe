import useDarkMode from "../hooks/useDarkMode";
import { HiMoon, HiSun } from "react-icons/hi";
const DarkModeButton = () => {
	const [setTheme, colorTheme] = useDarkMode();
	return (
		<div className="">
			<div
				onClick={() => {
					setTheme(colorTheme);
					localStorage.setItem("theme", colorTheme);
				}}
				className="px-2 text-slate-600 rounded-[50%] cursor-pointer"
			>
				<HiMoon className="text-xl lg:text-3xl dark:scale-0 transition-all translate-y-3.5  scale-100 duration-500" />
				<HiSun className="text-xl lg:text-3xl scale-0 transition-all -translate-y-3.5 dark:scale-100 duration-500 dark:text-yellow-300" />
			</div>
		</div>
	);
};

export default DarkModeButton;
