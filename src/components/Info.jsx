import Layout from "./Layout";
import { motion, useAnimation } from "framer-motion";
import pc from "../assets/pc.png";
import blob from "../assets/blob.png";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Element } from "react-scroll";

const Info = () => {
	const { ref, inView } = useInView({ triggerOnce: true });
	const animate = useAnimation();
	const animate2 = useAnimation();
	const animate3 = useAnimation();
	useEffect(() => {
		if (inView) {
			animate.start({
				y: 0,
				opacity: 1,
				transition: {
					duration: 0.4,
					type: "spring",
					damping: 20,
					stiffness: 100,
				},
			});
			animate2.start({
				scale: 1,
				opacity: 1,
				transition: {
					duration: 1,
					type: "spring",
					damping: 100,
					stiffness: 100,
					delay: 0.5,
				},
			});
			animate3.start({
				opacity: 1,
				transition: {
					duration: 1,
					type: "spring",
					damping: 100,
					stiffness: 100,
					delay: 1.5,
				},
			});
		}
		if (!inView) {
			animate.start({
				y: 100,
				opacity: 0,
			});
			animate2.start({
				scale: 0.9,
				opacity: 0,
			});
			animate3.start({
				opacity: 0,
			});
		}
	}, [inView]);
	return (
		<Element name="info">
			<motion.div className="px-[2rem] md:px-[5rem] flex flex-col justify-center min-h-screen items-center pt-[10rem] 2xl:pt-[12rem] ">
				<motion.div
					animate={animate}
					className="flex flex-col items-center justify-center relative lg:mb-20 z-10 "
				>
					<motion.h1 className="text-6xl text-center  border-black mb-10 flex-col flex items-center gap-4 ">
						<motion.div animate={animate} ref={ref} className="">
							A new way to <span className="font-semibold">assess </span>{" "}
						</motion.div>
						<motion.div
							animate={animate}
							className="bg-[#E04344] h-2 rounded w-[60%]"
						></motion.div>
					</motion.h1>
					<motion.div
						ref={ref}
						className="text-2xl md:text-4xl text-center  md:px-[2rem] mb-[8rem] "
					>
						We’re changing the corporate world by ditching the manual assessment
						and outdated systems. That means it's fast, easy and friendly.
					</motion.div>
					<motion.div className="relative">
						<motion.img
							animate={animate2}
							src={pc}
							width={850}
							alt="PC"
						></motion.img>
						<motion.div
							animate={animate3}
							className="absolute -z-10 top-[-5rem] transition-[top] duration-1000 sm:top-[-10rem]"
						>
							<img width={850} src={blob} alt="" />
						</motion.div>
					</motion.div>
				</motion.div>
			</motion.div>
		</Element>
	);
};
export default Info;
