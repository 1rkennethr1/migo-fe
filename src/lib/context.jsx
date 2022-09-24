import { createContext, useContext, useEffect, useState } from "react";

const MigoContext = createContext();

export default function StateContext({ children }) {
	const [minimized, setMinimized] = useState(false);
	return (
		<MigoContext.Provider
			value={{
				minimized,
				setMinimized,
			}}
		>
			{children}
		</MigoContext.Provider>
	);
}

export const useStateContext = () => useContext(MigoContext);
