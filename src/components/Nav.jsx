import { Link } from "react-scroll";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
const Nav = () => {
	const [navOpened, setNavOpened] = useState(false);
	const links = ["Home", "Services", "About", "Team", "Contact Us"];
	return (
		<nav className=" bg-white flex items-center justify-between px-[3rem] md:px-[5rem] h-[12.5vh] shadow-[0px_0px_10px_rgba(0,0,0,.1)]">
			<img
				src="../migo.svg"
				alt=""
				width={50}
				className="cursor-pointer hover:scale-[1.1] transition-all"
			/>
			<div
				onClick={() => setNavOpened(!navOpened)}
				className="text-3xl md:hidden cursor-pointer hover:opacity-50 transition-all ease-in-out duration-300"
			>
				{navOpened ? <CgClose /> : <HiMenu />}
			</div>
			<div
				className={`flex fixed top-[200px]  transition-all duration-500 bg-white left-0 right-0 overflow-hidden md:static flex-col md:flex-row gap-8 items-center ${
					navOpened ? "bottom-[0]" : "bottom-full"
				}`}
			>
				{links.map((e) => {
					return (
						<Link
							className={`cursor-pointer mb-7 md:mb-0 ${
								e === "Contact Us"
									? "text-white bg-[#EC2224] hover:opacity-80 px-5 py-2 rounded-lg"
									: "hover:text-[#EC2224]"
							} `}
						>
							{e}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default Nav;
