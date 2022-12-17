//icons
import { GrSearch } from "react-icons/gr";

//lib
import { AnimatePresence, motion } from "framer-motion";
import { CircularProgress, Input, Select } from "@chakra-ui/react";

//context
import { useStateContext } from "../../lib/context";

//components
import MainLayout from "../../components/MainLayout";
import EmployeeRow from "../../components/EmployeeRow";
import AddEmployeeForm from "../../components/AddEmployeeForm";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { useRef } from "react";
const Employees = () => {
	const {
		minimized,
		employees,
		allEmployees,
		activeEmployees,
		getEmployees,
		setEmployees,
		isFetchingEmployees,
		status,
		setStatus,
		searchValue,
		searchHandler,
		setSearchValue,
		searchEmployees,
	} = useStateContext();
	const [statusDescending, setStatusDescending] = useState(true);
	const [idDescending, setIdDescending] = useState(true);
	const newHires = useRef([]);
	newHires.current = activeEmployees.filter((e) => {
		if ((new Date() - new Date(e.dateJoined)) / 1000 / 60 / 60 / 24 < 180)
			return e;
	});
	useEffect(() => {
		searchEmployees();
	}, [status]);
	const statusHandler = (e) => {
		const { value } = e.target;
		setStatus(value);
		getEmployees();
	};

	if (isFetchingEmployees) {
		return (
			<MainLayout>
				<div className="flex justify-center items-center w-full">
					<CircularProgress isIndeterminate color="red" />
				</div>
			</MainLayout>
		);
	}

	console.log(employees);
	return (
		<MainLayout>
			<motion.div
				className="flex justify-center w-full"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0 }}
				transition={{
					duration: 0.5,
					type: "spring",
					damping: 20,
					stiffness: 90,
				}}
			>
				<div className="flex flex-col px-10 w-full ">
					<div className="flex flex-row gap-3 h-[15%] w-[60%]   justify-center rounded-lg shadow-lg dark:shadow-none dark:bg-[#1a1a1a] p-5 mb-10 mt-5">
						<div className="flex gap-10  bg-[#E0585B] w-[90%] p-8 rounded-lg items-center justify-center">
							<div>
								<BsPeopleFill size={25} color="white" />
							</div>
							<div className="flex flex-col justify-center items-center">
								<div className=" font-bold text-white">Total Employees</div>
								<div className="text-lg text-center font-bold text-white">
									{allEmployees.length}
								</div>
							</div>
						</div>
						<div className="flex gap-10  bg-[#ddad1d] w-[90%] p-8 rounded-lg items-center justify-center">
							<div>
								<BsPeopleFill size={25} color="white" />
							</div>
							<div className="flex flex-col justify-center items-center">
								<div className=" font-semibold text-white">New Hires</div>
								<div className="text-lg  font-bold text-white">
									{newHires.current.length}
								</div>
							</div>
						</div>
						<div className="flex gap-10 bg-[#FF9549] w-[90%] p-8 rounded-lg items-center justify-center">
							<div>
								<BsPeopleFill size={25} color="white" />
							</div>
							<div className="flex flex-col justify-center items-center">
								<div className=" font-semibold text-white">
									Active Employees
								</div>
								<div className="text-lg  font-bold text-white">
									{activeEmployees.length}
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col sticky top-0 z-50">
						<header className="px-5 mb-3 py-4 border-gray-100 dark:border-neutral-600 transition duration-500 dark:bg-[#1a1a1a]  sticky top-0 bg-white flex flex-col">
							<div className="flex justify-between items-center">
								<h2 className="font-semibold text-gray-800 py-3 text-lg dark:text-white transition duration-500 ">
									Alliance Software Inc. Employees
								</h2>
								<AddEmployeeForm />
							</div>
							<div className="flex gap-5">
								<div className="flex items-center relative">
									<select
										name="status"
										onChange={statusHandler}
										className="status  border rounded-md py-2 px-4 w-[7rem] dark:bg-black dark:text-white bg-white text-black duration-500 transition-all"
										value={status}
										w={"15%"}
									>
										<option value="all">All</option>
										<option value="active">Active</option>
										<option value="inactive">Inactive</option>
									</select>
									<div className="absolute right-2 pointer-events-none text-5xl font-bold">
										<BiChevronDown size={30} />
									</div>
								</div>

								<div className="relative">
									<input
										value={searchValue}
										onChange={searchHandler}
										placeholder="Search by (Name or Position)"
										type="text"
										className="border rounded-md w-[20rem] pl-5 pr-10 outline-none focus:border-2 focus:border-purple-900 transition-all duration-500 h-full dark:bg-black"
									></input>
									<div className="absolute top-3 right-3 pointer-events-none">
										<GrSearch />
									</div>
								</div>
							</div>
						</header>
					</div>
					<div>
						<table className="table-auto w-full">
							<thead className="text-xs sticky transition duration-500 top-[127px] w-full font-semibold uppercase dark:bg-[#1f1f1f] z-50 text-gray-700 dark:text-white">
								<tr>
									<th className="whitespace-nowrap">
										<div className="font-semibold text-left pl-[5.5rem]">
											<div
												onClick={() => {
													setIdDescending(!idDescending);
													idDescending
														? setEmployees(
																employees.sort((a, b) => a.id - b.id)
														  )
														: setEmployees(
																employees.sort((a, b) => b.id - a.id)
														  );
												}}
												className="flex gap-3 items-center cursor-pointer hover:opacity-75 transition-opacity"
											>
												Name
												{idDescending === null ? null : (
													<div className="text-lg">
														{idDescending ? <BiChevronUp /> : <BiChevronDown />}
													</div>
												)}
											</div>
										</div>
									</th>
									<th className="p-2 whitespace-nowrap">
										<div className="font-semibold text-left">Position</div>
									</th>

									<th className="p-2 whitespace-nowrap">
										<div className="font-semibold text-right ">
											<div
												onClick={() => {
													status === "all"
														? (setStatusDescending(!statusDescending),
														  setIdDescending(false),
														  statusDescending
																? setEmployees(
																		employees.sort(
																			(a, b) =>
																				Number(a.status) - Number(b.status)
																		)
																  )
																: setEmployees(
																		employees.sort(
																			(a, b) =>
																				Number(b.status) - Number(a.status)
																		)
																  ))
														: null;
												}}
												className="flex justify-center items-center cursor-pointer hover:opacity-75 transition-opacity "
											>
												<p>Status</p>
												{status === "all" && (
													<div className="text-lg">
														{statusDescending ? (
															<BiChevronDown />
														) : (
															<BiChevronUp />
														)}
													</div>
												)}
											</div>
										</div>
									</th>
								</tr>
							</thead>
							<tbody className="text-md divide-y divide-gray-100 dark:divide-neutral-700 relative">
								{employees.map((e) => {
									return <EmployeeRow key={e.id} e={e} />;
								})}
							</tbody>
						</table>
					</div>
				</div>
			</motion.div>
		</MainLayout>
	);
};

export default Employees;
