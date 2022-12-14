import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MainLayout from "../../components/MainLayout";
import { BsImage } from "react-icons/bs";
import ProjectCard from "../../components/ProjectCard";
import ProjectModal from "../../components/ProjectModal";
import { useStateContext } from "../../lib/context";
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
	Select,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	FormHelperText,
	Textarea,
} from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { position } from "../../../utils/position";
const Benefits = () => {
	const { trainings, employees, getTrainings } = useStateContext();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [clicked, setClicked] = useState(false);

	const [clickedData, setClickedData] = useState({});

	const [isPicSelected, setIsPicSelected] = useState(false);
	const [pic, setPic] = useState();
	const [added, setAdded] = useState(false);

	const [assigned, setAssigned] = useState([]);

	const [data, setData] = useState({
		name: "",
		url: "",
		category: "",
		type: "",
		imageName: "",
		imageSrc: "",
		imageFile: "",
	});

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

	const addTraining = async () => {
		const url = "https://localhost:7241/api/Training";

		console.log(data.type)
		try {
			let formData = new FormData();
			formData.append("name", data.name);
			formData.append("url", data.url);
			formData.append("category", data.category);
			formData.append("aspects", data.type);
			formData.append("imageName", "");
			formData.append("imageSrc", "");
			formData.append("imageFile", data.imageFile);
			const res = await fetch(url, {
				method: "post",
				body: formData,
			});
			const data2 = await res.json();
			console.log(data2);
			if (data2.length > 0) {
				setAdded(true);
				await getTrainings();
			}
		} catch (error) {
			console.log(error);
		}
		setData({
			name: "",
			url: "",
			category: "",
			type: "",
			imageName: "",
			imageSrc: "",
			imageFile: "",
		});
		setIsPicSelected(false);
		onClose();
	};
	const handlePicChange = (event) => {
		console.log(event.target.value);
		let imageFile = event.target.files[0];
		console.log(event.target.value);
		const reader = new FileReader();
		reader.onload = (x) => {
			setData({
				...data,
				imageName: "",
				imageSrc: x.target.result,
				imageFile: imageFile,
			}),
				setPic(x.target.result);
		};

		reader.readAsDataURL(imageFile);
		setIsPicSelected(true);
	};
	return (
		<MainLayout className="flex">
			<motion.div
				className="flex flex-col gap-16 w-full pb-20"
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
				<h1 className="text-6xl font-semibold">Trainings</h1>
				<Button
					className="w-[10%] dark:bg-[#1a1a1a] dark:border-white dark:border-2 dark:hover:bg-[#313131]"
					onClick={onOpen}
				>
					Add Training
				</Button>

				<Modal
					size={"2xl"}
					blockScrollOnMount={false}
					isOpen={isOpen}
					onClose={onClose}
				>
					<ModalOverlay />
					<ModalContent className="dark:bg-[#1a1a1a] dark:text-white dark:border-2">
						<ModalHeader>Add Training</ModalHeader>
						<ModalCloseButton />
						<ModalBody className="h-[30rem]">
							<div className="h-[30rem] overflow-scroll overflow-x-hidden">
								<motion.div
									className={`flex flex-col justify-center items-center px-3 `}
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
													<BsImage />
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
										<FormLabel>Name of the Training</FormLabel>
										<Input
											className="border px-3 py-2 rounded-lg w-full"
											type="text"
											name="name"
											onChange={changeHandler}
											id=""
											placeholder="Udemy Course for Dummies"
										/>
									</FormControl>
									<div className="grid grid-cols-2 gap-2 w-[100%]">
										<FormControl className="mt-2">
											<FormLabel>URL </FormLabel>
											<Input
												className="border px-3 py-2 rounded-lg w-full"
												type="text"
												name="url"
												onChange={changeHandler}
												id=""
											/>
										</FormControl>
										<FormControl className="mt-2">
											<FormLabel>Training Category</FormLabel>
											<Select
												name="category"
												onChange={changeHandler}
												className="border rounded-lg w-full"
												id=""
												defaultValue={position[0]}
											>
												{position.map((e, i) => {
													return (
														<option className="dark:bg-black" key={i} value={e.name}>
															{e.name}
														</option>
													);
												})}
											</Select>
										</FormControl>
										<FormControl className="mt-2">
											<FormLabel>Training Type</FormLabel>
											{/* <Input
												className="border px-3 py-2 rounded-lg w-full"
												type="text"
												name="type"
												id=""
												onChange={changeHandler}
												placeholder=""
											/> */}
											<Select
												name="category"
												onChange={changeHandler}
												className="border rounded-lg w-full"
												id=""
												defaultValue={1}
											>
												<option className="dark:bg-black" key='1' value={1}>Position-Specific Training</option>
												<option className="dark:bg-black" key='2' value={2}>Personality Development Training</option>
											</Select>
										</FormControl>
									</div>
									<FormControl className="mt-2">
										<FormLabel>Description</FormLabel>
										<Textarea name="desc"></Textarea>
									</FormControl>
								</motion.div>
							</div>
							<div className="my-5"></div>
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
							<Button onClick={addTraining} variant="ghost">
								Add
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>

				<motion.div className="grid justify-center grid-cols-[repeat(auto-fit,minmax(200px,450px))] gap-10 ">
					{trainings.map((e) => {
						return (
							<div
								className="dark:border-white dark:border-2 shadow-md rounded-md flex flex-col overflow-hidden items-center w-full  relative cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.01]"
								key={e.id}
							>
								<img
									src={e.imageSrc}
									alt=""
									className="w-full object-cover h-[15rem]"
								/>
								<div className="flex flex-col dark:bg-black w-[100%] py-4 items-center">
									<p className="text-2xl font-semibold">{e.name}</p>
								</div>
							</div>
						);
					})}
				</motion.div>
			</motion.div>
		</MainLayout>
	);
};

export default Benefits;
