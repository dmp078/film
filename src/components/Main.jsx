import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import HeaderVideo from "./HeaderVideo";
import Slider from "./Slider";

const Main = () => {
	const [dataPopular, setDataPopular] = useState([]);
	const [dataUpcoming, setDataUpcoming] = useState([]);
	const [dataTVonTheAir, setDataTVonTheAir] = useState([]);
	const [dataTVairingToday, setDataTVairingToday] = useState([]);
	const [dataTVtopRated, setDataTVtopRated] = useState([]);

	const paramPopular = "movie/popular";
	const paramUpcoming = "movie/upcoming";
	const paramTVonTheAir = "tv/on_the_air";
	const paramTVairingToday = "tv/airing_today";
	const paramTVtopRated = "tv/top_rated";

	useEffect(() => {
		fetch("https://api.themoviedb.org/3/movie/popular?api_key=f0f9e74e5fd05626665a49734847bbbd&language=en-US&page=1")
			.then((res) => res.json())
			.then((res) => {
				setDataPopular(res?.results);
			});
	}, []);

	useEffect(() => {
		fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=f0f9e74e5fd05626665a49734847bbbd&language=en-US&page=1")
			.then((res) => res.json())
			.then((res) => {
				setDataUpcoming(res?.results);
			});
	}, []);

	useEffect(() => {
		fetch("https://api.themoviedb.org/3/tv/on_the_air?api_key=f0f9e74e5fd05626665a49734847bbbd&language=en-US&page=1")
			.then((res) => res.json())
			.then((res) => {
				setDataTVonTheAir(res?.results);
			});
	}, []);

	useEffect(() => {
		fetch("https://api.themoviedb.org/3/tv/airing_today?api_key=f0f9e74e5fd05626665a49734847bbbd&language=en-US&page=1")
			.then((res) => res.json())
			.then((res) => {
				setDataTVairingToday(res?.results);
			});
	}, []);

	useEffect(() => {
		fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=f0f9e74e5fd05626665a49734847bbbd&language=en-US&page=1")
			.then((res) => res.json())
			.then((res) => {
				setDataTVtopRated(res?.results);
			});
	}, []);

	return (
		<div className="">
			<HeaderVideo data={dataUpcoming} type={"movie"} />
			<div className="w-full h-[75px] md:hidden"></div>
			<Slider data={dataPopular} title={"Popular"} paramURL={paramPopular} type={"movie"} />
			<Slider data={dataUpcoming} title={"Up Coming"} paramURL={paramUpcoming} type={"movie"} />
			<Slider data={dataTVonTheAir} title={"TV On The Air"} paramURL={paramTVonTheAir} type={"tv"} />
			<Slider data={dataTVairingToday} title={"TV Airing Today"} paramURL={paramTVairingToday} type={"tv"} />
			<Slider data={dataTVtopRated} title={"TV Top Rated"} paramURL={paramTVtopRated} type={"tv"} />
		</div>
	);
};

export default Main;
