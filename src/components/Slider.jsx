import React, { useRef, useState } from "react";
import "./Slider.scss";
import { UserAuth } from "../AuthContext";
import { useEffect } from "react";
import Movie from "./Movie";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

const Slider = ({ data, title, paramURL, type }) => {
	const refGrid = useRef(null);
	const page = useRef(1);

	const [shows, setShows] = useState([]);

	const { windowSize, user } = UserAuth();
	const [pageMax, setPageMax] = useState(1);

	const height = 25;

	useEffect(() => {
		if (windowSize.innerWidth >= 1024) {
			setPageMax(4);
			return;
		}
		if (windowSize.innerWidth >= 768) {
			setPageMax(5);
			return;
		}
		if (windowSize.innerWidth >= 640) {
			setPageMax(7);
			return;
		}
		setPageMax(10);
	}, [windowSize.innerWidth]);

	const handleArrowLeft = () => {
		refGrid.current.style.transform = "translate(0,-" + height * (page.current - 2) + "vh)";
		page.current--;
		if (page.current <= 1) page.current = 1;
	};

	const handleArrowRight = () => {
		page.current++;
		if (page.current >= pageMax) page.current = pageMax;
		refGrid.current.style.transform = "translate(0,-" + height * (page.current - 1) + "vh)";
	};

	useEffect(() => {
		onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
			setShows(doc.data()?.shows);
		});
	}, [user?.email]);

	return (
		<div className="overflow-hidden">
			<div className="w-fit">
				<Link to={"/home/" + paramURL}>
					<div className="flex">
						<h1 className="text-white font-bold text-2xl md:text-4xl px-8 py-4 cursor-pointer w-fit pr-2">{title}</h1>
						<div className="flex text-blue-400 text-lg md:text-xl">
							<h1 className="my-auto cursor-pointer w-fit">Explore All</h1>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 my-auto mx-1"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
							</svg>
						</div>
					</div>
				</Link>
			</div>

			{/* Slider */}
			<div className={"h-[" + height + "vh] w-screen"}>
				{/* arrow-left */}
				<div
					onClick={handleArrowLeft}
					className={
						"arrow-left w-8 h-[" + height + "vh] flex w-full absolute left-0 bg-transparent cursor-pointer z-10"
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 text-white m-auto"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
					</svg>
				</div>
				{/* arrow-left */}

				<div className={"h-[" + height + "vh] w-full px-8 absolute overflow-hidden"}>
					<div ref={refGrid} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-4">
						{data?.map((movie, id) => (
							<Movie key={id} movie={movie} type={type} list={shows} />
						))}
					</div>
				</div>

				{/* arrow-right */}
				<div
					onClick={handleArrowRight}
					className={
						"arrow-left w-8 h-[" + height + "vh] w-full flex absolute right-0 bg-transparent cursor-pointer z-[10]"
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 text-white m-auto"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
					</svg>
				</div>
				{/* arrow-right */}
			</div>
			{/* slider */}
		</div>
	);
};

export default Slider;
