import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const Play = () => {
	const { type, id } = useParams();
	const [detail, setDetail] = useState({});
	const [trailer, setTrailer] = useState([]);

	useEffect(() => {
		fetch(
			"https://api.themoviedb.org/3/" + type + "/" + id + "?api_key=f0f9e74e5fd05626665a49734847bbbd&language=en-US"
		)
			.then((res) => res.json())
			.then((res) => setDetail(res));
	}, []);

	useEffect(() => {
		fetch(
			"https://api.themoviedb.org/3/" +
				type +
				"/" +
				id +
				"/videos?api_key=f0f9e74e5fd05626665a49734847bbbd&language=en-US"
		)
			.then((res) => res.json())
			.then((res) => setTrailer(res.results[0]?.key));
	}, []);

	console.log(trailer);
	console.log(detail);

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
				<h1 className="text-white font-bold text-[32px] my-auto ml-2">Home</h1>
			</Link>

			<h1 className="text-white text-center w-fit h-[100px] mx-auto font-bold text-2xl sm:text-4xl max-w-[80%]">
				{detail.original_title || detail.name}
			</h1>
			<div className=" w-[90%]  px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 flex items-center mx-auto ">
				<iframe
					src={"https://www.youtube.com/embed/" + trailer}
					className="w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]"
					frameborder="0"
				></iframe>
			</div>
			<div className="w-full h-fit px-12 mt-6">
				<h1 className="text-white w-full text-center text-lg">
					Release Date:
					{"  " + (detail.release_date || detail.release || detail.first_air_date)}
				</h1>
				<h1 className="text-white font-bold w-full text-center text-4xl p-3">Overview</h1>
				<h1 className="text-white text-center">{detail.overview}</h1>
			</div>
		</div>
	);
};

export default Play;
