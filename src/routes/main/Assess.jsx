import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/Sidebar";
import MainLayout from "../../components/MainLayout";
import { Select } from "@chakra-ui/react";

const Assess = () => {
	return (
		<MainLayout>
			<div className="flex flex-col w-full">
				<h1 className="text-5xl font-semibold mb-20">Assess</h1>
				<div className="flex w-full justify-center">
					<div className="flex flex-col w-[70%] rounded-lg shadow-lg dark:shadow-none dark:bg-[#121212] p-10 ">
						<div className="flex items-end gap-10 mb-10">
							<div className="flex flex-col items-start">
								<p className="text-xs mb-2 text-gray-400">Insert data</p>
								<Select>
									<option selected value="">
										Personal Data Sheet
									</option>
									<option value="">Exam Score</option>
									<option value="">Personality Assessment Exam Result</option>
									<option value="">PES Rating</option>
									<option value="">Assigned Projects</option>
									<option value="">Interview Results</option>
								</Select>
							</div>
							<div className="flex gap-10 items-center">
								<button className="w-[10rem] py-3 rounded-lg shadow-md">
									Upload File
								</button>
								<p>No file selected</p>
							</div>
						</div>
						<button className="bg-[#ec2224] text-white text-lg py-2 rounded-lg font-semibold hover:opacity-80 transition-opacity duration-300">
							Assess
						</button>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default Assess;
