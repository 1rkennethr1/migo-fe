import { FaFacebookF, FaYoutube, FaTwitter, FaGithub } from "react-icons/fa";
import { alliance } from "../../utils/links";

const socials = [
	{
		name: "Facebook",
		icon: <FaFacebookF />,
	},
	{
		name: "Youtube",
		icon: <FaYoutube />,
	},
	{
		name: "Twitter",
		icon: <FaTwitter />,
	},
	{
		name: "GitHub",
		icon: <FaGithub />,
	},
];
const Footer = () => {
	return (
		<div className="bg-[#212121] text-white">
			<div className="flex  justify-start gap-10 py-[3rem] px-[5rem]">
				<div className="flex flex-col gap-5 w-[40rem] ">
					<h2 className="text-3xl font-semibold">Migo</h2>
					<p className="">
						A simple but powerful human resource management tool designed for assessing employees.
						From employee performance tracking to predicting employee potential, this software is
						designed to make HR work more easier.
					</p>
					<div className="flex gap-3">
						{socials.map((e) => {
							return (
								<a
									className="text-xl hover:bg-[#ec2224] transition-all duration-500 ease-in-out cursor-pointer p-3 border rounded-full  "
									key={e.name}
								>
									{e.icon}
								</a>
							);
						})}
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<h2 className="text-3xl font-semibold">Alliance</h2>
					<div className="flex flex-col gap-1">
						{alliance.map((e) => {
							return <a key={e.name} href="">{e.name}</a>;
						})}
					</div>
				</div>
			</div>
			<p className="flex justify-center pb-5">© 2022 Migo. All Rights Reserved</p>
		</div>
	);
};

export default Footer;
