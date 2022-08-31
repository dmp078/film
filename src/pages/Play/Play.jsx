import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserAuth } from "../../AuthContext";

const Play = () => {
	const { type, id } = useParams();
	const [detail, setDetail] = useState({});
	const [trailer, setTrailer] = useState([]);

	const { windowSize } = UserAuth();

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
				<i className="fa-solid fa-arrow-left my-auto"></i>
				<h1 className="font-bold text-[24px] my-auto ml-2">Home</h1>
			</Link>

			<h1 className="text-white text-center w-fit mb-4 mx-auto font-bold text-2xl sm:text-4xl max-w-[80%]">
				{detail.original_title || detail.name}
			</h1>

			<div className={`relative w-[90vw] min-h-[60vh] md:min-h-[95vh] mx-auto`}>
				<iframe
					src={"https://www.youtube.com/embed/" + trailer}
					className={`w-full min-h-[60vh] md:min-h-[95vh] object-cover object-center`}
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
