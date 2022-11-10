import { motion } from "framer-motion";

export default function MainLayout({ children }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				type: "spring",
				duration: 0.1,
				damping: 10,
				stiffness: 100,
			}}
			className="p-10 min-h-screen   flex w-screen "
		>
			{children}
		</motion.div>
	);
}
