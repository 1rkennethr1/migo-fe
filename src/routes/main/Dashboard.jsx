import { motion } from "framer-motion";
import MainLayout from "../../components/MainLayout";
import image1 from "../../assets/dashboard/1.webp";
import image2 from "../../assets/dashboard/2.webp";
import image3 from "../../assets/dashboard/3.webp";
import image4 from "../../assets/dashboard/4.webp";
import image5 from "../../assets/dashboard/5.webp";
const Dashboard = () => {
	return (
		<MainLayout>
			<div className="flex flex-col w-full">
				<h1 className="text-5xl font-semibold mb-20">
					Alliance Inc. Dashboard
				</h1>
				<div className="flex flex-col">
					<motion.div
						initial={{ y: 40, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="flex gap-5 justify-center mb-16"
					>
						<img src={image1} width={500} alt="" />
						<img src={image2} width={500} alt="" />
					</motion.div>
					<motion.div
						initial={{ y: 40, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="flex justify-center mb-10"
					>
						<motion.img src={image3} width={"100%"} className="" />
					</motion.div>
					<motion.div className="flex gap-5 justify-between mb-16">
						<img src={image4} width={500} alt="" />
						<img src={image5} width={500} alt="" />
					</motion.div>
				</div>
			</div>
		</MainLayout>
	);
};

export default Dashboard;
