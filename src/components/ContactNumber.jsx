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
export default function ContactNumber({
	handleChange,
	val,
	isPhoneValid,
	label,
	addname,
	w,
}) {
	return (
		<FormControl width={w}>
			<FormLabel>{label}</FormLabel>
			<InputGroup>
				<InputLeftAddon children="+63" />
				<Input
					focusBorderColor={
						isPhoneValid === null
							? ""
							: isPhoneValid === true || isPhoneValid === false
							? isPhoneValid
								? "green.300"
								: "red.300"
							: ""
					}
					isInvalid={isPhoneValid === null ? false : true}
					errorBorderColor={
						isPhoneValid === null
							? ""
							: isPhoneValid === true || isPhoneValid === false
							? isPhoneValid === true
								? "green.300"
								: "red.300"
							: ""
					}
					onChange={handleChange}
					className="border px-3 py-2 rounded-lg w-full"
					name={addname}
					id=""
					maxLength={10}
					value={val}
					type="number"
					placeholder="9341563456"
				/>
				<InputRightElement
					children={
						isPhoneValid === null ? (
							""
						) : isPhoneValid === true || isPhoneValid === false ? (
							isPhoneValid ? (
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
			{isPhoneValid === null ? (
				""
			) : isPhoneValid === true || isPhoneValid === false ? (
				isPhoneValid ? (
					""
				) : val[0] === "9" ? (
					<p className="text-red-500 text-xs pt-3">Invalid phone number!</p>
				) : (
					<p className="text-red-500 text-xs pt-3">
						Invalid phone number! (should start with 9)
					</p>
				)
			) : (
				""
			)}
		</FormControl>
	);
}
