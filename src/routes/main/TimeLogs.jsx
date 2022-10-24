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
					<header className="px-5 py-4 border-b border-gray-100 dark:border-neutral-600 transition duration-500 dark:bg-[#0d0d0d] flex justify-between items-center sticky top-0 bg-white">
						{/* <h1 className="font-semibold text-gray-800 py-3 text-xl dark:text-white transition duration-500 ">
							Time Logs */}
					<h1 className="text-5xl font-semibold py-5">Time Logs</h1>
						{/* </h1> */}
					</header>
				<Tabs>
					<TabList>
						<Tab>Time Logs</Tab>
						<Tab>Summary</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							Hakdog
						</TabPanel>
					</TabPanels>
				</Tabs>
				</div>
			</motion.div>
		</MainLayout>
	);
};

export default TimeLogs;
