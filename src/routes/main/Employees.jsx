//icons
import { GrSearch } from "react-icons/gr";

//lib
import { motion } from "framer-motion";
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
	} = useStateContext();
	useEffect(() => {
		getEmployees();
	}, [status]);

	if (isFetchingEmployees) {
		return (
			<MainLayout>
				<div className="flex justify-center items-center w-full">
					<CircularProgress isIndeterminate color="red" />
				</div>
			</MainLayout>
		);
	}
	const statusHandler = (e) => {
		const { value } = e.target;
		setStatus(value);
		getEmployees();
	};
	return (
		<MainLayout>
			<motion.div
				className="flex justify-center"
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
				<div
					className={`w-screen transition-all duration-500 ${
						minimized ? "max-w-[75rem]" : "2xl:max-w-[90rem] max-w-5xl"
					} ml-20 h-[80vh] overflow-y-scroll mt-10  bg-white dark:bg-[#171717]  shadow-lg rounded-xl border border-gray-200 dark:border-neutral-600`}
				>
					<div className="flex flex-col">
						<header className="px-5 py-4 border-b border-gray-100 dark:border-neutral-600 transition duration-500 dark:bg-[#0d0d0d]  sticky top-0 bg-white flex flex-col">
							<div className="flex justify-between items-center">
								<h2 className="font-semibold text-gray-800 py-3 text-xl dark:text-white transition duration-500 ">
									Alliance Software Inc. Employees
								</h2>
								<AddEmployeeForm />
							</div>
							<div className="flex gap-5">
								<Select
									name="status"
									onChange={statusHandler}
									value={status}
									w={"15%"}
								>
									<option value="all">All</option>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
								</Select>
								<div className="relative">
									<input
										value={searchValue}
										onChange={searchHandler}
										placeholder="Search for an Employee"
										type="text"
										className="border rounded-md w-[20rem] pl-5 pr-10 outline-none focus:border-2 focus:border-purple-900 transition-all duration-300 h-full"
									></input>
									<div className="absolute top-3 right-3">
										<GrSearch />
									</div>
								</div>
							</div>
						</header>
					</div>
					<div className="">
						<div className="">
							<table className="table-auto w-full">
								<thead className="text-xs sticky transition duration-500 top-[85px] w-full font-semibold uppercase dark:bg-[#1f1f1f] text-gray-700 dark:text-white bg-gray-200  ">
									<tr>
										<th className="whitespace-nowrap">
											<div className="font-semibold text-left pl-10">ID</div>
										</th>
										<th className="pl-24 whitespace-nowrap">
											<div className="font-semibold text-left">Name</div>
										</th>
										<th className="p-2 whitespace-nowrap">
											<div className="font-semibold text-left">Role</div>
										</th>

										<th className="p-2 whitespace-nowrap">
											<div className="font-semibold text-center">Status</div>
										</th>
									</tr>
								</thead>
								<tbody className="text-md divide-y divide-gray-100 dark:divide-neutral-700">
									{employees.map((e) => {
										return <EmployeeRow key={e.id} e={e} />;
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
