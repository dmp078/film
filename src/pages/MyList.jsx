import { onSnapshot, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import MovieShowList from "../components/MovieShowList";
import Footer from "../components/Footer";

const MyList = () => {
	const [list, setList] = useState([]);
	const { user } = UserAuth();

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
				{list?.length == 0 && <h1 className="text-[40px] text-center font-bold w-full text-white">Nothing !</h1>}
				<div className="grid grid-cols-1 px-8 md:px-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8 ">
					{list?.map((movie, id) => (
						<MovieShowList key={id} movie={movie} list={list} />
					))}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default MyList;
