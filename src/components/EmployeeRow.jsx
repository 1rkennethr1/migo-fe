import React from "react";
import {
	Button,
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
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../lib/context";
const EmployeeRow = ({ e }) => {
	const toast = useToast();
	const { getEmployees } = useStateContext();
	const employeeInitRef = React.useRef(null);
	const employeeFinalRef = React.useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [update, setUpdate] = useState({
		fn: e.firstName,
		mn: e.middleName,
		ln: e.lastName,
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
		event.preventDefault();
		const url = `https://localhost:7259/api/Employee?Id=${e.id}&FirstName=${update.fn}&MiddleName=${update.mn}&LastName=${update.ln}&Role=${update.role}&DateJoined=${update.dj}`;
		axios.put(url).then((result) => console.log(result));
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
		const url = `https://localhost:7259/api/Employee/${e.id}`;
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
			<Modal
				initialFocusRef={employeeInitRef}
				finalFocusRef={employeeFinalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Employee #{e.id}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>First name</FormLabel>
							<Input
								onChange={handleChange}
								name="fn"
								value={update.fn}
								placeholder="First name"
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Middle name</FormLabel>
							<Input
								onChange={handleChange}
								name="mn"
								value={update.mn}
								placeholder="Middle name"
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Last name</FormLabel>
							<Input
								onChange={handleChange}
								value={update.ln}
								name="ln"
								placeholder="Last name"
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Role</FormLabel>
							<Input
								onChange={handleChange}
								value={update.role}
								name="role"
								placeholder="Role"
							/>
						</FormControl>

						<FormControl mt={4}>
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
					</ModalBody>

					<ModalFooter>
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
					</ModalFooter>
				</ModalContent>
			</Modal>
		</tr>
	);
};

export default EmployeeRow;
