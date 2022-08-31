import React from "react";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { UserAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const MovieShowList = ({ list, movie }) => {
	const { user } = UserAuth();
	const refOverlay = useRef(null);
	const handleSubcribe = async () => {
		if (`${user?.email}`) {
			let res = [];
			list.forEach((e) => {
				if (e.id != movie.id) res = [...res, e];
			});
			updateDoc(doc(db, "users", user?.email), {
				shows: res,
			});
		} else {
			console.log("error");
		}
	};
	const navigate = useNavigate();

	const handlePlay = () => {
		navigate("/play/" + movie.type + "/" + movie.id);
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
				className="w-full h-[22.5vh] object-cover object-center rounded-xl"
				src={`https://image.tmdb.org/t/p/original/${movie?.img}`}
				alt={movie?.title}
			/>
			<div
				ref={refOverlay}
				style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
				className="overlay-movie absolute inset-0 text-white hidden"
			>
				<i
					onClick={handleSubcribe}
					className={`fa-solid fa-heart absolute top-0 text-[30px] mt-2 ml-2 cursor-pointer`}
				/>
				<i
					onClick={handlePlay}
					className={`fa-solid fa-circle-play absolute cursor-pointer inset-0 m-auto text-[30px] w-8 h-8`}
				/>
			</div>
		</div>
	);
};

export default MovieShowList;
