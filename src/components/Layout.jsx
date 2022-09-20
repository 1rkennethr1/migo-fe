import { motion } from "framer-motion";
const Layout = ({ children, refz, animate }) => {
	return (
		<motion.div className="px-[2rem] md:px-[5rem] flex flex-col justify-center min-h-screen items-center pt-[10rem] 2xl:pt-[12rem] ">
			{children}
		</motion.div>
	);
};

export default Layout;
