import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdOpen } from "react-icons/io";
import ProjectModal from "./ProjectModal";
const ProjectCard = ({ e, setClicked, setClickedData }) => {
	const [isUpdated, setUpdated] = useState(false);
	return (
		<motion.div
			onClick={() => {
				setClicked(true);
				setClickedData(e);
			}}
			className={`text-black dark:text-white h-[18rem] dark:border-white dark:border flex transition-all duration-300 flex-col   overflow-hidden  p-7 rounded-md shadow-[1px_5px_10px_rgba(0,0,0,.06)] hover:shadow-[1px_6px_10px_rgba(0,0,0,.1)] cursor-pointer `}
		>
			<motion.div className="flex justify-between w-full gap-4 items-center">
				<div className="flex gap-4 items-center">
					<div className="rounded-full overflow-hidden h-20 w-20 object-center border">
						<img src={e.imageSrc} className=" object-cover  " alt="" />
					</div>
				</div>
			</motion.div>

			<motion.div className={`flex flex-col mt-4 mb-3`}>
				<p className="text-[#898989]  text-start ">{e.clientName}</p>
				<p className="text-2xl mb-2 font-semibold  text-start ">{e.name}</p>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className={`  text-justify   text-[.8rem] text-[#4f4f4f]
					overflow-hidden text-ellipsis `}
				>
					{e.description}
				</motion.p>
			</motion.div>
		</motion.div>
	);
};

export default ProjectCard;
