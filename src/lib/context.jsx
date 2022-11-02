import { createContext, useContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

const MigoContext = createContext();

export default function StateContext({ children }) {
	const [minimized, setMinimized] = useState(false);
	const [employees, setEmployees] = useState([]);
	const [status, setStatus] = useState("active");
	const [timelogs, setTimeLogs] = useState([]);
	const [isFetchingTimeLogs, setIsFetchingTimeLogs] = useState(true);
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || {
			username: "",
			password: "",
		}
	);

	const [isFetchingEmployees, setIsFetchingEmployees] = useState(true);
	const [jwt, setJwt] = useState(localStorage.getItem("jwt") || "");
	const [searchValue, setSearchValue] = useState("");
	console.log(searchValue);
	const searchHandler = (e) => {
		const { value } = e.target;
		setSearchValue(value);
	};
	const getEmployees = async () => {
		const res = await fetch("https://localhost:7241/Employee");
		const data = await res.json();
		status === "active"
			? setEmployees(data.filter((e) => e.status === true))
			: status === "all"
			? setEmployees(data)
			: setEmployees(data.filter((e) => e.status === false));
	};

	const getTimeLogs = async () => {
		const res = await fetch("https://localhost:7241/api/EmployeeTimeLog");
		const data = await res.json();
		setTimeLogs(data);
	};

	useEffect(() => {
		searchEmployees();
		setIsFetchingEmployees(false);
		getTimeLogs();
		setIsFetchingTimeLogs(false);
	}, [searchValue]);
	const searchEmployees = async () => {
		const res = await fetch("https://localhost:7241/Employee");
		const data = await res.json();
		const sorted =
			status === "active"
				? data.filter(
						(e) =>
							(e.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
								e.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
								e.middleName
									.toLowerCase()
									.includes(searchValue.toLowerCase()) ||
								(e.positionApplied &&
									e.positionApplied
										.toLowerCase()
										.includes(searchValue.toLowerCase()))) &&
							e.status === true
				  )
				: status === "inactive"
				? data.filter(
						(e) =>
							(e.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
								e.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
								e.middleName
									.toLowerCase()
									.includes(searchValue.toLowerCase()) ||
								(e.positionApplied &&
									e.positionApplied
										.toLowerCase()
										.includes(searchValue.toLowerCase()))) &&
							e.status === false
				  )
				: data
						.filter(
							(e) =>
								e.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
								e.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
								e.middleName
									.toLowerCase()
									.includes(searchValue.toLowerCase()) ||
								(e.positionApplied &&
									e.positionApplied
										.toLowerCase()
										.includes(searchValue.toLowerCase()))
						)
						.sort((a, b) => Number(b.status) - Number(a.status));
		setEmployees(sorted);
	};

	return (
		<MigoContext.Provider
			value={{
				searchEmployees,
				searchValue,
				setSearchValue,
				searchHandler,
				status,
				setStatus,
				user,
				setUser,
				minimized,
				setMinimized,
				employees,
				isFetchingEmployees,
				setEmployees,
				getEmployees,
				timelogs,
				isFetchingTimeLogs,
				getTimeLogs,
				jwt,
				setJwt,
			}}
		>
			{children}
		</MigoContext.Provider>
	);
}

export const useStateContext = () => useContext(MigoContext);
