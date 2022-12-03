import React from "react";
import { CircularProgress } from "@chakra-ui/react";
import { motion } from "framer-motion";
import MainLayout from "../../components/MainLayout";
import { useStateContext } from "../../lib/context";
import { 
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
 } from "@chakra-ui/react";
import { BsPeopleFill } from "react-icons/bs";

const TimeLogs = () => {
	const { minimized, timeLogs, isFetchingTimeLogs } = useStateContext();

	if (isFetchingTimeLogs) {
		return (
			<MainLayout>
				<div className="flex justify-center items-center w-full">
					<CircularProgress isIndeterminate color="red" />
				</div>
			</MainLayout>
		);
	}
	return (
		<MainLayout className="flex">
			<motion.div
				className="flex justify-start w-full"
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
				<div className="w-[100vh]">
					<h1 className="text-5xl font-semibold py-5">Time Logs</h1>
						<div className="flex flex-row gap-3 h-[25%] w-[100%] rounded-lg shadow-lg dark:shadow-none dark:bg-[#1a1a1a] p-5 mb-10 mt-5">
							<div className="flex flex-row gap-3 bg-[#FF9D2B] w-[80%] p-8 rounded-lg items-center justify-start">
								<div>
									<BsPeopleFill size={70} color="white" />
								</div>
								<div className="flex flex-col justify-center items-start">
									<div className="text-lg font-bold text-white">
										Total Absents
									</div>
									<div className="text-3xl font-bold text-white">
										{timeLogs.length}
									</div>
								</div>
							</div>
							<div className="flex flex-row gap-3 bg-[#8AC0B3] w-[80%] p-8 rounded-lg items-center justify-start">
								<div>
									<BsPeopleFill size={70} color="white" />
								</div>
								<div className="flex flex-col justify-center items-start">
									<div className="text-lg font-bold text-white">
										Total Number of Lates
									</div>
									<div className="text-3xl  font-bold text-white">
										{timeLogs.length}
									</div>
								</div>
							</div>
					</div>

				</div>
			</motion.div>
		</MainLayout>
	);
};

export default TimeLogs;
