import React from "react";

export default function AboutItem({ e }) {
	return (
		<div className="bg-[#E04344] text-white items-center justify-start px-10 text-center py-10 h-full gap-5 rounded-lg shadow-lg flex flex-col">
			<span className="justify-self-center text-3xl bg-white text-[#a0a0a0] p-3 rounded-full">
				{e.icon}
			</span>
			<h5 className="font-bold text-xl">{e.name}</h5>
			<p className=" text-lg">{e.details}</p>
		</div>
	);
}
