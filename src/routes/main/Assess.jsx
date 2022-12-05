import React, { useState } from "react";
import { useStateContext } from "../../lib/context";
import Papa from "papaparse";
import { motion } from "framer-motion";
import MainLayout from "../../components/MainLayout";
import dhbg from "../../assets/drawerheader.png";
import {
	Select,
	FormControl,
	FormLabel,
	Input,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from "@chakra-ui/react";
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

import EmployeeAssessItem from "../../components/EmployeeAssessItem";
import EmployeeTrainingItem from "../../components/EmployeeTrainingItem";
import { useEffect } from "react";
import def from "../../assets/default.png";

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);
const Assess = () => {
	const { employees } = useStateContext();
	const { minimized, allEmployees, activeEmployees, isFetchingEmployees } =
		useStateContext();
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [active, setActive] = useState({});
	const [assessment, setAssessment] = useState({});

	const commonConfig = { delimiter: "," };

	const [CSVData, setCSVData] = useState();
	const handleAssess = (e) => {
		if (selectedFile != undefined) {
			Papa.parse(selectedFile, {
				...commonConfig,
				header: true,
				complete: (result) => {
					setCSVData(result.data);
				},
			});
			document.querySelector(".table-data").classList.remove("hidden");
			document.querySelector(".table-data").classList.add("flex");
		} else {
			document.querySelector(".table-data").classList.remove("flex");
			document.querySelector(".table-data").classList.add("hidden");
		}
	};
	const [data1, setData1] = useState({
		labels: ["Quality", "Innovation", "Agility", "Efficiency", "Integrity"],
		datasets: [
			{
				label: "Consistency with Alliance Values",
				data: [0, 0, 0, 0, 0],
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
		],
	});
	const [data2, setData2] = useState({});
	const [data3, setData3] = useState({});
	const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
	};
	//   console.log(employees);
	useEffect(() => {
		setData1({
			labels: ["Quality", "Innovation", "Agility", "Efficiency", "Integrity"],
			datasets: [
				{
					label: "Consistency with Alliance Values",
					data: [1, 9, 3, 5, 2, 3],
					backgroundColor: "rgba(255, 99, 132, 0.2)",
					borderColor: "rgba(255, 99, 132, 1)",
					borderWidth: 1,
				},
			],
		});
	}, []);
	return (
		<MainLayout>
			<div>
				<div className="mb-20">
					<h1 className="text-5xl font-semibold">Assess Employees</h1>
					<h1 className="text-xl text-gray-400 ">
						Evaluate Alliance Software Inc. employees
					</h1>
				</div>
				<Tabs variant="enclosed" colorScheme={"red"}>
					<TabList>
						<Tab selected={{ color: "#E0585B, " }}>Evaluate</Tab>
						<Tab>In Need of Training</Tab>
						<Tab></Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<div className="flex flex-col w-full">
								<h2 className="text-2xl font-semibold mb-5">Not Evaluated</h2>
								<div className="flex flex-row flex-wrap gap-3">
									{activeEmployees.map((e) => {
										if (!e.evaluated)
											return (
												<EmployeeAssessItem disabled={false} key={e.id} e={e} />
											);
									})}
								</div>
								<h2 className="text-2xl font-semibold mb-5 pt-5">Evaluated</h2>
								<div className="flex flex-row flex-wrap gap-3">
									{activeEmployees.map((e) => {
										if (e.evaluated)
											return (
												<EmployeeAssessItem disabled={true} key={e.id} e={e} />
											);
									})}
								</div>
							</div>
						</TabPanel>
						<TabPanel width={"60%"}>
							<div className="flex flex-row flex-wrap gap-3">
								{activeEmployees.map((e) => {
									return (
										<EmployeeTrainingItem
											setAssessment={setAssessment}
											setActive={setActive}
											e={e}
										/>
									);
								})}
							</div>
							<div className="fixed top-0 right-0 bg-gray-50 p h-full w-[40rem] overflow-x-scroll">
								<div className="">
									<img className="sticky w-[100%] left-0" src={dhbg} alt="" />
									{active ? (
										<div className="flex flex-col px-10 pt-3">
											<div className=" absolute left-5 top-6 overflow-hidden flex justify-center w-20 h-20 rounded-full">
												<img
													src={
														active.imageSrc &&
														(active.imageSrc.split("/")[5].includes("jpeg") ||
															active.imageSrc.split("/")[5].includes("png") ||
															active.imageSrc.split("/")[5].includes("svg") ||
															active.imageSrc.split("/")[5].includes("jpg"))
															? active.imageSrc
															: def
													}
													className={`object-cover`}
												></img>
											</div>
											<div className="leading-3 absolute top-10 left-32">
												<h1 className=" font-bold text-xl">
													{active.firstName} {active.lastName}
												</h1>
												<h2>{active.positionApplied}</h2>
											</div>
											<h1 className="font-bold text-2xl">Results</h1>
											<Tabs variant={"unstyled"}>
												<TabList gap={".2rem"}>
													<Tab
														_selected={{ color: "white", bg: "#E0585B" }}
														bg={"#1A1A1A"}
														borderRadius={".5rem"}
														color={"white"}
													>
														CAV
													</Tab>
													<Tab
														_selected={{ color: "white", bg: "#E0585B" }}
														bg={"#1A1A1A"}
														borderRadius={".5rem"}
														color={"white"}
													>
														ACMR
													</Tab>
													<Tab
														_selected={{ color: "white", bg: "#E0585B" }}
														bg={"#1A1A1A"}
														borderRadius={".5rem"}
														color={"white"}
													>
														Performance
													</Tab>
												</TabList>
												<TabPanels>
													<TabPanel>
														{console.log(assessment)}
														<Radar data={data1} />
													</TabPanel>
													<TabPanel></TabPanel>
													<TabPanel></TabPanel>
												</TabPanels>
											</Tabs>
										</div>
									) : (
										""
									)}
								</div>
							</div>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</div>

			{/* <div className="flex w-full justify-center">
				<div className="flex flex-col w-[70%] rounded-lg shadow-lg dark:shadow-none dark:bg-[#121212] p-10 ">
				<div className="flex items-end gap-10 mb-10">
				<div className="flex flex-col items-start">
				<p className="text-xs mb-2 text-gray-400">Insert data</p>
				<Select>
				<option defaultValue={""}>Personal Data Sheet</option>
				<option value="">Exam Score</option>
				<option value="">Personality Assessment Exam Result</option>
								<option value="">PES Rating</option>
								<option value="">Assigned Projects</option>
								<option value="">Interview Results</option>
								</Select>
								</div>
								<div className="flex gap-10 items-center">
								<FormControl className="flex flex-row gap-10 h-10 items-center">
								<FormLabel
								htmlFor="fileInput"
								className="rounded-md dark:bg-[#1f1f1f] dark:text-white hover:cursor-pointer bg-gray-100 text-black p-[.6rem] mt-2 transition-all duration-300"
								>
									Upload File
								</FormLabel>
								<Input
								id="fileInput"
								className="p-1 hidden"
								type="file"
								accept="text/csv"
								name="file"
									onChange={changeHandler}
									/>
									{selectedFile != undefined && isFilePicked ? (
										<div>
										<p
										className="whitespace-nowrap overflow-hidden text-ellipsis max-w-xs"
										dir="rtl"
										>
										{selectedFile.name}
										</p>
										</div>
										) : (
											<p>No file selected</p>
											)}
											</FormControl>
											</div>
											</div>
											<button
											onClick={handleAssess}
											className="bg-[#ec2224] text-white text-lg py-2 rounded-lg font-semibold hover:opacity-80 transition-opacity duration-300"
											>
											Assess
											</button>
											</div>
											</div>
											<b>Parsed CSV File:</b> {JSON.stringify(CSVData,undefined,4)}
											<motion.div
											className="table-data hidden justify-center"
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
					} ml-20 h-[80vh] overflow-y-scroll mt-10  bg-white dark:bg-[#171717] shadow-lg rounded-xl border border-gray-200 dark:border-neutral-600`}
					>
					<header className="px-5 py-4 w-[275%] border-b border-gray-100 dark:border-neutral-600 transition duration-500 dark:bg-[#0d0d0d] flex justify-between items-center sticky top-0 bg-white">
					<h2 className="font-semibold text-gray-800 py-3 text-xl dark:text-white transition duration-500 ">
					Alliance Software Inc. Employees
					</h2>
					</header>
					<div className="">
					<div className="">
					<table className="table-auto w-full">
					<thead className="text-xs sticky transition duration-500 top-[85px] w-full font-semibold uppercase dark:bg-[#1f1f1f] text-gray-700 dark:text-white bg-gray-200  ">
					<tr>
					{CSVData != undefined && isFilePicked ? (
						Object.keys(CSVData[0]).map((event) => {
							return event.toLowerCase() != "employee_id" ? (
								<th className="pl-24 whitespace-nowrap">
								<div className="font-semibold text-center">
								{event}
								</div>
								</th>
								) : (
									<th className="whitespace-nowrap">
									<div className="font-semibold text-left pl-10 py-2">
									Employee ID
									</div>
									</th>
									);
								})
								) : (
									<p>No file selected</p>
									)}
									</tr>
									</thead>
									{employees.map((e) => {
										return <EmployeeRow key={e.id} e={e} />;
									})}
									<tbody className="text-md divide-y divide-gray-100 dark:divide-neutral-700">
									{CSVData != undefined && isFilePicked ? (
										CSVData.map((e) => {
											return (
												<tr>
												{" "}
												{Object.keys(e).map((event) => {
													return event.toLowerCase() == "employee_id" ? (
														<td className="whitespace-nowrap">
														<div className="font-semibold text-left pl-10 py-2">
														{e[event]}
														</div>
														</td>
														) : (
															<td className="pl-24 whitespace-nowrap">
															<div className="font-semibold text-left pl-10 py-2">
															{e[event]}
															</div>
															</td>
															);
														})}
														</tr>
														);
													})
													) : (
														<p>No </p>
														)}
														</tbody>
														</table>
														</div>
														</div>
														</div>
													</motion.div> */}
		</MainLayout>
	);
};

export default Assess;
