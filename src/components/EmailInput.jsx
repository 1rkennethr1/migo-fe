import {
	FormControl,
	FormLabel,
	InputGroup,
	InputLeftAddon,
	Input,
	InputRightElement,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { BsCheck } from "react-icons/bs";

export default function EmailInput({ isEmailValid, handleChange, value }) {
	return (
		<FormControl>
			<FormLabel>Email Address</FormLabel>

			<InputGroup>
				<Input
					value={value}
					focusBorderColor={
						isEmailValid === null
							? ""
							: isEmailValid === true || isEmailValid === false
							? isEmailValid
								? "green.300"
								: "red.300"
							: ""
					}
					isInvalid={isEmailValid === null ? false : true}
					errorBorderColor={
						isEmailValid === null
							? ""
							: isEmailValid === true || isEmailValid === false
							? isEmailValid
								? "green.300"
								: "red.300"
							: ""
					}
					onChange={handleChange}
					className="border px-3 py-2 rounded-lg w-full"
					type="email"
					name="email"
					id=""
					placeholder="john.doe@gmail.com"
				/>
				<InputRightElement
					children={
						isEmailValid === null ? (
							""
						) : isEmailValid === true || isEmailValid === false ? (
							isEmailValid ? (
								<div className="text-2xl text-green-500">
									<BsCheck />
								</div>
							) : (
								<div className="text-2xl text-red-500">
									<MdClose />
								</div>
							)
						) : (
							""
						)
					}
				/>
			</InputGroup>
			{isEmailValid === null ? (
				""
			) : isEmailValid === true || isEmailValid === false ? (
				isEmailValid ? (
					""
				) : (
					<p className="text-red-500 text-xs pt-3">Invalid E-mail</p>
				)
			) : (
				""
			)}
		</FormControl>
	);
}
