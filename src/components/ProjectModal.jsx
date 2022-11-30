import React from "react";
import { motion } from "framer-motion";
import { BiPlus } from "react-icons/bi";
const ProjectModal = ({ e, setClicked }) => {
	console.log(e);
	return (
		<motion.div
			onClick={() => setClicked(false)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.3 } }}
			className="backdrop h-screen w-screen flex justify-center items-center fixed left-0 top-0 z-[999] bg-[#0000008b]"
		>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				initial={{ opacity: 0, scale: 0.4 }}
				animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
				exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.3 } }}
				className="w-[70rem] dark:bg-[#191919] h-[37rem] bg-white rounded-2xl p-12"
			>
				<div className="flex items-center gap-10">
					<h1 className="text-4xl font-semibold">{e.name}</h1>
					<div className="flex items-center gap-2">
						<div
							className={`${
								e.status === "Ongoing"
									? "bg-yellow-500"
									: e.status === "Completed"
									? "bg-green-500"
									: ""
							} w-[7px] h-[7px]  rounded-full`}
						></div>
						<p className="text-neutral-400  text-md font-medium  ">
							{e.status === "Ongoing"
								? "Ongoing"
								: e.status === "Completed"
								? "Completed"
								: ""}
						</p>
					</div>
				</div>
				<hr className="my-5" />
				<div className="flex flex-col gap-5 mt-10">
					<p className="text-lg">
						<span className="font-semibold">Client :</span>{" "}
						<span>{e.clientName}</span>
					</p>
					<p className="text-lg">
						<span className="font-semibold">Date Started:</span>{" "}
						<span>{e.dateStarted}</span>
					</p>
					<p className="text-lg">
						<span className="font-semibold">Deadline:</span>{" "}
						<span>{e.deadline}</span>
					</p>
					<p className="text-neutral-600 leading-8 dark:text-white ">
						{e.description}
					</p>
				</div>
				<div className="mt-5">
					<h2 className="text-xl font-semibold mb-5">Assigned Employees</h2>
					<div className="flex gap-3 flex-wrap items-center">
						{e.assignedEmployees.map((e) => {
							return (
								<div
									className={`flex gap-2 items-center py-1 px-5 border rounded-full ${
										e.status ? "" : "border-red-600 border-2"
									}`}
									key={e.id}
								>
									<img
										src={`https://localhost:7241/Images/Employees/${e.imageName}`}
										className="w-7 h-7 rounded-full object-center"
										alt=""
									/>
									<div className="">
										{e.firstName} {e.lastName}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default ProjectModal;
