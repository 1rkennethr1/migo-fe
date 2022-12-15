import { motion } from "framer-motion";
import MainLayout from "../../components/MainLayout";
import image1 from "../../assets/dashboard/1.webp";
import image2 from "../../assets/dashboard/2.webp";
import image3 from "../../assets/dashboard/3.webp";
import image4 from "../../assets/dashboard/4.webp";
import image5 from "../../assets/dashboard/5.webp";
import { useStateContext } from "../../lib/context";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Employees",
		},
	},
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const data = {
	labels,
	datasets: [
		{
			label: "Dataset 1",
			data: [65, 59, 80, 81, 56, 55, 40],
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "rgba(255, 99, 132, 0.5)",
		},
		{
			label: "Dataset 2",
			data: [28, 48, 40, 19, 86, 27, 90],
			borderColor: "rgb(53, 162, 235)",
			backgroundColor: "rgba(53, 162, 235, 0.5)",
		},
	],
};
const Dashboard = () => {
	const { jwt } = useStateContext();

	return (
		<MainLayout>
			<div className="flex flex-col w-full">
				<div className="mb-20">
					{jwt && (
						<h1 className="text-2xl font-semibold">
							Welcome back, {jwt.name}!
						</h1>
					)}
					<h1 className="text- text-gray-400 ">
						Here are today's performance reports
					</h1>
				</div>
				<div className="flex flex-col">
					<div className="w-[30rem]">
						<Line options={options} data={data} />
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default Dashboard;
