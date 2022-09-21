import { Link } from "react-scroll";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import DarkModeButton from "./DarkModeButton";
import { navlinks } from "../../utils/links";
import logo from "../assets/migo.svg";
const Nav = () => {
	const [navOpened, setNavOpened] = useState(false);

	return (
		<nav className="dark:bg-[#202020] dark:shadow-none transition-[colors_padding] duration-500 fixed right-0 left-0 top-0 bg-white flex items-center justify-between px-[2rem] md:px-[5rem] z-50 h-[12.5vh] shadow-[0px_0px_10px_rgba(0,0,0,.1)]">
			<img
				src={logo}
				alt=""
				width={50}
				className="cursor-pointer hover:scale-[1.1] transition-all"
			/>
			<div
				onClick={() => setNavOpened(!navOpened)}
				className="text-3xl text-black dark:text-white md:hidden cursor-pointer hover:opacity-50 transition-all ease-in-out duration-300"
			>
				{navOpened ? <CgClose /> : <HiMenu />}
			</div>
			<div
				className={`flex fixed top-[100px]  transition-[bottom] duration-700  bg-white md:bg-transparent dark:bg-[#1a1a1a] md:dark:bg-transparent left-0 right-0 overflow-hidden md:static flex-col md:flex-row gap-8 items-center ${
					navOpened ? "bottom-[0]" : "bottom-full"
				}`}
			>
				{navlinks.map((e, i) => {
					return (
						<Link
							key={e.name}
							to={e.to}
							onClick={() => {
								setNavOpened(false);
							}}
							smooth
							className={`cursor-pointer mb-7 md:mb-0 transition-colors duration-300  ${
								e.name === "Home" ? "mt-20 md:mt-0" : ""
							}  ${
								e.name === "Contact Us"
									? "text-white bg-[#EC2224] hover:bg-[#ed4b4e] px-5 py-2 rounded-lg"
									: "hover:text-[#EC2224] dark:text-white text-black "
							} `}
						>
							{e.name}
						</Link>
					);
				})}
				<DarkModeButton />
			</div>
		</nav>
	);
};

export default Nav;
