const Layout = ({ children }) => {
	return (
		<div className="px-[2rem] md:px-[5rem] flex flex-col justify-center min-h-screen items-center pt-[10rem] 2xl:pt-[12rem] ">
			{children}
		</div>
	);
};

export default Layout;
