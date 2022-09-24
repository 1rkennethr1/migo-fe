import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import StateContext from "./lib/context";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StateContext>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StateContext>
	</React.StrictMode>
);
