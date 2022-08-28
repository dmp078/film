import { onSnapshot, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import Movie from "../components/Movie";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

const ExploreAll = () => {
	const [list, setList] = useState([]);
	const { user } = UserAuth();
	const [data, setData] = useState([]);
	const { name, type } = useParams();

	useEffect(() => {
		fetch(
			"https://api.themoviedb.org/3/" +
				type +
				"/" +
				name +
				"?api_key=f0f9e74e5fd05626665a49734847bbbd&language=en-US&page=1"
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
				<h1 className="text-[40px] text-center font-bold w-full text-white">{name.toUpperCase()}</h1>
				<div className="grid grid-cols-1 md:px-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 px-8">
					{data?.map((movie, id) => (
						<Movie key={id} movie={movie} type={type} list={list} />
					))}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ExploreAll;
