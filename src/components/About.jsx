import Layout from "./Layout";
import { motion } from "framer-motion";
import { FaBrain, FaTachometerAlt, FaThumbsUp } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { AiOutlineRise } from "react-icons/ai";
import { BiRadar } from "react-icons/bi";
import AboutItem from "./AboutItem";
const About = () => {
	const abouts = [
		{
			name: "AI-Powered",
			details:
				"Uses AI to determine appropriate trainings and benefits based on employee performance",
			icon: <FaBrain />,
		},
		{
			name: "Efficient",
			details: "Receive fast updates on employee data",
			icon: <FaTachometerAlt />,
		},
		{
			name: "Easy-to-Use",
			details: "Intuitive design for user ease of usage",
			icon: <FaThumbsUp />,
		},
		{
			name: "Real-time Monitoring",
			details: "Monitor and receive updates on employee progress in real-time",
			icon: <HiSearch />,
		},
		{
			name: "Performance-boosting",
			details: "Boost employee performance by suggesting trainings through AI ",
			icon: <AiOutlineRise />,
		},
		{
			name: "Tracks performance",
			details: "Keep close track of how your employees are doing!",
			icon: <BiRadar />,
		},
	];
	return (
		<Layout>
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-6xl text-center  border-black mb-10 flex-col flex items-center gap-4 ">
					<div className="">
						Get to know <span className="font-semibold">Migo</span>{" "}
					</div>
					<div className="bg-[#E04344] h-2 rounded w-[70%]"></div>
				</h1>
				<h3 className="text-2xl xl:text-3xl text-center px-[2rem] xl:px-[15rem] pb-20">
					Migo, a system focusing on automated process of rating and determining
					benefits ranking them based on criteria.
				</h3>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] px-[5rem] gap-10 items-center justify-center text-center w-full pb-10">
					{abouts.map((e) => {
						return <AboutItem e={e} />;
					})}
				</div>
			</div>
		</Layout>
	);
};
export default About;
