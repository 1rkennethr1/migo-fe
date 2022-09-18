import Layout from "./Layout";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";
import { motion } from "framer-motion";
const Hero = () => {
	const scale = {
		initial: {
			scale: 0,
		},
		animate: {
			scale: 1,
			transition: {
				staggerChildren: 0.2,
				type: "spring",
				damping: 20,
				stiffness: 100,
			},
		},
	};
	return (
		<Layout>
			<motion.h1
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1, delay: 0.4 }}
				className="text-6xl 2xl:text-7xl mb-10 text-center"
			>
				Discover the{" "}
				<span className="font-semibold text-transparent  bg-clip-text bg-gradient-to-r from-[#df5355] to-pink-600">
					hidden potential
				</span>{" "}
				of your workplace.
			</motion.h1>
			<motion.div className="flex items-end justify-center gap-5 mb-10">
				<motion.div
					variants={scale}
					initial="initial"
					animate="animate"
					className="flex flex-col gap-1"
				>
					<div className="flex items-end gap-3">
						<div className="">
							<motion.img variants={scale} src={img1} alt="" className="w-[131px] " />
						</div>
						<div className="">
							<motion.img variants={scale} src={img2} className="w-[217px] " alt="" />
						</div>
					</div>
					<div className="">
						<motion.img variants={scale} src={img3} className="w-[363.47px] " alt="" />
					</div>
				</motion.div>

				<div className="">
					<motion.img
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.3, type: "spring", damping: 20, stiffness: 100 }}
						src={img4}
						className="w-[424.78px]"
						alt=""
					/>
				</div>
				<motion.div
					variants={scale}
					initial="initial"
					animate="animate"
					className="flex flex-col gap-4"
				>
					<div className="">
						<motion.img variants={scale} src={img5} className="w-[362.59px]" alt="" />
					</div>
					<div className="flex gap-3">
						<div className="">
							<motion.img variants={scale} src={img6} className="w-[169.44px] " alt="" />
						</div>
						<div className="">
							<motion.img variants={scale} src={img7} className="w-[169.03px] " alt="" />
						</div>
					</div>
				</motion.div>
			</motion.div>
			<button className="bg-[#ec2224] transition duration-300 hover:bg-[#ff5a65] text-white font-semibold rounded-lg px-[6.9rem] py-[.5rem] mt-10">
				Get Started
			</button>
		</Layout>
	);
};

export default Hero;
