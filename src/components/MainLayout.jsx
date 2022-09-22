import { motion } from "framer-motion";

export default function MainLayout({ children }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="basis-[-320px]"
		>
			{children}
		</motion.div>
	);
}
