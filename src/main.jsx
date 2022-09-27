import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import StateContext from "./lib/context";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StateContext>
			<ChakraProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ChakraProvider>
		</StateContext>
	</React.StrictMode>
);
