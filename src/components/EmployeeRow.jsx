import React from "react";
import "../index.css";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	Image,
	InputLeftAddon,
	InputRightAddon,
	InputRightElement,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerCloseButton,
	DrawerFooter,
	DrawerHeader,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Select,
	useDisclosure,
	useToast,
	DrawerOverlay,
	Badge,
} from "@chakra-ui/react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	PopoverAnchor,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../lib/context";
import { MdClose } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { motion } from "framer-motion";
import def from "../assets/default.png";
import dhbg from "../assets/drawerheader.png";
import { useEffect } from "react";
import { position } from "../../utils/position";
import ContactNumber from "./ContactNumber";
import EmailInput from "./EmailInput";

const EmployeeRow = ({ e }) => {
	const [isUpdated, setIsUpdated] = useState(false);
	const { getEmployees } = useStateContext();
	const toast = useToast();

	// const employeeInitRef = React.useRef(null);
	// const employeeFinalRef = React.useRef(null);

	const btnRef = React.useRef();
	const [pic, setPic] = useState();
	const [isPicSelected, setIsPicSelected] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [update, setUpdate] = useState({
		id: e.id,
		fn: e.firstName,
		mn: e.middleName,
		ln: e.lastName,
		age: e.age,
		ca: e.cityAddress, //city address
		ccn: e.cityContactNumber, // city contact number
		nod: e.numberOfDependents, //number of dependents
		cca: e.civicClubAffiliation ? e.civicClubAffiliation : "", //civic club affiliation
		rel: e.religion, //religion
		bt: e.bloodType, //bloodtype
		sex: e.sex, //
		cs: e.civilStatus, //civil status
		bdate: e.birthdate, //birthdate
		prof: e.profession, //profession
		cn: e.contactNumber, // contact number
		email: e.emailAddress, //email
		yoe: e.yearsOfExperience, //years of experience
		ct: e.contractType, //contract type
		posApp: e.positionApplied,
		posCode: e.positionCode, //
		dj: e.dateJoined, //date joined
		en: e.emergencyName, //emergency name
		ea: e.emergencyAddress, //emergency address
		assignedProjects: e.assignedProjects,
		ecn: e.emergencyContactNumber, //emergency contact number
		er: e.emergencyRelationship, //emergency relationship
		in: e.imageName, //
		is: '', //image source
		if: null, //image file
	});
	const changeHandler = e => {
		let imageFile = e.target.files[0]
		const reader = new FileReader()
		reader.onload = x =>{
			setUpdate({
				...update,
				if: imageFile,
				is: x.target.result 
			})
			setPic(x.target.result)
			// console.log(x.target.result)
			console.log(update.if)
		}
		reader.readAsDataURL(imageFile)
		setIsPicSelected(true)
	}
	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	const validatePhone = (phone) => {
		return String(phone).match(/9\d{9}$/);
	};
	const [isEmailValid, setIsEmailValid] = useState(
		validateEmail(e.emailAddress) ? true : false
	);

	let poscode;
	useEffect(() => {
		poscode = position.find((e) => e.name === update.posApp);
		setUpdate({ ...update, posCode: poscode ? poscode.code : "" });
	}, [update.posApp]);
	const handleChange = (e) => {
		const { value, name } = e.target;
		setUpdate({
			...update,
			[name]: value,
		});
		if (name == "ccn" || name == "cn" || name == "ecn") {
			let phone = value.slice(0, 10);
			setUpdate({ ...update, [name]: phone });
			if (value.length > 0) {
				validatePhone(phone)
					? setIsPhoneValid({ ...isPhoneValid, [name]: true })
					: setIsPhoneValid({ ...isPhoneValid, [name]: false });
			} else {
				setIsPhoneValid({ ...isPhoneValid, [name]: null });
			}
			// console.log(validatePhone(phone));
		}
		if (name == "bdate") {
			setUpdate({ ...update, [name]: value, age: calculateAge() });
		}
		if (name == "email") {
			if (value.length > 0) {
				validateEmail(value) ? setIsEmailValid(true) : setIsEmailValid(false);
			} else {
				setIsEmailValid(null);
			}
		}
	};
	function calculateAge() {
		let birthDate = new Date(update.bdate);
		let today = new Date();

		var years = today.getFullYear() - birthDate.getFullYear();

		if (
			today.getMonth() < birthDate.getMonth() ||
			(today.getMonth() == birthDate.getMonth() &&
				today.getDate() < birthDate.getDate())
		) {
			years--;
		}

		return years;
	}

	const [isPhoneValid, setIsPhoneValid] = useState({
		cn: true,
		ccn: true,
		ecn: true,
	});

	const [isFormValid, setIsFormValid] = useState(false);
	useEffect(() => {
		let allPhone = [];
		let allPhoneValid = false;
		let allFields = [];
		let allFieldsFilled = false;
		for (const [key, value] of Object.entries(isPhoneValid)) {
			allPhone.push(value);
		}
		for (const [key, value] of Object.entries(update)) {
			allFields.push(value ? true : key == "cca" && value == "" ? true : false);
		}

		allPhone.every((e) => e === true)
			? (allPhoneValid = true)
			: (allPhone = []);

		allFields.every((e) => e === true)
			? (allFieldsFilled = true)
			: (allFields = []);
		// allPhoneValid && isEmailValid && allFieldsFilled && validateAge()
		// 	? setIsFormValid(true)
		// 	: setIsFormValid(false);

			setIsFormValid(true)
	}, [isPhoneValid, update, isEmailValid]);
	const updateEmployee = async (event) => {
		let fn =
			update.fn.split(" ").length > 1
				? update.fn
						.split(" ")
						.map((e) => {
							return `${e[0].toUpperCase()}${e.slice(1, e.length)}`;
						})
						.join(" ")
				: update.fn[0].toUpperCase() + update.fn.slice(1, update.fn.length);

		let mn =
			update.mn.split(" ").length > 1
				? update.mn
						.split(" ")
						.map((e) => {
							return `${e[0].toUpperCase()}${e.slice(1, e.length)}`;
						})
						.join(" ")
				: update.mn[0].toUpperCase() + update.mn.slice(1, update.mn.length);

		let ln =
			update.ln.split(" ").length > 1
				? update.ln
						.split(" ")
						.map((e) => {
							return `${e[0].toUpperCase()}${e.slice(1, e.length)}`;
						})
						.join(" ")
				: update.ln[0].toUpperCase() + update.ln.slice(1, update.ln.length);

		event.preventDefault();
		const url = `https://localhost:7241/Employee/${e.id}`;
		try {
			const res = await fetch(url, {
				method: "put",
				headers: { "Content-Type": "application/json-patch+json" },
				body: JSON.stringify({
					id: e.id,
					firstName: fn,
					middleName: mn,
					lastName: ln,
					cityAddress: update.ca,
					cityContactNumber: update.ccn,
					numberOfDependents: update.nod,
					civicClubAffliation: update.cca,
					religion: update.rel,
					bloodType: update.bt,
					age: update.age,
					sex: update.sex,
					civilStatus: update.cs,
					birthdate: update.bdate,
					profession: update.prof,
					contactNumber: update.cn,
					emailAddress: update.email,
					yearsOfExperience: update.yoe,
					contractType: update.ct,
					positionApplied: update.posApp,
					positionCode: update.posCode,
					dateJoined: update.dj,
					emergencyName: update.en,
					emergencyAddress: update.ea,
					emergencyContactNumber: update.ecn,
					emergencyRelationship: update.er,
					assignedProjects: update.assignedProjects,
					imageName: update.in,
					imageSrc: update.is,
					imageFile: update.if
				}),
			});
			// console.log(pic)
			console.log(res)
		} catch (error) {
			console.log(error);
		}

		await getEmployees();
		setIsUpdated(!isUpdated);
		toast({
			title: `Employee #${e.id}`,
			description: `${update.fn} ${update.ln} Successfully updated"`,
			status: "success",
			duration: 2000,
			isClosable: true,
		});
		onClose();
	};
	const deleteEmployee = async (event) => {
		let fn =
			update.fn.split(" ").length > 1
				? update.fn
						.split(" ")
						.map((e) => {
							return `${e[0].toUpperCase()}${e.slice(1, e.length)}`;
						})
						.join(" ")
				: update.fn[0].toUpperCase() + update.fn.slice(1, update.fn.length);

		let mn =
			update.mn.split(" ").length > 1
				? update.mn
						.split(" ")
						.map((e) => {
							return `${e[0].toUpperCase()}${e.slice(1, e.length)}`;
						})
						.join(" ")
				: update.mn[0].toUpperCase() + update.mn.slice(1, update.mn.length);

		let ln =
			update.ln.split(" ").length > 1
				? update.ln
						.split(" ")
						.map((e) => {
							return `${e[0].toUpperCase()}${e.slice(1, e.length)}`;
						})
						.join(" ")
				: update.ln[0].toUpperCase() + update.ln.slice(1, update.ln.length);

		event.preventDefault();
		const url = `https://localhost:7241/Employee/${e.id}`;

		try {
			const res = await fetch(url, {
				method: "put",
				headers: { "Content-Type": "application/json-patch+json" },
				body: JSON.stringify({
					id: e.id,
					firstName: fn,
					middleName: mn,
					active: false,
					lastName: ln,
					cityAddress: update.ca,
					cityContactNumber: update.ccn,
					numberOfDependents: update.nod,
					civicClubAffliation: update.cca,
					religion: update.rel,
					bloodType: update.bt,
					age: update.age,
					sex: update.sex,
					civilStatus: update.cs,
					birthdate: update.bdate,
					profession: update.prof,
					contactNumber: update.cn,
					emailAddress: update.email,
					yearsOfExperience: update.yoe,
					contractType: update.ct,
					positionApplied: update.posApp,
					positionCode: update.posCode,
					dateJoined: update.dj,
					emergencyName: update.en,
					emergencyAddress: update.ea,
					emergencyContactNumber: update.ecn,
					emergencyRelationship: update.er,
					assignedProjects: update.assignedProjects,
					imageName: update.in,
					imageSrc: update.is,
					imageFile: update.if
				}),
			});
		} catch (error) {
			console.log(error);
		}

		await getEmployees();
		setIsUpdated(!isUpdated);

		toast({
			title: `Employee #${update.id}`,
			description: `${update.fn} ${update.ln} successfully deactivated"`,
			status: "success",
			duration: 2000,
			isClosable: true,
		});
		onClose();
	};
	var curr = new Date();
	curr.setFullYear(curr.getFullYear() - 22);
	var date = curr.toISOString().substring(0, 10);

	const validateAge = () => {
		var bd = new Date(update.bdate).getFullYear();
		return bd < curr.getFullYear() - 80 || bd > curr.getFullYear()
			? false
			: true;
	};
	return (
		<tr
			onClick={onOpen}
			className="p-10 cursor-pointer hover:bg-neutral-100 dark:hover:bg-[#111] transition duration-300 ease-in-out"
			ref={btnRef}
		>
			<td className="px-10 py-9 whitespace-nowrap">
				<div className="flex items-center">
					<div className="font-medium text-gray-800 dark:text-white transition duration-500 ">
						{e.id}
					</div>
				</div>
			</td>
			<td className="pl-24 whitespace-nowrap">
				<div className="text-left transition duration-500  text-black dark:text-white">
					{e.firstName} {e.middleName[0]}. {e.lastName}
				</div>
			</td>
			<td className="p-2 whitespace-nowrap">
				<div className="text-left transition duration-500 text-black dark:text-white ">
					{e.positionApplied}
				</div>
			</td>

			<td className="p-2 whitespace-nowrap">
				<div className=" text-center transition duration-500 text-black dark:text-white">
					{e.status ? (
						<Badge variant="subtle" colorScheme="green">
							Active
						</Badge>
					) : (
						<Badge variant="subtle" colorScheme="red">
							Inactive
						</Badge>
					)}
				</div>
			</td>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
				size={"xl"}
			>
				<DrawerOverlay />
				<DrawerContent>
					<div className="-z-10">
						<DrawerCloseButton
							fontSize={".6rem"}
							left={-7}
							bg={"white"}
							_hover={{ bg: "white" }}
							_focus={{ bg: "white" }}
							size="md"
						/>
					</div>
					<DrawerHeader
						className="leading-4 flex flex-row items-center gap-5 mb-10 z-20"
						paddingTop={8}
					>
						<img className="absolute -z-10 left-0" src={dhbg} alt="" />
						<div>
							{isPicSelected && pic!=undefined?(
								<FormControl>
									<FormLabel>
										<div className="overflow-hidden flex justify-center w-28 h-28 rounded-full">
											<img
												src={pic}
												className="mb-[-1rem] hover:opacity-40 cursor-pointer object-cover"
												/>
												{console.log(update)}
										</div>
										<Input type={'file'}  accept='image/*' onChange={changeHandler} hidden></Input>
									</FormLabel>
								</FormControl>
							):(
							<FormControl>
								<FormLabel>
									<div className="overflow-hidden flex justify-center w-28 h-28 rounded-full">
										<img
											src={def}
											width={'100%'}
											className="mb-[-1rem] hover:opacity-40 cursor-pointer object-cover"
											/>
									</div>
									<Input type={'file'}  accept='image/*' onChange={changeHandler} hidden></Input>
								</FormLabel>
							</FormControl>
							)}
						</div>
						<div>
							<h1 className="text-3xl">
								{e.firstName} {e.lastName}
							</h1>
							<h6 className="font-light text-md">
								{e.posApp}
								{"\n"}
							</h6>
							<small className="font-light text-sm">{e.emailAddress}</small>
						</div>
					</DrawerHeader>

					<DrawerBody>
						<Tabs colorScheme={'red'}>
							<TabList className="fixed z-10 bg-white w-[92%] pt-5 -mt-3">
								<Tab fontWeight={500}>DETAILS</Tab>
								<Tab fontWeight={500}>PROJECTS</Tab>
								<Tab fontWeight={500}>PERFORMANCE</Tab>
							</TabList>
							<TabPanels className="pt-[4rem]">
								<TabPanel
									margin={5}
									padding={8}
									border="1px solid #aaa"
									display={"flex"}
									flexDirection={"column"}
									borderRadius={20}
								>
									<div className="flex flex-row gap-5">
										<FormControl>
											<FormLabel>First name</FormLabel>
											<Input
												onChange={handleChange}
												name="fn"
												value={update.fn}
												placeholder="First name"
											/>
										</FormControl>

										<FormControl>
											<FormLabel>Middle name</FormLabel>
											<Input
												onChange={handleChange}
												name="mn"
												value={update.mn}
												placeholder="Middle name"
											/>
										</FormControl>
									</div>

									<div className="flex flex-row gap-5 mt-4">
										<FormControl>
											<FormLabel>Last name</FormLabel>
											<Input
												onChange={handleChange}
												value={update.ln}
												name="ln"
												placeholder="Last name"
											/>
										</FormControl>

										<EmailInput
											isEmailValid={isEmailValid}
											handleChange={handleChange}
											value={update.email}
										/>
									</div>

									<div className="flex flex-row gap-5 mt-4 items-center">
										<ContactNumber
											label={"Contact Number"}
											w={"100%"}
											addname={"cn"}
											handleChange={handleChange}
											val={update.cn}
											isPhoneValid={isPhoneValid.cn}
										/>
										<FormControl>
											<FormLabel>Birthdate</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												type="date"
												max={date}
												name="bdate"
												value={update.bdate}
												id=""
											/>
										</FormControl>

										<FormControl w={300}>
											<FormLabel>Age</FormLabel>
											<input
												onChange={handleChange}
												className={`border px-3 transition-all duration-300 py-2 rounded-lg w-full ${
													validateAge()
														? "text-neutral-400 "
														: "border-red-500 border-2 text-neutral-400  "
												}`}
												name="age"
												value={
													validateAge()
														? calculateAge(update.bdate)
														: "Invalid Date"
												}
												id=""
												disabled={true}
											/>
										</FormControl>
									</div>
									<FormControl mt={4}>
										<FormLabel>Sex</FormLabel>
										<Select
											onChange={handleChange}
											className="border px-3 py-2 rounded-lg w-full"
											name="sex"
											value={update.sex}
											id=""
										>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
											<option value="Other">Other</option>
										</Select>
									</FormControl>
									<div className="flex flex-row gap-5 mt-4">
										<FormControl>
											<FormLabel>City Address</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="ca"
												value={update.ca}
												placeholder="Unit 1, Brgy. 2, City, Province"
												id=""
											></Input>
										</FormControl>

										<ContactNumber
											label={"City Contact Number"}
											w={"100%"}
											addname={"ccn"}
											handleChange={handleChange}
											val={update.ccn}
											isPhoneValid={isPhoneValid.ccn}
										/>
									</div>

									<div className="flex flex-row items-end gap-5 mt-4">
										<FormControl>
											<FormLabel>No. of Dependents</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="nod"
												id=""
												value={update.nod}
												type="text"
											/>
										</FormControl>
										<FormControl>
											<FormLabel>Civic Club Affiliation</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="cca"
												id=""
												value={update.cca}
												type="text"
											/>
										</FormControl>
										<FormControl>
											<FormLabel>Religion</FormLabel>
											<Select
												onChange={handleChange}
												className="border px-3  rounded-lg w-full"
												name="rel"
												id=""
												value={update.rel}
											>
												<option value="Roman Catholic">Roman Catholic</option>
												<option value="Muslim">Muslim</option>
												<option value="Iglesia Ni Cristo">
													Iglesia Ni Cristo
												</option>
												<option value="Protestant">Protestant</option>
												<option value="Jehova's Witness">
													Jehova's Witness
												</option>
												<option value="Buddhist">Buddhist</option>
												<option value="Agnostic">Agnostic</option>
												<option value="Atheist">Atheist</option>
												<option value="Other">Prefer not to say</option>
											</Select>
										</FormControl>
									</div>

									<div className="flex flex-row gap-5 mt-4">
										<FormControl width={"30%"}>
											<FormLabel>Blood Type</FormLabel>
											<Select
												onChange={handleChange}
												className="border px-3  rounded-lg w-full"
												name="bt"
												id=""
												value={update.bt}
											>
												<option value="A+">A+</option>
												<option value="A-">A-</option>
												<option value="B+">B+</option>
												<option value="B-">B-</option>
												<option value="O+">O+</option>
												<option value="O-">O-</option>
												<option value="AB+">AB+</option>
												<option value="AB-">AB-</option>
											</Select>
										</FormControl>
										<FormControl width={"30%"}>
											<FormLabel>Years of Experience</FormLabel>
											<InputGroup>
												<Input
													onChange={handleChange}
													name="yoe"
													value={update.yoe}
													placeholder="3"
												/>
												<InputRightAddon children="years" />
											</InputGroup>
										</FormControl>
									</div>

									<div className="flex flex-row gap-3 mt-4">
										<FormControl>
											<FormLabel>Position Applied</FormLabel>
											<Select
												onChange={handleChange}
												className="border px-3  rounded-lg w-full"
												name="posApp"
												id=""
												value={update.posApp}
											>
												{position.map((e, i) => {
													return (
														<option key={i} value={e.name}>
															{e.name}
														</option>
													);
												})}
											</Select>
										</FormControl>
										<FormControl>
											<FormLabel>Position Code</FormLabel>
											<Input
												onChange={handleChange}
												name="posCode"
												placeholder=""
												disabled
												value={update.posCode}
											/>
										</FormControl>
										<FormControl>
											<FormLabel>Date Joined</FormLabel>
											<input
												value={update.dj}
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												type="date"
												name="dj"
												id=""
											/>
										</FormControl>
									</div>

									<div className="flex flex-row gap-5 mt-4">
										<FormControl>
											<FormLabel>Civil Status</FormLabel>
											<Select
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="cs"
												value={update.cs}
												id=""
											>
												<option value="Single">Single</option>
												<option value="Married">Married</option>
												<option value="Divorced">Divorced</option>
												<option value="Widow">Widow</option>
											</Select>
										</FormControl>

										<FormControl>
											<FormLabel>Contract Type</FormLabel>
											<Select
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="ct"
												value={update.ct}
												id=""
											>
												<option value="Regular">Regular</option>
												<option value="Part-time">Part-time</option>
											</Select>
										</FormControl>
									</div>

									<div className="flex flex-row gap-5 mt-4">
										<FormControl>
											<FormLabel>Profession</FormLabel>
											<Input
												onChange={handleChange}
												value={update.prof}
												name="prof"
												placeholder="Profession"
											/>
										</FormControl>

										<FormControl>
											<FormLabel>Date Joined</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												type="date"
												name="dj"
												value={update.dj}
												id=""
											/>
										</FormControl>
									</div>
									<h2 className=" pt-10 pb-4 text-2xl font-semibold text-[#383838]">
										Emergency Contact
									</h2>
									<div className="flex flex-row gap-3 mt-4">
										<FormControl>
											<FormLabel>Emergency Name</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="en"
												id=""
												value={update.en}
											/>
										</FormControl>
										<FormControl>
											<FormLabel>Emergency Address</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="ea"
												id=""
												placeholder="Unit 1, Brgy. 2, City, Province"
												value={update.ea}
											/>
										</FormControl>
									</div>

									<div className="flex flex-row gap-3 mt-4">
										<ContactNumber
											label={"Emergency Contact Number"}
											w={"100%"}
											addname={"ecn"}
											handleChange={handleChange}
											val={update.ecn}
											isPhoneValid={isPhoneValid.ecn}
										/>
										<FormControl>
											<FormLabel>Emergency Relationship</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="er"
												id=""
												placeholder="Wife"
												value={update.er}
											/>
										</FormControl>
									</div>
									<hr className=" pb-6" />
								</TabPanel>
								<TabPanel>
									{e.assignedProjects
										? e.assignedProjects.map((e) => (
												<div className="px-5 py-5 shadow-md w-[50%] mb-8 rounded-lg text-2xl font-semibold">
													<p>{e.name}</p>
												</div>
										  ))
										: ""}
								</TabPanel>
							</TabPanels>
						</Tabs>
					</DrawerBody>

					<DrawerFooter>
						<button
							className={`font-semibold px-5 mr-3 py-2 rounded-lg transition-all duration-300 ${
								isFormValid
									? "bg-yellow-400 hover:opacity-80  text-[#353535] "
									: "bg-neutral-100 cursor-default text-[#949494]"
							}`}
							id={"addEmployee"}
							onClick={isFormValid ? updateEmployee : null}
							colorScheme=""
							mr={3}
						>
							Update
						</button>
						<Popover closeOnBlur={false} placement="left">
							{({ isOpen, onClose }) => (
								<>
									<PopoverTrigger>
										<Button colorScheme="red">Deactivate</Button>
									</PopoverTrigger>
									<PopoverContent>
										<PopoverArrow />
										<PopoverCloseButton />
										<PopoverHeader>Confirmation!</PopoverHeader>
										<PopoverBody>
											Are you sure you want to deactivate this employee?
										</PopoverBody>
										<div className="flex justify-end pb-5 pr-5 pt-5 gap-3">
											<Button onClick={deleteEmployee} colorScheme="red">
												Yes
											</Button>
											<Button onClick={onClose}>No, Thanks!</Button>
										</div>
									</PopoverContent>
								</>
							)}
						</Popover>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</tr>
	);
};

export default EmployeeRow;
