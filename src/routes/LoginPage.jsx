import { motion } from "framer-motion";
import { BiArrowToRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import login from "../assets/login.jpeg";
import migo from "../assets/migo.svg";
export default function LoginPage() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5, type: "spring", damping: 20, stiffness: 80 }}
			className="flex h-screen overflow-hidden"
		>
			<div className="p-[1rem] md:py-[3rem] md:px-[5rem]  flex-col flex items-center lg:items-start w-full lg:w-[70%]">
				<img src={migo} alt="migo" width={80} className="mb-[5rem]" />
				<h2 className="text-5xl font-semibold mb-[1rem]  ">Welcome Back!</h2>
				<h3 className="text-2xl font-light mb-[2.5rem]">
					Please login to your account
				</h3>
				<form action="" className="flex flex-col gap-4 w-full">
					<input
						placeholder="Enter your email"
						className="border border-black h-[5rem] rounded-lg px-5"
						type="email"
						name=""
						id=""
					/>
					<input
						placeholder="Password"
						className="border border-black h-[5rem] rounded-lg px-5"
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
					<button className="px-[5rem]  h-[4rem] rounded-lg font-semibold text-white bg-[#ec2224]">
						Login
					</button>
					<button className="px-[5rem] h-[4rem] border-2 font-semibold border-black rounded-lg  bg-white relative flex gap-5 items-center justify-center dark:text-black ">
						<div className="flex items-center justify-center gap-3 -translate-x-6">
							<img
								src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
								alt=""
								width={40}
								className=""
							/>
							<p>Sign in with Google </p>
						</div>
					</button>
				</form>
				<div className="w-full flex justify-end">
					<Link to="/home">
						<motion.button
							whileHover={{ x: 3 }}
							className="flex justify-center py-[1rem] rounded-lg dark:bg-white dark:text-black   bg-black text-white  px-[2rem] w-max mt-14 gap-3 items-center"
						>
							Migo homepage
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
