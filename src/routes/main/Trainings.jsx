import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MainLayout from "../../components/MainLayout";
import ProjectCard from "../../components/ProjectCard";
import ProjectModal from "../../components/ProjectModal";
import { useStateContext } from "../../lib/context";
import Select from "react-select";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	FormHelperText,
	Textarea,
} from "@chakra-ui/react";
const Benefits = () => {
	const { benefits ,employees, getBenefits} = useStateContext();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [clicked, setClicked] = useState(false);
    const [clickedData, setClickedData] = useState({});
	const { projects, minimized, getProjects } = useStateContext();
	const [added, setAdded] = useState(false);
	const [assigned, setAssigned] = useState([]);

	const [data, setData] = useState({
		name: "asdaads",
		clientName: "adsdas",
		deadline: "dasasd",
		description: "czcccxcxzcz",
	});
	useEffect(() => {
		getBenefits();
	}, []);
	const emp = employees.map((e) => {
		return { value: e.id, label: e.firstName + " " + e.lastName };
	});
	const changeHandler = (e) => {
		const { value, name } = e.target;
		setData({ ...data, [name]: value });
	};
	const assignHandler = (e) => {
		setAssigned(e);
	};

	const addProject = async () => {
		const url = "https://localhost:7241/Project";
		if (!added) {
			try {
				const res = await fetch(url, {
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});
				const data2 = await res.json();
				console.log(data2);
				if (data2.length > 0) {
					setAdded(true);
					await getProjects();
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			const url = "https://localhost:7241/Employee/project";
			assigned.forEach(async (e) => {
				try {
					console.log(projects);
					const res = await fetch(url, {
						method: "post",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							employeeId: e.value,
							projectId: projects[projects.length - 1].id,
						}),
					});
					const data2 = await res.json();
					console.log(data2);
					await getProjects();
				} catch (error) {
					console.log(error);
				}
			});
			onClose();
		}
	};

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
				<h1 className="text-6xl font-semibold">Training</h1>
                <Button className="w-[10%] dark:bg-[#1a1a1a] dark:border-white dark:border-2 dark:hover:bg-[#313131]" onClick={onOpen}>
					Add Benefit
				</Button>
				{/* 

				<Modal
					size={"2xl"}
					blockScrollOnMount={false}
					isOpen={isOpen}
					onClose={onClose}
				>
					<ModalOverlay />
					<ModalContent className="dark:bg-[#1a1a1a] dark:text-white dark:border-2">
						<ModalHeader>Add Project</ModalHeader>
						<ModalCloseButton />
						<ModalBody className="h-[30rem]">
							<div className="h-[30rem] overflow-hidden ">
								<AnimatePresence>
									{!added && (
										<motion.div
											className={`flex flex-col justify-center items-center px-3 ${
												added ? "blur-2xl" : ""
											}`}
											exit={{
												x: -700,
												opacity: 0,
												transition: { duration: 0.5 },
											}}
										>
											<FormControl>
												<FormLabel>Project Name</FormLabel>
												<Input
													name="name"
													onChange={changeHandler}
													type="text"
												/>
											</FormControl>
											<FormControl mt={5}>
												<FormLabel>Client Name</FormLabel>
												<Input
													name="clientName"
													onChange={changeHandler}
													type="text"
												/>
											</FormControl>

											<FormControl mt={5}>
												<FormLabel>Deadline</FormLabel>
												<Input
													name="deadline"
													onChange={changeHandler}
													type="date"
												/>
											</FormControl>
											<FormControl mt={5}>
												<FormLabel>Description</FormLabel>

												<Textarea
													resize={"vertical"}
													maxHeight="10rem"
													height="10rem"
													name="description"
												/>
											</FormControl>
										</motion.div>
									)}
								</AnimatePresence>
								<AnimatePresence>
									{added && (
										<motion.div
											initial={{ x: 300, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{
												delay: 0.5,
												type: "spring",
												damping: 20,
												stiffness: 120,
											}}
											className="h-full flex justify-center items-center px-3"
										>
											<FormControl>
												<p className="text-3xl mb-10">
													Assign employees to this project
												</p>
												<Select
													onChange={assignHandler}
													isMulti
													name="colors"
													options={emp}
													setClickedData
													className="basic-multi-select"
													classNamePrefix="select"
												/>
											</FormControl>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
							<div className="my-5">
								<FormLabel>Assigned Employees</FormLabel>
								<Select
									options={emp}
									isMulti
									name="colors"
									className="basic-multi-select"
									classNamePrefix="select"
								/>
							</div>
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme="blue"
								mr={3}
								onClick={() => {
									onClose();
									setAdded(false);
								}}
							>
								Close
							</Button>
							<Button onClick={addProject} variant="ghost">
								{added ? "Assign" : "Add"}
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
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
				</motion.div> */}
			</motion.div>
		</MainLayout>
	);
};

export default Benefits;
