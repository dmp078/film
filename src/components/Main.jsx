import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import HeaderVideo from "./HeaderVideo";
import Slider from "./Slider";

const Main = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch(
			"https://api.themoviedb.org/3/movie/popular?api_key=f0f9e74e5fd05626665a49734847bbbd&language=en-US&page=1"
		)
			.then((res) => res.json())
			.then((res) => {
				setData(res.results);
			});
	}, []);

	if (data.length == 0) return;
	return (
		<div className="">
			<HeaderVideo data={data} />
			<Slider data={data} title={"Popular"} />
			<Slider data={data} title={"Trending"} />
		</div>
	);
};

export default Main;
