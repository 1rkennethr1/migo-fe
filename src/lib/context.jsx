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
	//employees
	const [employees, setEmployees] = useState([]);
	const [activeEmployees, setActiveEmployees] = useState([]);
	const [allEmployees, setAllEmployees] = useState([]);

	const [benefits, setBenefits] = useState([]);
	const [trainings, setTrainings] = useState([]);
	const [projects, setProjects] = useState([]);
	const [timeLogs, setTimeLogs] = useState([]);

	//fetch loader
	// const [isFetchingAllEmployees, setIsFetchingAllEmployees] = useState(true);
	const [isFetchingEmployees, setIsFetchingEmployees] = useState(true);
	const [isFetchingTimeLogs, setIsFetchingTimeLogs] = useState(true);
	const [isFetchingProjects, setIsFetchingProjects] = useState(true);

	//JSON Web Token for Login
	const [jwt, setJwt] = useState(JSON.parse(localStorage.getItem("jwt")) || "");

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
	const getBenefits = async () => {
		const res = await fetch("https://localhost:7241/api/Benefits");
		const data = await res.json();
		setBenefits(data);
	};
	const getTrainings = async () => {
		const res = await fetch("https://localhost:7241/api/Trainings");
		const data = await res.json();
		setTrainings(data);
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
		getBenefits();
		setIsFetchingEmployees(false);
		getTimeLogs();
		setIsFetchingTimeLogs(false);
		getProjects();
		setIsFetchingProjects(false);
	}, [searchValue]);

	// Use the useEffect hook to check if the JWT has expired
	useEffect(() => {
		// Check if the JWT is set and has not expired
		if (jwt && jwt.exp * 1000 > Date.now()) {
			// The JWT is valid, do nothing
			return;
		}

		// The JWT has expired or is not set, clear it from the state
		setJwt(null);
		localStorage.removeItem("jwt");
	}, [jwt]);
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
				benefits,
				getBenefits,
				timeLogs,
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
