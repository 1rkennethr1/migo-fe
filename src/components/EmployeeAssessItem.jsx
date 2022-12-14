import def from "../assets/default.png";
import {
	Button,
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	FormControl,
	FormLabel,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	useTab,
	useMultiStyleConfig,
	useDisclosure,
} from "@chakra-ui/react";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useStateContext } from "../lib/context";
const EmployeeAssessItem = ({ e, disabled }) => {
	const btnRef = React.useRef();
	const { getEmployees } = useStateContext();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [data, setData] = useState({
		quality: {
			cA_Q1: 0,
			cA_Q2: 0,
		},
		innovation: {
			cA_Q1: 0,
			cA_Q2: 0,
		},
		agility: {
			cA_Q1: 0,
			cA_Q2: 0,
			cA_Q3: 0,
		},

		efficiency: {
			cA_Q1: 0,
			cA_Q2: 0,
			cA_Q3: 0,
		},

		integrity: {
			cA_Q1: 0,
			cA_Q2: 0,
			cA_Q3: 0,
			cA_Q4: 0,
		},
		functionalComponents: {
			fC_PE_Q1: 0,
			fC_KS_Q1: 0,
			fC_TP_Q1: 0,
			fC_EC_Q1: 0,
			fC_LTS_Q1: 0,
		},
		performance: {
			p_A_Q1: 0,
			p_B_Q1: 0,
			p_C_Q1: 0,
			p_D_Q1: 0,
			p_E_Q1: 0,
		},
	});
	// console.log(e)

	const [isFormFilled, setFilled] = useState(false);
	const onChangeHandler = (event) => {
		const { value, name, attributes } = event.target;
		if (event.target.value >= 0 && event.target.value <= 5) {
			event.target.value = event.target.value.slice(0, 4);
		} else {
			event.target.value = event.target.value.slice(0, 0);
		}
		let section = attributes.section.value;
		if (section === "quality") {
			setData({
				...data,
				[attributes.section.value]: {
					...data.quality,
					[name]: value,
				},
			});
		} else if (section === "innovation") {
			setData({
				...data,
				[attributes.section.value]: {
					...data.innovation,
					[name]: value,
				},
			});
		} else if (section === "agility") {
			setData({
				...data,
				[attributes.section.value]: {
					...data.agility,
					[name]: value,
				},
			});
		} else if (section === "efficiency") {
			setData({
				...data,
				[attributes.section.value]: {
					...data.efficiency,
					[name]: value,
				},
			});
		} else if (section === "integrity") {
			setData({
				...data,
				[attributes.section.value]: {
					...data.integrity,
					[name]: value,
				},
			});
		} else if (section === "functionalComponents") {
			setData({
				...data,
				[attributes.section.value]: {
					...data.functionalComponents,
					[name]: value,
				},
			});
		} else if (section === "performance") {
			setData({
				...data,
				[attributes.section.value]: {
					...data.performance,
					[name]: value,
				},
			});
		}
		// console.log(event.target.);
	};

	const CustomTab = React.forwardRef((props, ref) => {
		// 1. Reuse the `useTab` hook
		const tabProps = useTab({ ...props, ref });
		const isSelected = !!tabProps["aria-selected"];

		// 2. Hook into the Tabs `size`, `variant`, props
		const styles = useMultiStyleConfig("Tabs", tabProps);

		return (
			<Button
				__css={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: `${isSelected ? "#E0585B" : "rgb(24,24,27)"}`,
					color: "white",
					borderRadius: ".3rem",
					height: "3rem",
					width: "10rem",
					maxWidth: "10rem",
					position: "relative",
					"&:before": {
						content: '""',
						display: "inline-block",
						width: 0,
						height: 0,
						transform: "translateX(7rem)",
						// marginRight:'-2rem',
						// marginLeft:'4rem',
						borderTop: "2rem solid transparent",
						borderBottom: "2rem solid transparent",
						borderLeft: "2.5rem solid white",
					},
					"&:after": {
						content: '""',
						display: "inline-block",
						width: 0,
						height: 0,
						transform: "translateX(4.5rem)",
						// marginRight:'-2rem',
						// marginLeft:'4rem',
						borderTop: "1.5rem solid transparent",
						borderBottom: "1.5rem solid transparent",
						borderLeft: `${
							isSelected ? "2rem solid #E0585B" : "2rem solid rgb(24,24,27)"
						}`,
					},
				}}
				{...tabProps}
			>
				<div className="absolute left-14">{tabProps.children}</div>
				{/* <Box className="border-t-[2rem] border-t-[#fff] border-b-[2rem] border-b-[#fff] border-l-[2rem] border p-1 "/> */}
			</Button>
		);
	});
	const CustomTab2 = React.forwardRef((props, ref) => {
		// 1. Reuse the `useTab` hook
		const tabProps = useTab({ ...props, ref });
		const isSelected = !!tabProps["aria-selected"];
		const isDisabled = !!tabProps["disabled"];

		// 2. Hook into the Tabs `size`, `variant`, props
		const styles = useMultiStyleConfig("Tabs", tabProps);

		return (
			<Button
				__css={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: `${
						isSelected ? "#E0585B" : isDisabled ? "#ddd" : "rgb(24,24,27)"
					}`,
					color: "white",
					borderRadius: ".3rem",
					height: "3rem",
					width: "25rem",
					maxWidth: "25rem",
					position: "relative",
					"&:before": {
						content: '""',
						display: "inline-block",
						width: 0,
						height: 0,
						transform: "translateX(14.5rem)",
						borderTop: "2rem solid transparent",
						borderBottom: "2rem solid transparent",
						borderLeft: "2.5rem solid white",
					},
					"&:after": {
						content: '""',
						display: "inline-block",
						width: 0,
						height: 0,
						transform: "translateX(12rem)",
						// marginRight:'-2rem',
						// marginLeft:'4rem',
						borderTop: "1.5rem solid transparent",
						borderBottom: "1.5rem solid transparent",
						borderLeft: `${
							isSelected
								? "2rem solid #E0585B"
								: isDisabled
								? "2rem solid #ddd"
								: "2rem solid rgb(24,24,27)"
						}`,
					},
				}}
				{...tabProps}
			>
				<div className="absolute left-14">{tabProps.children}</div>
				{/* <Box className="border-t-[2rem] border-t-[#fff] border-b-[2rem] border-b-[#fff] border-l-[2rem] border p-1 "/> */}
			</Button>
		);
	});
	useEffect(() => {
		if (
			Object.entries(data).every((a) => {
				const [key, value] = a;
				return Object.entries(value).every((e) => {
					const [key, value] = e;
					// console.log(value);
					return value != 0;
				});
			})
		)
			setFilled(true);
		else setFilled(false);
	}, [data]);
	const submitHandler = async () => {
		const url = `https://localhost:7241/api/Assessment?empId=${e.id}`;
		const url2 = `https://localhost:7241/Employee/${e.id}`;
		let formData = new FormData();
		formData.append("id", e.id);
		formData.append("firstName", e.firstName);
		formData.append("middleName", e.middleName);
		formData.append("lastName", e.lastName);
		formData.append("cityAddress", e.cityAddress);
		formData.append("cityContactNumber", e.cityContactNumber);
		formData.append("numberOfDependents", e.numberOfDependents || 0);
		formData.append("civicClubAffiliation", e.civicClubAffiliation);
		formData.append("religion", e.religion);
		formData.append("bloodType", e.bloodType);
		formData.append("age", e.age);
		formData.append("sex", e.sex);
		formData.append("civilStatus", e.civilStatus);
		formData.append("birthdate", e.birthdate);
		formData.append("profession", e.profession);
		formData.append("contactNumber", e.contactNumber);
		formData.append("emailAddress", e.emailAddress);
		formData.append("yearsOfExperience", e.yearsOfExperience || 0);
		formData.append("contractType", e.contractType);
		formData.append("positionApplied", e.positionApplied);
		formData.append("positionCode", e.positionCode);
		formData.append("dateJoined", e.dateJoined);
		formData.append("emergencyName", e.emergencyName);
		formData.append("emergencyAddress", e.emergencyAddress);
		formData.append("status", e.status);
		formData.append("emergencyContactNumber", e.emergencyContactNumber);
		formData.append("emergencyRelationship", e.emergencyRelationship);
		formData.append("imageName", e.imageFile ? e.imageFile.name : e.imageName);
		formData.append("imageSrc", e.imageSrc);
		formData.append("imageFile", e.imageFile);
		formData.append("evaluated", true);
		formData.append("dateEvaluated", new Date().toISOString());
		try {
			const res = await fetch(url2, {
				method: "put",
				body: formData,
			});
			// console.log(res);
		} catch (error) {
			// console.log(error);
		}
		try {
			const res = await fetch(url, {
				method: "post",
				headers: {
					"Content-Type": "application/json-patch+json",
				},
				body: JSON.stringify({
					quality: {
						cA_Q1: data.quality.cA_Q1,
						cA_Q2: data.quality.cA_Q2,
					},
					qualityRemark: '',
					innovation: {
						cA_Q1: data.innovation.cA_Q1,
						cA_Q2: data.innovation.cA_Q2,
					},
					innovationRemark: '',
					agility: {
						cA_Q1: data.agility.cA_Q1,
						cA_Q2: data.agility.cA_Q2,
						cA_Q3: data.agility.cA_Q3,
					},
					agilityRemark: '',
					efficiency: {
						cA_Q1: data.efficiency.cA_Q1,
						cA_Q2: data.efficiency.cA_Q2,
						cA_Q3: data.efficiency.cA_Q3,
					},
					efficiencyRemark: '',
					integrity: {
						cA_Q1: data.integrity.cA_Q1,
						cA_Q2: data.integrity.cA_Q2,
						cA_Q3: data.integrity.cA_Q3,
						cA_Q4: data.integrity.cA_Q4,
					},
					integrityRemark: '',
					functionalComponents: {
						fC_PE_Q1: data.functionalComponents.fC_PE_Q1,
						fC_KS_Q1: data.functionalComponents.fC_KS_Q1,
						fC_TP_Q1: data.functionalComponents.fC_TP_Q1,
						fC_EC_Q1: data.functionalComponents.fC_EC_Q1,
						fC_LTS_Q1: data.functionalComponents.fC_LTS_Q1,
					},
					functionalComponentsRemark: '',
					performance: {
						p_A_Q1: data.performance.p_A_Q1,
						p_B_Q1: data.performance.p_B_Q1,
						p_C_Q1: data.performance.p_C_Q1,
						p_D_Q1: data.performance.p_D_Q1,
						p_E_Q1: data.performance.p_E_Q1,
					},
					performanceRemark: '',
					trainingAssessment: '', 
				}),
			});
			const data2 = await res.json();
			console.log(data2);
			if (data2.length > 0) {
				onClose();
				setFilled(false);
				setData({
					quality: {
						cA_Q1: 0,
						cA_Q2: 0,
					},
					innovation: {
						cA_Q1: 0,
						cA_Q2: 0,
					},
					agility: {
						cA_Q1: 0,
						cA_Q2: 0,
						cA_Q3: 0,
					},

					efficiency: {
						cA_Q1: 0,
						cA_Q2: 0,
						cA_Q3: 0,
					},

					integrity: {
						cA_Q1: 0,
						cA_Q2: 0,
						cA_Q3: 0,
						cA_Q4: 0,
					},
					functionalComponents: {
						fC_PE_Q1: 0,
						fC_KS_Q1: 0,
						fC_TP_Q1: 0,
						fC_EC_Q1: 0,
						fC_LTS_Q1: 0,
					},
					performance: {
						p_A_Q1: 0,
						p_B_Q1: 0,
						p_C_Q1: 0,
						p_D_Q1: 0,
						p_E_Q1: 0,
					},
				});
			}
		} catch (err) {
			console.log(err);
		}

		getEmployees();
	};
	return (
		<div
			className={
				disabled
					? `dark:text-gray-500 dark:hover:border-2 dark:border-2 text-black flex flex-col gap-2 text-3xl p-4 dark:border-white shadow-md w-72 h-80 rounded-md before:content-[' '] before:absolute before:bg-[rgba(0,0,0,.1)] before:rounded-lg before:p-[9rem] before:pb-[11rem] before:ml-[-1rem] before:mt-[-1rem]`
					: "dark:text-white dark:hover:border-2 dark:border-2 text-black flex flex-col gap-2 text-3xl p-4 dark:border-white shadow-md w-72 h-80 rounded-md hover:cursor-pointer hover:bg-[#e8e8e8] dark:hover:bg-zinc-900"
			}
			onClick={disabled ? null : onOpen}
			ref={btnRef}
		>
			{(new Date() - new Date(e.dateJoined)) / 1000 / 60 / 60 / 24 < 180 ? (
				<div
					className={`text-sm self-end border-2 ${
						disabled
							? "border-gray-600 text-gray-600"
							: "border-green-600 text-green-600"
					} rounded-md px-3`}
				>
					{" "}
					New
				</div>
			) : (
				<div className="p-3">{/* Inactive */}</div>
			)}
			<div className="flex flex-col gap-5 items-center justify-center">
				<div className="overflow-hidden flex justify-center w-20 h-20 rounded-full">
					<img
						src={
							e.imageSrc &&
							(e.imageSrc.split("/")[5].includes("jpeg") ||
								e.imageSrc.split("/")[5].includes("png") ||
								e.imageSrc.split("/")[5].includes("svg") ||
								e.imageSrc.split("/")[5].includes("jpg"))
								? e.imageSrc
								: def
						}
						className={`object-cover ${disabled ? " grayscale" : ""}`}
					></img>
				</div>
				<h1 className="font-bold text-[.6em] leading-5 overflow-hidden text-center mb-[-1rem]">
					{e.firstName} {e.lastName}
				</h1>
				<h1 className="text-sm leading-3 grid grid-flow-col-dense items-center gap-2 mb-[-.5rem]">
					<span>
						{e.positionApplied !== "null" ? e.positionApplied : "Web Developer"}
					</span>
				</h1>
				<div className=" bg-gray-100 text-sm w-[100%] items-center flex flex-col p-3 rounded-md dark:text-white dark:bg-black">
					<div className="flex w-[100%] self-start flex-row overflow-hidden whitespace-nowrap text-ellipsis gap-3 mb-3">
						<div className="text-left">
							<h1 className="text-gray-500">Profession</h1>
							<h1 className="leading-3 whitespace-nowrap overflow-hidden text-ellipsis w-24">
								{e.profession !== "null" ? e.profession : "N/A"}
							</h1>
						</div>
						<div className="text-right">
							<h1 className="text-gray-500">Date Joined</h1>
							<h1 className="leading-3 text-ellipsis">
								{e.dateJoined !== "null" ? e.dateJoined : "N/A"}
							</h1>
						</div>
					</div>
					<div className="self-start flex flex-row overflow-hidden whitespace-nowrap text-ellipsis gap-3">
						<div className="self-start text-left">
							<h1 className="text-gray-500">
								<span className="flex gap-1 items-center">
									<IoMdCall />
									{e.contactNumber !== "null" ? "+63" + e.contactNumber : "N/A"}
								</span>
							</h1>
							<h1 className="text-gray-500">
								<span className="flex gap-1 items-center">
									<MdEmail />
									{e.emailAddress !== "null" ? e.emailAddress : "N/A"}
								</span>
							</h1>
						</div>
					</div>
				</div>
			</div>

			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
				size={"full"}
			>
				<DrawerOverlay />
				<DrawerContent>
					<div>
						<DrawerCloseButton
							onClick={() => setFilled(false)}
							fontSize={"1em"}
							bg={"white"}
							_hover={{ bg: "white" }}
							_focus={{ bg: "white" }}
							size="lg"
						/>
					</div>
					<DrawerHeader className="shadow-md">
						<h1 className=" pb-3 text-4xl">Performance Evaluation Form</h1>
						<div className="flex flex-row gap-5 text-[.9rem] p-5 bg-[#E0585B] rounded-lg w-[40%] items-center text-white">
							<div className="overflow-hidden flex justify-center w-14 h-14 rounded-full">
								<img
									src={
										e.imageSrc &&
										(e.imageSrc.split("/")[5].includes("jpeg") ||
											e.imageSrc.split("/")[5].includes("png") ||
											e.imageSrc.split("/")[5].includes("svg") ||
											e.imageSrc.split("/")[5].includes("jpg"))
											? e.imageSrc
											: def
									}
									className="object-cover"
								></img>
							</div>
							<div className="flex flex-col">
								<h1 className="font-normal">
									<span className="font-bold ">
										{e.firstName} {e.lastName}
									</span>
								</h1>
								<h1 className="font-normal">
									<span className="font-bold">{e.profession}</span>
								</h1>
								<h1 className="font-normal">
									Date of Hire/Transfer:{" "}
									<span className="font-bold">{e.dateJoined}</span>
								</h1>
							</div>
						</div>
					</DrawerHeader>
					<DrawerBody>
						<div className="flex flex-col gap-3">
							<AnimatePresence>
								{isFormFilled && (
									<motion.div
										initial={{ opacity: 0, scale: 0 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0 }}
										transition={{ scale: { duration: 0.5 } }}
										className="z-50 fixed bottom-5 flex flex-col p-10 justify-center right-[2.6rem]  bg-white border-[#464646] rounded-md border-2"
									>
										<p>All fields are filled.</p>
										<p>Do you want to submit the form?</p>
										<button
											onClick={submitHandler}
											className=" mt-5 bg-green-300 px-3 py-1 rounded-md"
										>
											Submit
										</button>
									</motion.div>
								)}
							</AnimatePresence>
							<div className="flex flex-row items-center gap-12 p-5 border-2 border-[#aaa] rounded-lg bg-white">
								<h1 className="font-bold uppercase text-gray-500">
									Rating Scale
								</h1>
								<div className="flex flex-row gap-3">
									<div className="flex flex-col">
										<h1>4.61 - 5.00</h1>
										<h1>3.61 - 4.60</h1>
										<h1>3.00 - 3.60</h1>
										<h1>2.00 - 2.99</h1>
										<h1>0.00 - 1.99</h1>
									</div>
									<div className="flex flex-col">
										<h1>Exceeds Expectation (EE)</h1>
										<h1>Significant Strength (SS)</h1>
										<h1>Meets Expectations (ME)</h1>
										<h1>Development Needed (DN)</h1>
										<h1>Needs Improvement (NI)</h1>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-2 p-2">
								<div className="flex flex-col gap-2">
									<h1 className=" uppercase font-bold text-xl">
										Consistency with Alliance Values
									</h1>
									{/* //Quality */}
									<div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
										<Tabs variant={"unstyled"}>
											<TabList marginLeft={"1rem"} marginTop={"1rem"}>
												<CustomTab className="z-50">Quality</CustomTab>
												<CustomTab className="z-40">Innovation</CustomTab>
												<CustomTab className="z-30">Agility</CustomTab>
												<CustomTab className="z-20">Efficiency</CustomTab>
												<CustomTab className="z-10">Integrity</CustomTab>
											</TabList>
											<TabPanels marginLeft={""} padding={"0 !important"}>
												{/* Quality */}
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q1. Maintains highest standard in the quality of
																our products and services and focuses on
																continuous process improvement, to make
																processes, visible, repeatable and
																measurable.
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q1"
																		section="quality"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q2. Focuses on pleasing the customer through
																producing quality output-on time-on budget.
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q2"
																		section="quality"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
													</div>
												</TabPanel>
												{/* Innovation */}
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q1. Goes beyond what we have now and constantly
																improves on current approaches of developing
																technical solutions and in the processes which
																support the development. Shows willingness to
																question traditional assumptions.
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q1"
																		section="innovation"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q2. Has deep knowledge of the business; Equipped
																with higher value skills in the Area of
																Technology, Project Management, Client's Market
																/ Industry / Culture / Language{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q2"
																		section="innovation"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
													</div>
												</TabPanel>
												{/* //Agility */}
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q1. Able to produce expected output in a timely
																manner despite changing customer demands.
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q1"
																		section="agility"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q2. Maintains effective work behavior despite
																set-backs or pressure due to change. Remains
																calm, stable and in control.
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q2"
																		section="agility"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q3. Enjoys dynamic environment with lots of
																change. Reacts quickly to change.
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q3"
																		section="agility"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
													</div>
												</TabPanel>

												{/* //Efficiency */}
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q1. Produces more output in a shorter period of
																time, without sacrificing quality.
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q1"
																		section="efficiency"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q2. Completes work in a timely manner;
																reasonable use of overtime which is justified.
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q2"
																		section="efficiency"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q3. Extremely organized; Exhibits strong
																planning capability{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q3"
																		section="efficiency"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
													</div>
												</TabPanel>
												{/* //Integrity */}
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q1. Ensures work responsibilities are covered
																when absent or updates management of pending
																responsibilities or upcoming deadlines.{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q1"
																		section="integrity"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q2. Consistent in words and action to
																management, fellow employees, and external stake
																holders.{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q2"
																		section="integrity"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q3. Arrives at appointments and meetings on time
																without the need of reminders; absences and
																tardiness is excused and reasonable.
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q3"
																		section="integrity"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																Q4. Ethical and Strives for Win-win{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="cA_Q4"
																		section="integrity"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
													</div>
												</TabPanel>
											</TabPanels>
										</Tabs>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<h1 className=" uppercase font-bold text-xl">
										Functional Components
									</h1>
									{/* //Quality */}
									<div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
										<Tabs variant={"unstyled"}>
											<TabList marginLeft={"1rem"} marginTop={"1rem"}>
												<CustomTab2 className="z-50">
													Individual Contributor & Management Roles
												</CustomTab2>
												<CustomTab2 className="z-40" isDisabled>
													For Those Hired as Supervisors & Up Only
												</CustomTab2>
											</TabList>
											<TabPanels marginLeft={""} padding={"0 !important"}>
												{/* //Individual Contributor & Management Roles */}
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																<span className="font-bold">
																	PERSONAL EXCELLENCE
																</span>
																<br></br>Q1. Able to continuously seek and act
																on continuous improvement to all aspects of work
																and work relations{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="fC_PE_Q1"
																		section="functionalComponents"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																<span className="font-bold">
																	KNOWLEDGE AND SKILLS
																</span>
																<br></br>Q1. Extent to which the employee
																possess and use required knowledge and skills,
																considering the use of experience and judgment
																in performing the job.{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="fC_KS_Q1"
																		section="functionalComponents"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																<span className="font-bold">TEAM PLAYER</span>
																<br></br>Q1. Able to work with others.
																Willingness to take instruction.{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="fC_TP_Q1"
																		section="functionalComponents"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																<span className="font-bold">
																	EFFECTIVE COMMUNICATION
																</span>
																<br></br>Q1. Able to relay honest, transparent
																and open messages in an appropriate manner{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="fC_EC_Q1"
																		section="functionalComponents"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																<span className="font-bold">
																	LEARNED / TECHNICAL SKILLS
																</span>
																<br></br>Q1. Able to acquire and apply necessary
																skills, knowledge and behavior to perform the
																job effectively and effIciently{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		name="fC_LTS_Q1"
																		section="functionalComponents"
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
													</div>
												</TabPanel>
												{/* //For Those Hired as Supervisors & Up Only */}
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																<span className="font-bold">LEADERSHIP</span>
																<br></br>Q1. Able to lead by example, to view
																others as more important than our self-interest,
																taking personal responsibility for the
																employees' experience{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																<span className="font-bold">MANAGEMENT</span>
																<br></br>Q1. Able to effectively plan, organize,
																lead and control resources in meeting job
																expectations for self and the team being led.
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																<span className="font-bold">
																	EMPLOYEE DEVELOPMENT
																</span>
																<br></br>Q1. Able to help employees stay
																employable and versatile, developing more valued
																skills{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
														<div className="bg-white rounded-lg">
															<h1 className="bg-[#ddd] p-5 rounded-lg">
																<span className="font-bold">
																	EFFECTIVE COMMUNICATION
																</span>
																<br></br>Q1. Able to relay honest, transparent
																and open messages in an appropriate manner{" "}
															</h1>
															<FormControl className="flex items-center justify-start">
																<FormLabel className="w-[30%] px-2">
																	<h1 className="italic text-red-500">
																		Input 0.00 - 5.00 only
																	</h1>
																	<Input
																		onChange={onChangeHandler}
																		step={0.01}
																		type={"number"}
																		min={1}
																		max={5}
																	></Input>
																</FormLabel>
															</FormControl>
														</div>
													</div>
												</TabPanel>
											</TabPanels>
										</Tabs>
									</div>
								</div>
								{/*Performance */}
								<div className="flex flex-col gap-2">
									<h1 className=" uppercase font-bold leading-3">
										Performance
									</h1>
									On the set goals/KPI for the period:
									{/* //Quality */}
									<div className="flex flex-row items-center gap-4 p-5 border-2 border-[#aaa] rounded-lg bg-white">
										<h1 className="font-bold uppercase w-64">
											GOAL / Key Performance Indicator (KPI) ACHIEVEMENT{" "}
										</h1>
										<div className="flex flex-col">
											{/* On the set goals/KPI for the period: */}
											<h1>4.61 - 5.00</h1>
											<h1>3.61 - 4.60</h1>
											<h1>3.00 - 3.60</h1>
											<h1>2.00 - 2.99</h1>
											<h1>0.00 - 1.99</h1>
										</div>
										<div className="flex flex-col">
											<h1>(EE)</h1>
											<h1>(SS)</h1>
											<h1>(ME)</h1>
											<h1>(DN)</h1>
											<h1>(NI)</h1>
										</div>
										<div className="flex flex-col">
											<h1>Plus Extra Milestones on top of the set goal </h1>
											<h1>achieved the set goal (i.e., 100%)</h1>
											<h1>achieved 80% -99% of set goal</h1>
											<h1>achieved 60% - 79% of set goal </h1>
											<h1>achieved 59% or less than the set goal</h1>
										</div>
									</div>
									<div className="flex flex-col gap-2 p-2 border-2 border-[#aaa] rounded-lg">
										<Tabs variant={"unstyled"}>
											<TabList marginLeft={"1rem"} marginTop={"1rem"}>
												<CustomTab2 className="z-50">
													Schedule/ Ontime Delivery
												</CustomTab2>
												<CustomTab2 className="z-40">
													Schedule/ Ontime Delivery
												</CustomTab2>
												<CustomTab className="z-30">Quality</CustomTab>
												<CustomTab className="z-20">Productivity</CustomTab>
												<CustomTab className="z-10">Process</CustomTab>
											</TabList>
											<TabPanels marginLeft={""} padding={"0 !important"}>
												{/* //Individual Contributor & Management Roles */}
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
																<h1 className="bg-[#ddd] p-5 rounded-lg">
																	Q1. 70% of on-time delivery and placement of
																	ERFs with 90-day SLA
																</h1>
																<FormControl className="flex items-center justify-start">
																	<FormLabel className="w-[30%] px-2">
																		<h1 className="italic text-red-500">
																			Input 0.00 - 5.00 only
																		</h1>
																		<Input
																			name="p_A_Q1"
																			section="performance"
																			onChange={onChangeHandler}
																			step={0.01}
																			type={"number"}
																			min={1}
																			max={5}
																		></Input>
																	</FormLabel>
																</FormControl>
															</div>
														</div>
													</div>
												</TabPanel>
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
																<h1 className="bg-[#ddd] p-5 rounded-lg">
																	Q1. 90% of on-time delivery and placement of
																	target newbies on-boarding
																</h1>
																<FormControl className="flex items-center justify-start">
																	<FormLabel className="w-[30%] px-2">
																		<h1 className="italic text-red-500">
																			Input 0.00 - 5.00 only
																		</h1>
																		<Input
																			name="p_B_Q1"
																			section="performance"
																			onChange={onChangeHandler}
																			step={0.01}
																			type={"number"}
																			min={1}
																			max={5}
																		></Input>
																	</FormLabel>
																</FormControl>
															</div>
														</div>
													</div>
												</TabPanel>
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
																<h1 className="bg-[#ddd] p-5 rounded-lg">
																	Q1. 90% of regularized new hires on-boarded
																</h1>
																<FormControl className="flex items-center justify-start">
																	<FormLabel className="w-[30%] px-2">
																		<h1 className="italic text-red-500">
																			Input 0.00 - 5.00 only
																		</h1>
																		<Input
																			name="p_C_Q1"
																			section="performance"
																			onChange={onChangeHandler}
																			step={0.01}
																			type={"number"}
																			min={1}
																			max={5}
																		></Input>
																	</FormLabel>
																</FormControl>
															</div>
														</div>
													</div>
												</TabPanel>
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
																<h1 className="bg-[#ddd] p-5 rounded-lg">
																	Q1. 60% of total Monthly Productivity within
																	acceptable target, Endorsed to TI vs.
																	successful placement hit rate
																</h1>
																<FormControl className="flex items-center justify-start">
																	<FormLabel className="w-[30%] px-2">
																		<h1 className="italic text-red-500">
																			Input 0.00 - 5.00 only
																		</h1>
																		<Input
																			name="p_D_Q1"
																			section="performance"
																			onChange={onChangeHandler}
																			step={0.01}
																			type={"number"}
																			min={1}
																			max={5}
																		></Input>
																	</FormLabel>
																</FormControl>
															</div>
														</div>
													</div>
												</TabPanel>
												<TabPanel>
													<div className="flex flex-col gap-2 border-2 p-3 border-[#aaa] bg-[#aaa] rounded-lg">
														<div className="bg-white rounded-lg">
															<div className="flex flex-col gap-2 border-2 border-[#aaa] rounded-lg">
																<h1 className="bg-[#ddd] p-5 rounded-lg">
																	Q1. 0 (Zero) Number of NCRs based on Audit
																	Findings
																</h1>
																<FormControl className="flex items-center justify-start">
																	<FormLabel className="w-[30%] px-2">
																		<h1 className="italic text-red-500">
																			Input 0.00 - 5.00 only
																		</h1>
																		<Input
																			name="p_E_Q1"
																			section="performance"
																			onChange={onChangeHandler}
																			step={0.01}
																			type={"number"}
																			min={1}
																			max={5}
																		></Input>
																	</FormLabel>
																</FormControl>
															</div>
														</div>
													</div>
												</TabPanel>
											</TabPanels>
										</Tabs>
									</div>
								</div>
							</div>
						</div>
					</DrawerBody>
					<DrawerFooter></DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
};
export default EmployeeAssessItem;
