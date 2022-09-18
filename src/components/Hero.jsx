import Layout from "./Layout";
import img1 from "../assets/1.webp";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.webp";
import img7 from "../assets/7.webp";
import { motion } from "framer-motion";
import { CgArrowRight } from "react-icons/cg";
const Hero = () => {
	const scale = {
		initial: {
			scale: 0,
		},
		animate: {
			scale: 1,
			transition: {
				staggerChildren: 0.1,
				duration: 0.5,
				type: "spring",
				damping: 20,
				stiffness: 100,
			},
		},
	};
	const stagger = {
		initial: { y: -100, opacity: 0 },
		animate: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 1,

				type: "spring",
				damping: 30,
				stiffness: 120,
			},
		},
	};
	return (
		<Layout>
			<motion.div variants={stagger} initial="initial" animate="animate">
				<motion.h1 variants={stagger} className="text-6xl 2xl:text-7xl mb-5 text-center">
					Discover the{" "}
					<span className="font-semibold text-transparent  bg-clip-text bg-gradient-to-r from-[#df5355] to-pink-600">
						hidden potential
					</span>{" "}
					of your workplace.
				</motion.h1>
				<motion.h2 variants={stagger} className="text-2xl 2xl:text-3xl text-center ">
					Assess your employees like never before!
				</motion.h2>
				<motion.div variants={stagger} className="w-full flex justify-center mt-5">
					<motion.button className="transition dark:text-black dark:bg-white dark:shadow-none duration-300 shadow-[0px_8px_20px_#00000019] hover:shadow-[0px_8px_20px_#00000020]  font-semibold rounded-lg px-[6.9rem] py-[1rem] mt-5 flex items-center gap-3">
						Get Started
						<div className="translate-y-[1%] text-3xl">
							<CgArrowRight />
						</div>
					</motion.button>
				</motion.div>
			</motion.div>
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
		</Layout>
	);
};

export default Hero;
