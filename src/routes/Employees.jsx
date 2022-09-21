import { AnimatePresence, motion } from "framer-motion";
import {
	CircularProgress,
	Container,
	Flex,
	IconButton,
	useDisclosure,
	Box,
} from "@chakra-ui/react";
const Employees = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0 }}
				transition={{
					duration: 0.3,
					type: "spring",
					damping: 20,
					stiffness: 100,
				}}
			>
				<Box pos={"fixed"}></Box>
				<Flex height={"100%"} width={"60vw"} m={"10rem"} direction={"column"}>
					<Box height={"50vh"} overflowY={"scroll"}></Box>
				</Flex>
			</motion.div>
		</motion.div>
	);
};

export default Employees;
