import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MainLayout from "../../components/MainLayout";
import ProjectCard from "../../components/ProjectCard";
import ProjectModal from "../../components/ProjectModal";
import { useStateContext } from "../../lib/context";

const Projects = () => {
	const [clicked, setClicked] = useState(false);
	const [clickedData, setClickedData] = useState({});
	const { projects, minimized, getProjects } = useStateContext();
	useEffect(() => {
		getProjects();
	}, []);
	return (
		<MainLayout className="flex">
			<motion.div
				className="flex flex-col gap-16 w-full"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0 }}
				transition={{
					duration: 0.1,
					type: "spring",
					damping: 20,
					stiffness: 90,
				}}
			>
				<h1 className="text-6xl font-semibold">Projects</h1>
				<motion.div className="grid grid-cols-[repeat(auto-fit,minmax(230px,350px))] gap-10">
					<AnimatePresence>
						{clicked && (
							<ProjectModal e={clickedData} setClicked={setClicked} />
						)}
					</AnimatePresence>
					{projects.map((e) => {
						return (
							<div key={e.id} className="">
								<ProjectCard
									setClickedData={setClickedData}
									setClicked={setClicked}
									e={e}
								/>
							</div>
						);
					})}
				</motion.div>
			</motion.div>
		</MainLayout>
	);
};

export default Projects;
