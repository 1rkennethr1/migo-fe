import { createContext, useContext, useEffect, useState } from "react";

const MigoContext = createContext();

export default function StateContext({ children }) {
	const [minimized, setMinimized] = useState(false);
	const [employees, setEmployees] = useState({});
	const [isFetchingEmployees, setIsFetchingEmployees] = useState(true);
	const getEmployees = async () => {
		const res = await fetch("https://localhost:7241/Employee");
		const data = await res.json();
		setEmployees(data);
	};
	useEffect(() => {
		getEmployees();
		setTimeout(() => {
			setIsFetchingEmployees(false);
		}, 1500);
	}, []);

	return (
		<MigoContext.Provider
			value={{
				minimized,
				setMinimized,
				employees,
				isFetchingEmployees,
				getEmployees,
			}}
		>
			{children}
		</MigoContext.Provider>
	);
}

export const useStateContext = () => useContext(MigoContext);
