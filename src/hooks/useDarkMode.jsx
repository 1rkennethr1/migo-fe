import { useEffect } from "react";
import { useState } from "react";

const useDarkMode = () => {
	const [theme, setTheme] = useState("light");
	const colorTheme = theme === "light" ? "dark" : "light";

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.add(theme);
		root.classList.remove(colorTheme);
	}, [theme, colorTheme]);
	return [setTheme, colorTheme];
};
export default useDarkMode;
