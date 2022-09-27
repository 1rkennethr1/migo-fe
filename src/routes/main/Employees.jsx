import { AnimatePresence, motion } from "framer-motion";
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
	Spinner,
	Tag,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { useStateContext } from "../../lib/context";
import { HiUserAdd } from "react-icons/hi";
const Employees = () => {
	const [isFetching, setIsFetching] = useState(true);
	const [data, setData] = useState([]);
	const getEmployees = async () => {
		const res = await fetch("https://localhost:7259/api/employee");
		const data = await res.json();
		setData(data);
	};
	useEffect(() => {
		getEmployees();
		setIsFetching(false);
	}, []);

	const { minimized } = useStateContext();
	const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
		<div
			className="hover:opacity-60 transition-opacity duration-300"
			ref={ref}
			{...rest}
		>
			{children}
		</div>
	));
	const { isOpen, onOpen, onClose } = useDisclosure();
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
	const addEmployee = (e) => {
		e.preventDefault();
		let fn = add.fn.split(" ");
		let date = add.dj.replace("/", "%2f");
		const url = `https://localhost:7259/api/Employee?Id=${
			data.length + 1
		}&FirstName=${add.fn}&MiddleName=${add.mn}&LastName=${add.ln}&Role=${
			add.role
		}&DateJoined=${date}`;
		axios.post(url).then((result) => console.log(result));
		onClose();
		setAdd({ fn: "", mn: "", ln: "", role: "", dj: "" });
	};
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const addUrl =
		"https://localhost:7259/api/Employee?Id=2&FirstName=asdasd&MiddleName=adasdas&LastName=asdsad&Role=qdqdsad&DateJoined=wqd";

	if (isFetching) {
		return (
			<MainLayout>
				<Spinner />
			</MainLayout>
		);
	}
	return (
		<MainLayout>
			<motion.div
				className="flex justify-center"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0 }}
				transition={{
					duration: 0.3,
					type: "spring",
					damping: 20,
					stiffness: 100,
				}}
			>
				<div
					className={`w-screen transition-all duration-500 ${
						minimized ? "max-w-[75rem]" : "max-w-5xl"
					} ml-20 mx-auto h-[80vh] overflow-y-scroll mt-10  bg-white shadow-lg rounded-xl border border-gray-200`}
				>
					<header className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
						<h2 className="font-semibold text-gray-800 py-3 text-xl">
							Alliance Software Inc. Employees
						</h2>
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
											<Input
												onChange={handleChange}
												name="role"
												placeholder="Role"
											/>
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
					</header>
					<div className="">
						<div className="px-5">
							<table className="table-auto w-full">
								<thead className="text-xs sticky top-0 w-full font-semibold uppercase text-gray-400 bg-gray-50">
									<tr>
										<th className="p-2 whitespace-nowrap">
											<div className="font-semibold text-left">ID</div>
										</th>
										<th className="pl-24 whitespace-nowrap">
											<div className="font-semibold text-left">Name</div>
										</th>
										<th className="p-2 whitespace-nowrap">
											<div className="font-semibold text-left">Role</div>
										</th>
										<th className="p-2 whitespace-nowrap">
											<div className="font-semibold text-center">
												Date Joined
											</div>
										</th>
									</tr>
								</thead>
								<tbody className="text-sm divide-y divide-gray-100">
									{data.map((e) => {
										return (
											<tr className="p-10">
												<td className="px-2 py-5 whitespace-nowrap">
													<div className="flex items-center">
														<div className="font-medium text-gray-800">
															{e.id}
														</div>
													</div>
												</td>
												<td className="pl-24 whitespace-nowrap">
													<div className="text-left">
														{e.firstName} {e.middleName[0]}. {e.lastName}
													</div>
												</td>
												<td className="p-2 whitespace-nowrap">
													<div className="text-left">{e.role}</div>
												</td>
												<td className="p-2 whitespace-nowrap">
													<div className=" text-center">{e.dateJoined}</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</motion.div>
		</MainLayout>
	);
};

export default Employees;
