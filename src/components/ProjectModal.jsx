import React from "react";
import { motion } from "framer-motion";
import { BiPlus } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import Select from "react-select";
import { useStateContext } from "../lib/context";
import { useState } from "react";
import { useEffect } from "react";
const ProjectModal = ({ e, setClicked }) => {
	const [editAssigned, setEditAssigned] = useState(false);
	const { employees, projects, getProjects } = useStateContext();
	const [assigned, setAssigned] = useState([]);
	const [finalAss, setFinal] = useState([]);
	const emp = e.assignedEmployees.map((e) => {
		return { value: e.id, label: e.firstName + " " + e.lastName };
	});

	const loyees = employees.map((e) => {
		if (!emp.includes(e)) {
			return { value: e.id, label: e.firstName + " " + e.lastName };
		}
	});
	useEffect(() => {
		const newArr = [];
		assigned.map((e) => {
			return emp.map((elem) => {
				if (e.label !== elem.label) {
					newArr.push(e);
				}
			});
		});
		console.log(newArr);
		setFinal(newArr);
	}, [assigned]);

	const assignedEdit = () => {
		const url = "https://localhost:7241/Employee/project";
		assigned.forEach(async (elem) => {
			try {
				console.log(projects);
				const res = await fetch(url, {
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						employeeId: elem.value,
						projectId: e.id,
					}),
				});
				const data2 = await res.json();
				console.log(data2);
			} catch (error) {
				console.log(error);
			}
			setEditAssigned(false);
			getProjects();
		});
		setTimeout(() => {
			getProjects();
		}, 500);
	};
	const assignHandler = (e) => {
		setAssigned(e);
	};

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
					<div className="flex gap-3 items-center mb-5">
						<h2 className="text-xl font-semibold ">Assigned Employees</h2>
						<div
							onClick={() => setEditAssigned(!editAssigned)}
							className="text-xl cursor-pointer transition-opacity hover:opacity-80"
						>
							<AiFillEdit />
						</div>
					</div>
					{!editAssigned ? (
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
					) : (
						<div className="w-[80%] flex flex-col gap-5">
							<Select
								defaultValue={emp}
								onChange={assignHandler}
								isMulti
								name="colors"
								options={loyees}
								setClickedData
								className="basic-multi-select"
								classNamePrefix="select"
							/>
							<button
								onClick={assignedEdit}
								className="px-3 w-max py-1 rounded-md bg-green-300"
							>
								edit
							</button>
						</div>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default ProjectModal;
