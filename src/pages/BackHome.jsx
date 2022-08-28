import React from "react";
import { Link } from "react-router-dom";

const BackHome = () => {
	return (
		<div>
			<Link to="/home" className="h-[60px] w-fit flex text-white ml-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 my-auto"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
				</svg>
				<h1 className="text-white font-bold text-lg md:text-4xl my-auto ml-2">Home</h1>
			</Link>
			<h1 className="text-white font-bold text-[40px] w-fit mx-auto">NOT FOUND !</h1>
		</div>
	);
};

export default BackHome;
