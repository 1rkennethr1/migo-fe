import { motion } from "framer-motion";
import { useState } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import login from "../assets/login.jpeg";
import migo from "../assets/migo.svg";
import DarkModeButton from "../components/DarkModeButton";
export default function LoginPage() {
	const [wrf, setWrf] = useState(false);
	const fade = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				duration: 0.2,
				type: "spring",
				damping: 20,
				stiffness: 100,
			},
		},
		exit: { opacity: 0 },
	};
	const fade2 = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				duration: 0.2,
				type: "spring",
				damping: 20,
				stiffness: 100,
			},
		},
	};
	return (
		<motion.div
			variants={wrf ? fade2 : fade}
			initial="initial"
			animate="animate"
			exit="exit"
			className="flex h-screen overflow-hidden"
		>
			<div className="p-[1rem] md:py-[2rem] md:px-[5rem] justify-center 2xl:py-[5rem]  flex-col flex items-center lg:items-start  w-full lg:w-[70%] relative">
				<div className="absolute top-0 right-5">
					<DarkModeButton />
				</div>
				<img src={migo} alt="migo" width={80} className="mb-[3rem]" />
				<h2 className="text-5xl font-semibold mb-[1rem]  ">Welcome Back!</h2>
				<h3 className="text-2xl font-light mb-[2.5rem]">
					Please login to your account
				</h3>
				<form
					action=""
					onSubmit={(e) => e.preventDefault()}
					className="flex flex-col gap-4 w-full"
				>
					<input
						placeholder="Enter your email"
						className="border border-black h-[4rem] rounded-lg px-5"
						type="email"
						name=""
						id=""
					/>
					<input
						placeholder="Password"
						className="border border-black h-[4rem] rounded-lg px-5"
						type="password"
						name=""
						id=""
					/>
					<div className="flex justify-between">
						<div className="flex gap-2 items-center">
							<input type="checkbox" name="asd" id="" className="" />
							<p>Remember Password</p>
						</div>
						<div className="">
							<a href="">Forgot Password?</a>
						</div>
					</div>
					<Link to="/main/dashboard">
						<button
							onMouseEnter={() => setWrf(true)}
							className="px-[5rem] my-[1.5rem] w-full  h-[4rem] rounded-lg font-semibold text-white bg-[#ec2224]"
						>
							Login
						</button>
					</Link>
				</form>
				<div className="w-full flex justify-end">
					<Link to="/homepage">
						<motion.button
							onMouseEnter={() => setWrf(false)}
							whileHover={{ x: 3 }}
							className="flex justify-center py-[1rem] rounded-lg dark:bg-white dark:text-black   bg-black text-white  px-[2rem] w-max mt-14 gap-3 items-center"
						>
							Homepage
							<div className="text-2xl">
								<BiArrowToRight />
							</div>
						</motion.button>
					</Link>
				</div>
			</div>
			<div className="hidden xl:block object-fill">
				<img src={login} alt="" srcset="" width={1000} />
			</div>
		</motion.div>
	);
}
