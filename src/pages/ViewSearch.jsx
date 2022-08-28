import { onSnapshot, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import Movie from "../components/Movie";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { UserAuth } from "../AuthContext";

const ViewSearch = () => {
	const [list, setList] = useState([]);
	const { query } = useParams();
	const [data, setData] = useState([]);
	const { user } = UserAuth();

	useEffect(() => {
		fetch(
			"https://api.themoviedb.org/3/search/multi?api_key=f0f9e74e5fd05626665a49734847bbbd&language=en-US&query=" +
				query +
				"&page=1&include_adult=false&region=us"
		)
			.then((res) => res.json())
			.then((res) => {
				setData(res.results);
			});
	}, []);

	useEffect(() => {
		onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
			setList(doc.data()?.shows);
		});
	}, [user.email]);

	return (
		<>
			<div className="min-h-screen">
				<Navbar />
				<div className="w-full h-[75px]"></div>
				<h1 className="text-center text-white font-bold text-2xl md:text-4xl">Search for: {query}</h1>
				<div className="">
					<div className="grid grid-cols-1 px-8 md:px-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
						{data?.map(
							(movie, id) =>
								movie?.media_type != "person" &&
								(movie?.backdrop_path || movie?.poster_path) && <Movie key={id} movie={movie} list={list} />
						)}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ViewSearch;
