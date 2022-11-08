import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdOpen } from "react-icons/io";
import ProjectModal from "./ProjectModal";
const ProjectCard = ({ e, setClicked, setClickedData }) => {
	return (
		<motion.div
			onClick={() => {
				setClicked(true);
				setClickedData(e);
			}}
			className={`text-black dark:text-white dark:border-white dark:border flex transition-all duration-300 flex-col   overflow-hidden  px-3 py-5 rounded-md shadow-[1px_5px_10px_rgba(0,0,0,.06)] hover:shadow-[1px_6px_10px_rgba(0,0,0,.1)] cursor-pointer `}
		>
			<motion.div className="flex justify-between w-full gap-4 items-center">
				<div className="flex gap-4 items-center">
					<p className="text-2xl font-medium  text-start ">{e.name}</p>
					<div className="flex justify-between  gap-1.5 items-center">
						<div
							className={`${
								e.status === "Ongoing"
									? "bg-yellow-500"
									: e.status === "Completed"
									? "bg-green-500"
									: ""
							} w-[7px] h-[7px]  rounded-full`}
						></div>
						<p className="text-neutral-400  text-xs font-medium  ">
							{e.status === "Ongoing"
								? "Ongoing"
								: e.status === "Completed"
								? "Completed"
								: ""}
						</p>
					</div>
				</div>
				{/* <div className="justify-center">
					<IoMdOpen />
				</div> */}
			</motion.div>
			<hr className="mt-3" />
			<motion.div className={`flex flex-col  gap-2 mt-5 `}>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className={`w-[20rem]   text-justify   text-xs 
					overflow-hidden text-ellipsis whitespace-nowrap`}
				>
					{e.description}
				</motion.p>
			</motion.div>
		</motion.div>
	);
};

export default ProjectCard;
