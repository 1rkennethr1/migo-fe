import React from "react";
import "../index.css";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
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

import { motion } from "framer-motion";
import def from "../assets/default.png";
import dhbg from "../assets/drawerheader.png";

const EmployeeRow = ({ e }) => {
	const toast = useToast();
	const { getEmployees } = useStateContext();
	// const employeeInitRef = React.useRef(null);
	// const employeeFinalRef = React.useRef(null);
	const btnRef = React.useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [update, setUpdate] = useState({
		fn: e.firstName,
		mn: e.middleName,
		ln: e.lastName,
		age: e.age,
		sex: e.sex,
		cs: e.civilStatus,
		bday: e.birthday,
		cn: e.contactNumber,
		email: e.emailAddress,
		ct: e.contractType,
		role: e.role,
		dj: e.dateJoined,
	});
	const handleChange = (e) => {
		const { value, name } = e.target;
		setUpdate({
			...update,
			[name]: value,
		});
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
				age: update.age,
				sex: update.sex,
				civilStatus: update.cs,
				birthday: update.bday,
				contactNumber: update.cn,
				emailAddress: update.email,
				contractType: update.ct,
				role: update.role,
				dateJoined: update.dj,
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
					{e.role}
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
						className="leading-4 flex flex-row items-center gap-5 mb-10"
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
								{update.role}
								{"\n"}
							</h6>
							<small className="font-light text-sm">{update.email}</small>
						</div>
					</DrawerHeader>

					<DrawerBody>
						<Tabs colorScheme={"red"}>
							<TabList className="fixed z-10 bg-white w-[100%] pt-5 -mt-3">
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
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												type="email"
												name="email"
												value={update.email}
												id=""
											/>
										</FormControl>
									</div>
									<div className="flex flex-row gap-5 mt-4">
										<FormControl>
											<FormLabel>Contact Number</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="cn"
												value={update.cn}
												id=""
											/>
										</FormControl>

										<FormControl>
											<FormLabel>Birthday</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												type="date"
												name="bday"
												value={update.bday}
												id=""
											/>
										</FormControl>
										<FormControl>
											<FormLabel>Age</FormLabel>
											<Input
												onChange={handleChange}
												className="border px-3 py-2 rounded-lg w-full"
												name="age"
												value={update.age}
												id=""
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
											<FormLabel>Role</FormLabel>
											<Input
												onChange={handleChange}
												value={update.role}
												name="role"
												placeholder="Role"
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
												disabled="true"
											/>
										</FormControl>
									</div>
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
