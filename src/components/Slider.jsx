import React, { useRef, useState } from "react";
import { UserAuth } from "../AuthContext";
import { useEffect } from "react";
import Movie from "./Movie";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./components.scss";

const Slider = ({ data, title, paramURL, type }) => {
	const refGrid = useRef(null);
	const page = useRef(1);

	const [shows, setShows] = useState([]);

	const { windowSize, user } = UserAuth();
	const [pageMax, setPageMax] = useState(1);

	useEffect(() => {
		if (windowSize.innerWidth >= 1536) {
			setPageMax(4);
			return;
		}
		if (windowSize.innerWidth >= 1024) {
			setPageMax(5);
			return;
		}
		if (windowSize.innerWidth >= 768) {
			setPageMax(7);
			return;
		}

		setPageMax(10);
	}, [windowSize.innerWidth]);

	const handleArrowLeft = () => {
		refGrid.current.style.transform = "translate(0,-" + 22.5 * (page.current - 2) + "vh)";
		page.current--;
		if (page.current <= 1) page.current = 1;
	};

	const handleArrowRight = () => {
		page.current++;
		if (page.current >= pageMax) page.current = pageMax;
		refGrid.current.style.transform = "translate(0,-" + 22.5 * (page.current - 1) + "vh)";
	};

	useEffect(() => {
		onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
			setShows(doc.data()?.shows);
		});
	}, [user?.email]);

	return (
		<>
			<div className="w-fit">
				<Link to={"/home/" + paramURL}>
					<div className="flex">
						<h1 className="text-white font-bold text-[16px] md:text-2xl ml-8 py-4 cursor-pointer w-fit pr-2">{title}</h1>
						<div className="flex text-blue-400 text-[12px] mt-1 md:text-xl">
							<h1 className="my-auto cursor-pointer w-fit">Explore All</h1>
							<i className="fa-solid fa-arrow-right mx-2 my-auto"></i>
						</div>
					</div>
				</Link>
			</div>

			{/* Slider */}
			<div className={`h-[22.5vh] w-full flex overflow-hidden`}>
				{/* arrow-left */}
				<div onClick={handleArrowLeft} className={`arrow-left w-8 h-[22.5vh] flex bg-transparent cursor-pointer`}>
					<i className="fa-solid fa-arrow-left w-10 h-10 m-auto px-2 text-white"></i>
				</div>
				{/**/}

				<div ref={refGrid} className={`grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-4`}>
					{data?.map((movie, id) => (
						<Movie key={id} movie={movie} type={type} list={shows} />
					))}
				</div>

				{/* arrow-right */}
				<div onClick={handleArrowRight} className={`arrow-right w-8 h-[22.5vh] flex bg-transparent cursor-pointer`}>
					<i className="fa-solid fa-arrow-right w-10 h-10 m-auto px-2 text-white"></i>
				</div>
			</div>
		</>
	);
};

export default Slider;
