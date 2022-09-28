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
	Tag,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import { useStateContext } from "../lib/context";
const AddEmployeeForm = () => {
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
	const [add, setAdd] = useState({
		fn: "",
		mn: "",
		ln: "",
		role: "",
		dj: "",
	});
	const handleChange = (e) => {
		const { value, name } = e.target;
		setAdd({
			...add,
			[name]: value,
		});
	};
	const addEmployee = async (e) => {
		e.preventDefault();
		let fn = add.fn.split(" ").length > 1 ?
			add.fn.split(" ").map(e => {return `${e[0].toUpperCase()}${e.slice(1, e.length)}`}).join(" ") :
			add.fn[0].toUpperCase() + add.fn.slice(1, add.fn.length)
		
		let mn = add.mn.split(" ").length > 1 ?
		add.mn.split(" ").map(e => {return `${e[0].toUpperCase()}${e.slice(1, e.length)}`}).join(" ") :
		add.mn[0].toUpperCase() + add.mn.slice(1, add.mn.length)

		let ln = add.ln.split(" ").length > 1 ?
			add.ln.split(" ").map(e => {return `${e[0].toUpperCase()}${e.slice(1, e.length)}`}).join(" ") :
			add.ln[0].toUpperCase() + add.ln.slice(1, add.ln.length)
		
		// data.LastName.split("").splice(0, 1).join("").toUpperCase() +
		// data.LastName.split("").splice(1, data.LastName.length).join("");

		let date = add.dj;
		const url = `https://localhost:7259/api/Employee?Id=${
			employees.length===0 ? 
			1 :
			employees[employees.length - 1].id + 1
		}&FirstName=${fn}&MiddleName=${mn}&LastName=${ln}&Role=${
			add.role
		}&DateJoined=${date}`;
		axios.post(url).then((result) => console.log(result));
		onClose();
		await getEmployees();
		setAdd({ fn: "", mn: "", ln: "", role: "", dj: "" });
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
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Employee</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>First name</FormLabel>
							<Input
								onChange={handleChange}
								name="fn"
								ref={initialRef}
								placeholder="First name"
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Middle name</FormLabel>
							<Input
								onChange={handleChange}
								name="mn"
								placeholder="Middle name"
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Last name</FormLabel>
							<Input
								onChange={handleChange}
								name="ln"
								placeholder="Last name"
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Role</FormLabel>
							<Input onChange={handleChange} name="role" placeholder="Role" />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Date Joined</FormLabel>
							<input
								onChange={handleChange}
								className="border px-3 py-2 rounded-lg w-full"
								type="date"
								name="dj"
								id=""
							/>
						</FormControl>
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
