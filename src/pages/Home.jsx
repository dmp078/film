import React from "react";
import Main from "../components/Main";
import Navbar from "../components/Navbar";

const Home = () => {
	return (
		<div className="bg-[#141414] w-full h-full overflow-hidden">
			<Navbar />
			<Main />
		</div>
	);
};

export default Home;
