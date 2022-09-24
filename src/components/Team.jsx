import gemarlo from "../assets/gemarlo.png";
import klint from "../assets/klint.png";
import romel from "../assets/romel.png";
import sean from "../assets/sean.png";
import bo from "../assets/bo.png";
import Layout from "./Layout";
import { animate, motion, useAnimation } from "framer-motion";
import { Element } from "react-scroll";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
const Team = () => {
	const { ref, inView } = useInView();
	const animation = useAnimation();
	useEffect(() => {
		if (inView) {
			animation.start({
				y: 0,
				opacity: 1,
				transition: {
					duration: 0.4,
					type: "spring",
					damping: 20,
					stiffness: 90,
				},
			});
		} else {
			animation.start({
				y: 120,
				opacity: 0,
			});
		}
	}, [inView]);
	return (
		<Element name="team">
			<Layout>
				<motion.h1
					animate={animation}
					className="text-6xl text-center  border-black mb-10 flex-col flex items-center gap-4 "
				>
					<div className="">
						Meet the <span className="font-semibold">Team</span>{" "}
					</div>
					<div className="bg-[#E04344] h-2 rounded w-[70%]"></div>
				</motion.h1>
				<motion.h3
					animate={animation}
					className="text-2xl xl:text-3xl text-center px-[2rem] xl:px-[15rem]"
				>
					Meet the craftsmen behind Migo. The team aims to conquer new heights
					and continue building.
				</motion.h3>
				<motion.div ref={ref} animate={animation} className="w-[80%]">
					<div className="flex flex-row gap-[.8%]">
						<div className="flex flex-col">
							<img width="100%" src={gemarlo}></img>
							<div className="flex flex-row gap-1 mt-[-2.5%]">
								<img width="49.66%" src={romel}></img>
								<img className="mt-[-.8%]" width="49.66%" src={klint}></img>
							</div>
						</div>
						<div className="flex flex-col">
							<img className="mt-[3%] mb-[-3%]" width="100%" src={bo}></img>
							<img width="100%" src={sean}></img>
						</div>
					</div>
				</motion.div>
			</Layout>
		</Element>
	);
};

export default Team;
