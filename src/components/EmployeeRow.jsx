import React from "react";
import "../index.css";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
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
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../lib/context";
import { MdClose } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { motion } from "framer-motion";
import def from "../assets/default.png";
import dhbg from "../assets/drawerheader.png";

const EmployeeRow = ({ e }) => {
	const toast = useToast();
	const { getEmployees } = useStateContext();
	// const employeeInitRef = React.useRef(null);
	// const employeeFinalRef = React.useRef(null);
	const btnRef = React.useRef();
	const [isEmailValid, setIsEmailValid] = useState(true);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [update, setUpdate] = useState({
		fn: e.firstName,
		mn: e.middleName,
		ln: e.lastName,
		age: e.age,
		ca: e.cityAddress, //city address
		ccn: e.cityContactNumber, // city contact number
		pa: e.provincialAddress, // provincial address
		pcn: e.provincialContactNumber, //provincial contact number
		nod: e.numberOfDependents, //number of dependents
		cca: e.civicClubAffiliation, //civic club affiliation
		rel: e.religion, //religion
		bt: e.bloodType, //bloodtype
		sex: e.sex, //
		cs: e.civilStatus, //civil status
		bdate: e.birthdate, //birthdate
		prof: e.profession, //profession
		cn: e.contactNumber,// contact number
		email: e.emailAddress, //email
		yoe: e.yearsOfExperience, //years of experience
		ct: e.contractType, //contract type
		posApp: e.positionApplied,
		posCode: e.positionCode,
		dj: e.dateJoined, //date joined
		en: e.emergencyName, //emergency name
		ea: e.emergencyAddress, //emergency address
		ercn: e.emergencyResidentialContactNumber, //emergency Residential contact number
		eocn: e.emergencyOfficeContactNumber, //emergency office contact number
		ecn: e.emergencyContactNumber, //emergency contact number
		er: e.emergencyRelationship, //emergency relationship
	});
	const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
	  };
	const handleChange = (e) => {
		const { value, name } = e.target;
		setUpdate({
			...update,
			[name]: value,
		});
		if (name == "email") {
			validateEmail(value) ? setIsEmailValid(true) : setIsEmailValid(false);
		}
	};

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

		axios({
			method: "put",
			url: `https://localhost:7241/Employee/${e.id}`,
			data: {
				id: e.id,
				firstName: fn,
				middleName: mn,
				lastName: ln,
				cityAddress: update.ca,
				cityContactNumber: update.ccn,
				provincialAddress: update.pa,
				provincialContactNumber: update.pcn,
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
				emergencyResidentialContactNumber: update.ercn,
				emergencyOfficeContactNumber: update.eocn,
				emergencyContactNumber: update.ecn,
				emergencyRelationship: update.er
			},
		});
		await getEmployees();
		onClose();
		await getEmployees();
		toast({
			title: `Employee #${e.id}`,
			description: "Successfully updated",
			status: "success",
			duration: 1000,
			isClosable: true,
		});
	};
	const deleteEmployee = async (event) => {
		event.preventDefault();
		const url = `https://localhost:7241/Employee/${e.id}`;
		const res = await fetch(url, {
			method: "DELETE",
		});
		const data = await res.json();
		console.log(data);
		onClose();
		toast({
			title: "Employee removed.",
			description: `successfully deleted!`,
			status: "success",
			duration: 9000,
			isClosable: true,
		});
		await getEmployees();
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
					{e.dateJoined}
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
						<img
							src={"asdasd"}
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = def;
							}}
							width={90}
							className="mb-[-1rem]"
						/>
						<div>
							<h1 className="text-3xl">
								{update.fn} {update.ln}
							</h1>
							<h6 className="font-light text-md">
								{update.pa}
								{"\n"}
							</h6>
							<small className="font-light text-sm">{update.email}</small>
						</div>
					</DrawerHeader>

					<DrawerBody>
						<Tabs colorScheme={"red"}>
							<TabList className="fixed z-10 bg-white w-[92%] pt-5 -mt-3">
								<Tab fontWeight={500}>DETAILS</Tab>
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

										<FormControl>
											<FormLabel>Email Address</FormLabel>

											<InputGroup>
											<Input
												focusBorderColor={isEmailValid ? "green.500" : "red.300"}
												isInvalid={isEmailValid ? false : true}
												errorBorderColor="red.300"
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												type="email"
												name="email"
												id=""
												value={update.email}
											/>
											<InputRightElement
												children={
												isEmailValid ? (
													<div className="text-2xl text-green-500">
													<BsCheck />
													</div>
												) : (
													<div className="text-2xl text-red-500">
													<MdClose />
													</div>
												)
												}
											/>
											</InputGroup>
											{isEmailValid ? null : (
											<p className="text-red-500 text-xs pt-3">Invalid E-mail</p>
											)}
										</FormControl>
									</div>

									<div className="flex flex-row gap-5 mt-4">
										<FormControl>
											<FormLabel>Contact Number</FormLabel>
											<InputGroup>
												<InputLeftAddon children="+63" />
												<Input
													onChange={handleChange}
													className="border px-3 py-2 rounded-lg w-full"
													name="cn"
													id=""
													type="tel"
													placeholder="9123456789"
													value={update.cn}
												/>
											</InputGroup>
										</FormControl>

										<FormControl>
											<FormLabel>Birthday</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												type="date"
												name="bday"
												value={update.bdate}
												id=""
											/>
										</FormControl>

										<FormControl w={300}>
											<FormLabel>Age</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="age"
												value={update.age}
												id=""
												disabled={true}
											/>
										</FormControl>
										<FormControl>
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
									</div>

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
											>
											</Input>
										</FormControl>

										<FormControl>
											<FormLabel>City Contact Number</FormLabel>
											<InputGroup>
												<InputLeftAddon children="+63" />
												<Input
													onChange={handleChange}
													className="border px-3 py-2 rounded-lg w-full"
													name="ccn"
													id=""
													value={update.ccn}
													type="tel"
													placeholder="9123456789"
												/>
											</InputGroup>
										</FormControl>
									</div>

									<div className="flex flex-row gap-5 mt-4">
										<FormControl>
											<FormLabel>Provincial Address</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="pa"
												value={update.pa}
												placeholder="Unit 1, Brgy. 2, City, Province"
												id=""
											>
											</Input>
										</FormControl>

										<FormControl>
											<FormLabel>Provincial Contact Number</FormLabel>
											<InputGroup>
												<InputLeftAddon children="+63" />
												<Input
													onChange={handleChange}
													className="border px-3 py-2 rounded-lg w-full"
													name="pcn"
													id=""
													value={update.pcn}
													type="tel"
													placeholder="9123456789"
												/>
											</InputGroup>
										</FormControl>
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
												<option value="Roman Catholic">
													Roman Catholic
												</option>
												<option value="Muslim">Muslim</option>
												<option value="Iglesia Ni Cristo">Iglesia Ni Cristo</option>
												<option value="Protestant">Protestant</option>
												<option value="Jehova's Witness">Jehova's Witness</option>
												<option value="Buddhist">Buddhist</option>
												<option value="Agnostic">Agnostic</option>
												<option value="Atheist">Atheist</option>
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
												<option value="A+">
													A+
												</option>
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
											<Input onChange={handleChange} name="yoe" value={update.yoe} placeholder="3" />
											<InputRightAddon children="years" />
											</InputGroup>
										</FormControl>	
									</div>
									
									<div className="flex flex-row gap-3 mt-4">
									<FormControl>
										<FormLabel>Position Applied</FormLabel>
										<Input
										onChange={handleChange}
										name="posApp"
										placeholder="Web Developer"
										value={update.posApp}
										/>
									</FormControl>
									<FormControl>
										<FormLabel>Position Code</FormLabel>
										<Input
										onChange={handleChange}
										name="posCode"
										placeholder="I-69"
										value={update.posCode}
										/>
									</FormControl>
									<FormControl>
										<FormLabel>Date Joined</FormLabel>
										<input
										onChange={handleChange}
										className="border px-3 py-2 rounded-lg w-full"
										type="date"
										name="dj"
										id=""
										value={update.dj}
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
											<FormControl>
												<FormLabel>Emergency Residential Contact Number</FormLabel>

												<InputGroup>
												<InputLeftAddon children="+63" />
												<Input
													onChange={handleChange}
													className="border px-3 py-2 rounded-lg w-full"
													name="ercn"
													id=""
													type="tel"
													placeholder="9123456789"
													value={update.ercn}
												/>
												</InputGroup>
											</FormControl>
											<FormControl>
												<FormLabel>Emergency Residential Office Number</FormLabel>

												<InputGroup>
												<InputLeftAddon children="+63" />
												<Input
													onChange={handleChange}
													className="border px-3 py-2 rounded-lg w-full"
													name="eocn"
													id=""
													type="tel"
													placeholder="9123456789"
													value={update.eocn}
												/>
												</InputGroup>
											</FormControl>
											</div>
											<div className="flex flex-row gap-3 mt-4">
											<FormControl>
												<FormLabel>Emergency Contact Number</FormLabel>

												<InputGroup>
												<InputLeftAddon children="+63" />
												<Input
													onChange={handleChange}
													className="border px-3 py-2 rounded-lg w-full"
													name="ecn"
													id=""
													type="tel"
													placeholder="9123456789"
													value={update.ecn}
												/>
												</InputGroup>
											</FormControl>
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
							</TabPanels>
						</Tabs>
					</DrawerBody>

					<DrawerFooter>
						<Button
							onClick={updateEmployee}
							colorScheme="yellow"
							variant="outline"
							mr={3}
						>
							Update
						</Button>
						<Button onClick={deleteEmployee} colorScheme="red">
							Delete
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</tr>
	);
};

export default EmployeeRow;
