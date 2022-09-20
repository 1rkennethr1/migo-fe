import Layout from "./Layout";
import { BiCurrentLocation, BiSend } from "react-icons/bi";
import { HiMail } from "react-icons/hi";
import { BsTelephoneFill } from "react-icons/bs";
import ContactUsItem from "./ContactUsItem";
import { Element } from "react-scroll";

const ContactUs = () => {
	const contact = [
		{
			title: "Location",
			detail:
				"Cebu Institute of Technology - University, N. Bacalso Ave., Cebu City, Cebu 6000",
			icon: <BiCurrentLocation className="text-4xl" />,
		},
		{
			title: "Email",
			detail: "customersupport@migo.com",
			icon: <HiMail className="text-4xl" />,
		},
		{
			title: "Call",
			detail: "+639270610480",
			icon: <BsTelephoneFill className="text-4xl" />,
		},
	];
	return (
		<Element name="contact">
			<Layout>
				<div>
					<h1 className="text-6xl text-center  border-black mb-10 flex-col flex items-center gap-4 ">
						<div className="">
							Get in <span className="font-semibold">touch</span>{" "}
						</div>
						<div className="bg-[#E04344] h-2 rounded w-[70%]"></div>
					</h1>
					<div className="flex flex-col items-start gap-3">
						{contact.map((e) => {
							return <ContactUsItem e={e} />;
						})}
					</div>
				</div>
				<div className="grid grid-cols-2 w-[100%] py-10">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.5932214864433!2d123.8802435043777!3d10.29432242878807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99c015a4bf233%3A0x95d783198f4634f8!2sCebu%20Institute%20of%20Technology%20-%20University!5e0!3m2!1sen!2sph!4v1654407394698!5m2!1sen!2sph"
						className="map border-2 rounded-md "
						width="95%"
						height="400rem"
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						data-aos="fade-up"
						data-aos-duration="800"
					></iframe>
					<form className="flex flex-col gap-2">
						<input
							placeholder="Email..."
							className="shadow-lg border-[1px] border-[#e0e0e0] p-3 pl-5  rounded-md"
							type={"text"}
						></input>
						<textarea
							placeholder="Your message..."
							className="shadow-lg p-5 border-[1px] border-[#e0e0e0] rounded-md resize-none h-[85%]"
						></textarea>
						<button
							className="bg-[#EC2224] p-3 w-24 place-self-end rounded-md shadow-lg"
							type="button"
						>
							<span className="text-white flex flex-row justify-center items-center gap-2">
								Send
								<BiSend className="text-2xl" />
							</span>
						</button>
					</form>
				</div>
			</Layout>
		</Element>
	);
};

export default ContactUs;
