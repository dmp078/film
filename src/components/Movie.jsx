import React from "react";
import { db } from "../firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { UserAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./components.scss";
import { useRef } from "react";

const Movie = ({ movie, list, type }) => {
	const { user } = UserAuth();
	const refOverlay = useRef(null);
	const inList = () => {
		let res = false;
		list?.forEach((e) => {
			if (e.id == movie.id) res = true;
		});
		return res;
	};

	const navigate = useNavigate();
	let isActive = inList();

	const handleSubcribe = async () => {
		if (user?.email) {
			let flag = inList();
			if (!flag) {
				await updateDoc(doc(db, "users", user?.email), {
					shows: arrayUnion({
						id: movie?.id,
						title: movie?.title || movie?.name,
						img: movie?.backdrop_path || movie?.poster_path,
						type: type || movie?.media_type,
					}),
				});
			} else {
				let res = [];
				list?.forEach((e) => {
					if (e.id != movie.id) res = [...res, e];
				});
				updateDoc(doc(db, "users", user?.email), {
					shows: res,
				});
			}
		} else {
			console.log("error");
		}
	};

	const handlePlay = () => {
		navigate("/play/" + (movie?.media_type || type) + "/" + movie.id);
	};

	return (
		<div
			onMouseEnter={() => {
				refOverlay.current.style.display = "block";
			}}
			onMouseLeave={() => {
				refOverlay.current.style.display = "none";
			}}
			className="w-full h-[22.5vh] relative"
		>
			<img
				className={`w-full h-[22.5vh] object-cover object-center rounded-xl`}
				src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}`}
				alt={movie?.title || movie?.name}
			/>
			<div
				ref={refOverlay}
				style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
				className="overlay-movie absolute inset-0 text-white hidden hover:block"
			>
				<i
					onClick={handleSubcribe}
					className={`${
						isActive ? "fa-solid fa-heart" : "fa-regular fa-heart"
					} absolute top-0 text-[30px] mt-2 ml-2 cursor-pointer`}
				/>
				<i
					onClick={handlePlay}
					className={`fa-solid fa-circle-play absolute cursor-pointer inset-0 m-auto text-[30px] w-8 h-8`}
				/>
			</div>
		</div>
	);
};

export default Movie;
