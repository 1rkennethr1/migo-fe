import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MainLayout from "../../components/MainLayout";
import ProjectCard from "../../components/ProjectCard";
import { BsImage } from "react-icons/bs";
import ProjectModal from "../../components/ProjectModal";
import { useStateContext } from "../../lib/context";
import Select from "react-select";
import def from "../../assets/default.png"
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
	const [isPicSelected, setIsPicSelected] = useState(false)
	const [pic, setPic] = useState()
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

	const addBenefit = async () => {
		const url = "https://localhost:7241/api/Benefits";
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
					await getBenefits();
				}
			} catch (error) {
				console.log(error);
			}
		} 
		// else {
		// 	const url = "https://localhost:7241/api/Benefits";
		// 	assigned.forEach(async (e) => {
		// 		try {
		// 			console.log(projects);
		// 			const res = await fetch(url, {
		// 				method: "post",
		// 				headers: {
		// 					"Content-Type": "application/json",
		// 				},
		// 				body: JSON.stringify({
		// 					employeeId: e.value,
		// 					projectId: projects[projects.length - 1].id,
		// 				}),
		// 			});
		// 			const data2 = await res.json();
		// 			console.log(data2);
		// 			await getProjects();
		// 		} catch (error) {
		// 			console.log(error);
		// 		}
		// 	});
		// 	onClose();
		// }
	};
 
	const handlePicChange = (event) =>{
		console.log(event.target.value);
		let imageFile = event.target.files[0];
		console.log(event.target.value);
		const reader = new FileReader();
		reader.onload = (x) => {
			// setAdd({
			// 	...add,
			// 	in: "",
			// 	is: x.target.result,
			// 	if: imageFile,
			// }),
			setPic(x.target.result);
			console.log(x.target.result);
		};
		// console.log(add)
		reader.readAsDataURL(imageFile);
		setIsPicSelected(true);
	}
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
				<h1 className="text-6xl font-semibold">Benefits</h1>
				<Button className="w-[10%] dark:bg-[#1a1a1a] dark:border-white dark:border-2 dark:hover:bg-[#313131]" onClick={onOpen}>
					Add Benefit
				</Button>
				

				<Modal
					size={"2xl"}
					blockScrollOnMount={false}
					isOpen={isOpen}
					onClose={onClose}
				>
					<ModalOverlay />
					<ModalContent className="dark:bg-[#1a1a1a] dark:text-white dark:border-2">
						<ModalHeader>Add Benefit</ModalHeader>
						<ModalCloseButton />
						<ModalBody className="h-[30rem]">
							<div className="h-[30rem] overflow-scroll overflow-x-hidden">
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
											<FormControl className="w-[20rem]">
												{isPicSelected && pic != undefined ? (
													<label>
														<div className="overflow-hidden flex justify-center min-w-[39rem] min-h-64 max-h-64 rounded-md">
															<img
																src={pic}
																className="mb-[-1rem] hover:opacity-40 cursor-pointer object-fill"
															/>
														</div>
														<input
															type={"file"}
															name="image"
															accept="image/*"
															onChange={handlePicChange}
															hidden
														></input>
													</label>
												) : (
													<label>
														<div className=" w-[37rem] h-64 border-4 border-black border-dashed hover:border-[#EC2224] hover:cursor-pointer hover:text-[#EC2224] flex flex-col justify-center rounded-md items-center text-[3em]">
															<BsImage/>
															<h1 className="text-sm">Add Image</h1>
														</div>
														<input
															type={"file"}
															name="image"
															accept="image/*"
															onChange={handlePicChange}
															hidden
														></input>
													</label>
												)}
											</FormControl>
											<FormControl className="mt-5">
												<FormLabel>Name of the Benefit</FormLabel>
												<Input
													className="border px-3 py-2 rounded-lg w-full"
													type="text"
													name="name"
													id=""
													placeholder="Free Medical Checkup, etc..."
												/>
											</FormControl>
											<div className="grid grid-cols-2 gap-2 w-[100%]">
												<FormControl className="mt-2">
													<FormLabel>Available until: </FormLabel>
													<Input
														className="border px-3 py-2 rounded-lg w-full"
														type="date"
														name="duration"
														id=""
														min={new Date().toISOString().substring(0,10)}
													/>
												</FormControl>
												<FormControl className="mt-2">
													<FormLabel>Benefit Type </FormLabel>
													<Input
														className="border px-3 py-2 rounded-lg w-full"
														type="text"
														name="type"
														id=""
														placeholder="Paid Medical Leave, etc..."
														min={new Date().toISOString().substring(0,10)}
													/>
												</FormControl>
											</div>
											<FormControl className="mt-2">
													<FormLabel>Description</FormLabel>
														<Textarea
															name="desc"
														>
														</Textarea>
											</FormControl>
											
										</motion.div>
										
									)}
								</AnimatePresence>
							</div>
							<div className="my-5">
								
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
							<Button onClick={addBenefit} variant="ghost">
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
					
				</motion.div>
			</motion.div>
		</MainLayout>
	);
};

export default Benefits;
