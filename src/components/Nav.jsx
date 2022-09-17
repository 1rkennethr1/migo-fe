import { Link } from "react-scroll";

const Nav = () => {
	const links = ["Home", "Services", "About", "Team", "Contact Us"];
	return (
		<nav className="flex items-center justify-between px-[5rem] py-[2rem] shadow-[0px_0px_10px_rgba(0,0,0,.1)]">
			<img
				src="../migo.svg"
				alt=""
				width={50}
				className="cursor-pointer hover:scale-[1.1] transition-all"
			/>
			<div className="flex gap-8 items-center">
				{links.map((e) => {
					return (
						<Link
							className={`cursor-pointer transition-all duration-300 ${
								e === "Contact Us"
									? "text-white bg-[#EC2224] hover:opacity-90 px-5 py-2 rounded-lg"
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
