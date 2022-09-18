const Footer = () => {
	return (
		<div className="bg-[#212121]">
			<div className="flex gap-5 justify-center">
				<div className="flex flex-col">
					<h2>Migo</h2>
					<p>
						Migo is a simple but powerful human resource management tool designed for assessing
						employees. From employee performance tracking to predicting employee potential, this
						software is designed to make HR work more easier.
					</p>
					<div className="flex">
						{/* {socials.map((e) => {
							return (
								<div className="" key={e.name}>
									{e.icon}
								</div>
							);
						})} */}
					</div>
				</div>
				<div className="flex flex-col">
					<h2>Alliance</h2>
				</div>
			</div>
		</div>
	);
};

export default Footer;
