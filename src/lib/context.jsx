import { createContext, useContext, useEffect, useState } from "react";

const MigoContext = createContext();

export default function StateContext({ children }) {
	const [minimized, setMinimized] = useState(false);
	const [employees, setEmployees] = useState([]);
	const [status, setStatus] = useState("active");
	const [timelogs, setTimeLogs] = useState([]);
	const [isFetchingTimeLogs, setIsFetchingTimeLogs] = useState(true);

	const [user, setUser] = useState({ username: "", password: "" });
	const [isFetchingEmployees, setIsFetchingEmployees] = useState(true);
	const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
	const [searchValue, setSearchValue] = useState("");

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
	}, [searchValue]);
	useEffect(() => {
		getEmployees();
		setIsFetchingEmployees(false);
		getTimeLogs();
		setIsFetchingTimeLogs(false);
	}, []);
	const match = (string, test) => {
		let pattern = new RegExp(`^${string}`, "i");
		return pattern.test(test);
	};
	const searchEmployees = async () => {
		const res = await fetch("https://localhost:7241/Employee");
		const data = await res.json();
		const sorted =
			status === "active"
				? data.filter(
						(e) =>
							(match(searchValue, e.firstName) ||
								match(searchValue, e.lastName) ||
								match(searchValue, e.middleName) ||
								match(searchValue, e.positionApplied)) &&
							e.status === true
				  )
				: status === "inactive"
				? data.filter(
						(e) =>
							(match(searchValue, e.firstName) ||
								match(searchValue, e.lastName) ||
								match(searchValue, e.middleName) ||
								match(searchValue, e.positionApplied)) &&
							e.status === false
				  )
				: data.filter(
						(e) =>
							match(searchValue, e.firstName) ||
							match(searchValue, e.lastName) ||
							match(searchValue, e.middleName) ||
							match(searchValue, e.positionApplied)
				  );
		setEmployees(sorted);
	};

	return (
		<MigoContext.Provider
			value={{
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
