import DarkModeButton from "./components/DarkModeButton";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Info from "./components/Info"
import About from "./components/About"
function App() {
	return (
		<div className="App dark:bg-[#1a1a1a] transition-colors duration-500 ease-in-out dark:text-white">
			<Nav />
			<Hero />
			<Info/>
			<About/>
			<Footer />
		</div>
	);
}

export default App;
