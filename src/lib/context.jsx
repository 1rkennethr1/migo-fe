import { createContext, useContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

const MigoContext = createContext();

export default function StateContext({ children }) {
	//sidebar minimize
	const [minimized, setMinimized] = useState(false);

	//employee status sort
	const [status, setStatus] = useState("active");

	//employee search value
	const [searchValue, setSearchValue] = useState("");

	//data
	const [employees, setEmployees] = useState([]);
	const [activeEmployees, setActiveEmployees] = useState([]);
	const [allEmployees, setAllEmployees] = useState([]);
	const [projects, setProjects] = useState([]);
	const [timelogs, setTimeLogs] = useState([]);

	//fetch loader
	// const [isFetchingAllEmployees, setIsFetchingAllEmployees] = useState(true);
	const [isFetchingEmployees, setIsFetchingEmployees] = useState(true);
	const [isFetchingTimeLogs, setIsFetchingTimeLogs] = useState(true);
	const [isFetchingProjects, setIsFetchingProjects] = useState(true);

	//login state
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || {
			username: "",
			password: "",
		}
	);

	//JSON Web Token for Login
	const [jwt, setJwt] = useState(localStorage.getItem("jwt") || "");

	const searchHandler = (e) => {
		const { value } = e.target;
		setSearchValue(value);
	};

	//GET
	const getEmployees = async () => {
		const res = await fetch("https://localhost:7241/Employee");
		const data = await res.json();
		setAllEmployees(data);
		setActiveEmployees(
			data.filter((e) => {
				if (e.status) return e;
			})
		);
		status === "active"
			? setEmployees(data.filter((e) => e.status === true))
			: status === "all"
			? setEmployees(data)
			: setEmployees(data.filter((e) => e.status === false));
	};
	const getProjects = async () => {
		const res = await fetch("https://localhost:7241/Project");
		const data = await res.json();
		setProjects(data);
	};
	const getTimeLogs = async () => {
		const res = await fetch("https://localhost:7241/api/EmployeeTimeLog");
		const data = await res.json();
		setTimeLogs(data);
	};
	//---------------------------------------------------//
	useEffect(() => {
		searchEmployees();
		getEmployees();
		// setIsFetchingAllEmployees(false);
		// getAllEmployees();
		setIsFetchingEmployees(false);
		getTimeLogs();
		setIsFetchingTimeLogs(false);
		getProjects();
		setIsFetchingProjects(false);
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
				getProjects,
				projects,
				status,
				setStatus,
				user,
				setUser,
				minimized,
				setMinimized,
				activeEmployees,
				employees,
				allEmployees,
				// isFetchingAllEmployees,
				setAllEmployees,
				// getAllEmployees,
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
