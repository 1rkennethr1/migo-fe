import Layout from "./Layout";
import { motion } from "framer-motion";
import pc from "../assets/pc.png";
import blob from "../assets/blob.png";

const Info = () => {
	return (
		<Layout>
			<div className="flex flex-col items-center justify-center relative lg:mb-20">
				<h1 className="text-6xl text-center  border-black mb-10 flex-col flex items-center gap-4 ">
					<div className="">
						A new way to <span className="font-semibold">assess </span>{" "}
					</div>
					<div className="bg-[#E04344] h-2 rounded w-[60%]"></div>
				</h1>

				<h3 className="text-2xl md:text-4xl text-center  md:px-[2rem] mb-[8rem] ">
					We’re changing the corporate world by ditching the manual assessment
					and outdated systems. That means it's fast, easy and friendly.
				</h3>
				<div className="relative">
					<img src={pc} width={850} alt="PC"></img>
					<div className="absolute -z-10 top-[-5rem]  sm:top-[-10rem]">
						<img width={850} src={blob} alt="" />
					</div>
				</div>
			</div>
		</Layout>
	);
};
export default Info;
