import React, { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { useEffect } from "react";
import axios from "axios";
import {
	Button,
	CircularProgress,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Select,
	Tag,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import { useStateContext } from "../lib/context";

const AddEmployeeForm = () => {
	const month = new Date().getMonth();
	const day = new Date().getDay();
	const year = new Date().getFullYear();
	console.log(month, day, year);
	const [isEmailValid, setIsEmailValid] = useState();
	const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
		<div
			className="hover:opacity-60 transition-opacity duration-300"
			ref={ref}
			{...rest}
		>
			{children}
		</div>
	));
	const { getEmployees, employees } = useStateContext();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	/*
		cn = contactNumber;
		ct = contractType; 
	*/

	const [add, setAdd] = useState({
		fn: "",
		mn: "",
		ln: "",
		age: "",
		sex: "Male",
		cs: "Single",
		bday: "",
		cn: "",
		email: "",
		ct: "Regular",
		role: "",
		dj: "",
	});
	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	const handleChange = async (e) => {
		await getEmployees();
		const { value, name } = e.target;
		setAdd({
			...add,
			[name]: value,
		});
		if (name == "bday") {
			setAdd({ ...add, [name]: value, age: calculateAge() });
		}
		if (name == "email") {
			validateEmail(value) ? setIsEmailValid(true) : setIsEmailValid(false);
		}
	};
	function calculateAge() {
		let birthDate = new Date(add.bday);
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
	const addEmployee = async (e) => {
		e.preventDefault();
		await getEmployees();
		// fn, mn, ln Uppercase first letter formatter
		let fn =
			add.fn.split(" ").length > 1
				? add.fn
						.split(" ")
						.map((e) => {
							return `${e[0].toUpperCase()}${e.slice(1, e.length)}`;
						})
						.join(" ")
				: add.fn[0].toUpperCase() + add.fn.slice(1, add.fn.length);

		let mn =
			add.mn.split(" ").length > 1
				? add.mn
						.split(" ")
						.map((e) => {
							return `${e[0].toUpperCase()}${e.slice(1, e.length)}`;
						})
						.join(" ")
				: add.mn[0].toUpperCase() + add.mn.slice(1, add.mn.length);

		let ln =
			add.ln.split(" ").length > 1
				? add.ln
						.split(" ")
						.map((e) => {
							return `${e[0].toUpperCase()}${e.slice(1, e.length)}`;
						})
						.join(" ")
				: add.ln[0].toUpperCase() + add.ln.slice(1, add.ln.length);

		// data.LastName.split("").splice(0, 1).join("").toUpperCase() +
		// data.LastName.split("").splice(1, data.LastName.length).join("");

		axios({
			method: "post",
			url: "https://localhost:7241/Employee",
			data: {
				firstName: fn,
				middleName: mn,
				lastName: ln,
				age: add.age,
				sex: add.sex,
				civilStatus: add.cs,
				birthday: add.bday,
				contactNumber: add.cn,
				emailAddress: add.email,
				contractType: add.ct,
				role: add.role,
				dateJoined: add.dj,
			},
		});
		await getEmployees();
		onClose();
		await getEmployees();
		setAdd({
			fn: "",
			mn: "",
			ln: "",
			age: "",
			sex: "Male",
			cs: "",
			bday: "",
			cn: "",
			email: "",
			ct: "",
			role: "",
			dj: "",
		});
		await getEmployees();
	};

	return (
		<div className="text-3xl cursor-pointer">
			<Tooltip placement="right" label="Add Employee">
				<CustomCard onClick={onOpen}>
					<HiUserAdd />
				</CustomCard>
			</Tooltip>

			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
				size="5xl"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize={50}>Add Employee</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<div className="flex flex-row gap-3">
							<FormControl>
								<FormLabel>First name</FormLabel>
								<Input
									onChange={handleChange}
									name="fn"
									ref={initialRef}
									placeholder="First name"
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Middle name</FormLabel>
								<Input
									onChange={handleChange}
									name="mn"
									placeholder="Middle name"
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Last name</FormLabel>
								<Input
									onChange={handleChange}
									name="ln"
									placeholder="Last name"
								/>
							</FormControl>
						</div>

						<div className="flex flex-row gap-3">
							<FormControl mt={4}>
								<FormLabel>Birthdate</FormLabel>
								<Input
									onChange={handleChange}
									className="border px-3 py-2 rounded-lg w-full"
									type="date"
									name="bday"
									id=""
								/>
							</FormControl>
							<FormControl mt={4}>
								<FormLabel>Age</FormLabel>
								<Input disabled name="age" value={add.age} placeholder="Age" />
							</FormControl>
							<FormControl mt={4}>
								<FormLabel>Sex</FormLabel>
								<Select
									onChange={handleChange}
									className="border px-3 py-2 rounded-lg w-full"
									name="sex"
									id=""
								>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Other">Other</option>
								</Select>
							</FormControl>
							<FormControl mt={4}>
								<FormLabel>Civil Status</FormLabel>
								<Select
									onChange={handleChange}
									className="border px-3 py-2 rounded-lg w-full"
									name="cs"
									id=""
								>
									<option default value="Single">
										Single
									</option>
									<option value="Married">Married</option>
									<option value="Divorced">Divorced</option>
									<option value="Widow">Widow</option>
								</Select>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>Contact Number</FormLabel>
								<Input
									onChange={handleChange}
									className="border px-3 py-2 rounded-lg w-full"
									name="cn"
									id=""
									placeholder="+639123456789"
								/>
							</FormControl>
						</div>
						<div className="flex flex-row gap-3 mt-4">
							<FormControl>
								<FormLabel>Email Address</FormLabel>

								<Input
									focusBorderColor={isEmailValid ? "green.500" : "red.300"}
									isInvalid={isEmailValid ? false : true}
									errorBorderColor="red.300"
									onChange={handleChange}
									className="border px-3 py-2 rounded-lg w-full"
									type="email"
									name="email"
									id=""
								/>
								{isEmailValid ? null : (
									<p className="text-red-500 text-xs pt-3">Invalid E-mail</p>
								)}
							</FormControl>

							<FormControl>
								<FormLabel>Contract Type</FormLabel>
								<Select
									onChange={handleChange}
									className="border px-3 py-2 rounded-lg w-full"
									name="ct"
									id=""
								>
									<option value="Regular">Regular</option>
									<option value="Part-time">Part-time</option>
								</Select>
							</FormControl>
						</div>

						<div className="flex flex-row gap-3 mt-4">
							<FormControl>
								<FormLabel>Role</FormLabel>
								<Input onChange={handleChange} name="role" placeholder="Role" />
							</FormControl>

							<FormControl>
								<FormLabel>Date Joined</FormLabel>
								<input
									onChange={handleChange}
									className="border px-3 py-2 rounded-lg w-full"
									type="date"
									name="dj"
									id=""
								/>
							</FormControl>
						</div>
					</ModalBody>

					<ModalFooter>
						<Button onClick={addEmployee} colorScheme="green" mr={3}>
							Add
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default AddEmployeeForm;
