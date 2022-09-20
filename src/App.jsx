import DarkModeButton from "./components/DarkModeButton";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Info from "./components/Info";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
function App() {
	return (
		<div className="App dark:bg-[#1a1a1a] transition-colors duration-500 ease-in-out dark:text-white overflow-x-hidden">
			<Nav />
			<Hero />
			<Info />
			<About />
			<ContactUs/>
			<Footer />
		</div>
	);
}

export default App;
