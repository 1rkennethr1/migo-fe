import DarkModeButton from "./components/DarkModeButton";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";

function App() {
	return (
		<div className="App dark:bg-[#1a1a1a] transition-colors duration-500 ease-in-out dark:text-white">
			<Nav />
			<Hero />

			<Footer />
		</div>
	);
}

export default App;
