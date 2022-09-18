const Layout = ({ children }) => {
	return (
		<div className="px-[2rem] md:px-[5rem] flex flex-col justify-center min-h-screen items-center py-[10rem] 2xl:py-[12rem] ">
			{children}
		</div>
	);
};

export default Layout;
