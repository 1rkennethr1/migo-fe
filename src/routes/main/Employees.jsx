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
const Employees = () => {
	const {
		minimized,
		employees,
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
	useEffect(() => {
		searchEmployees();
	}, [status]);
	const [statusDescending, setStatusDescending] = useState(true);
	const [idDescending, setIdDescending] = useState(true);
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

	return (
		<MainLayout>
			<motion.div
				className="flex justify-center"
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
				<div
					className={`w-screen pb-10 transition-all duration-500 ${
						minimized ? "max-w-[75rem]" : "2xl:max-w-[90rem] max-w-5xl"
					} ml-20 h-[80vh] overflow-y-scroll mt-10  bg-white dark:bg-[#171717]  shadow-lg rounded-xl border border-gray-200 dark:border-neutral-600`}
				>
					<div className="flex flex-col sticky top-0 z-50">
						<header className="px-5  py-4 border-b border-gray-100 dark:border-neutral-600 transition duration-500 dark:bg-[#0d0d0d]  sticky top-0 bg-white flex flex-col">
							<div className="flex justify-between items-center">
								<h2 className="font-semibold text-gray-800 py-3 text-xl dark:text-white transition duration-500 ">
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
									<div className="absolute right-2 pointer-events-none text-2xl">
										<BiChevronDown />
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
					<div className="">
						<div className="relative">
							<table className="table-auto w-full">
								<thead className="text-xs sticky   transition duration-500 top-[127px] w-full font-semibold uppercase dark:bg-[#1f1f1f] z-50 text-gray-700 dark:text-white bg-gray-200  ">
									<tr>
										<th className="whitespace-nowrap">
											<div className="font-semibold text-left pl-10">
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
													ID
													{idDescending === null ? null : (
														<div className="text-xl">
															{idDescending ? (
																<BiChevronUp />
															) : (
																<BiChevronDown />
															)}
														</div>
													)}
												</div>
											</div>
										</th>
										<th className="pl-24 whitespace-nowrap">
											<div className="font-semibold mr-32">Name</div>
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
														<div className="text-xl">
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
							<div className="">
								<AnimatePresence>
									{employees.length === 0 && searchValue ? (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.5 }}
											className="flex justify-center items-center h-[50vh]"
										>
											<p className="text-neutral-500">
												No results for{" "}
												<span className="font-semibold">"{searchValue}" </span>
												{status === "active"
													? "in Active Employees"
													: status === "inactive"
													? "in Inactive Employees"
													: ""}{" "}
											</p>
										</motion.div>
									) : employees.length === 0 && searchValue.length === 0 ? (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.5 }}
											className="flex justify-center items-center h-[50vh]"
										>
											<p className="text-neutral-500">
												Please run the backend server!
											</p>
										</motion.div>
									) : null}
								</AnimatePresence>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</MainLayout>
	);
};

export default Employees;
