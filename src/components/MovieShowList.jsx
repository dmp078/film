import React from "react";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { UserAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const MovieShowList = ({ list, movie }) => {
	const { user } = UserAuth();

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
		<div className="grid-member relative">
			<div>
				<img
					className="h-[25vh] w-full relative"
					src={`https://image.tmdb.org/t/p/original/${movie?.img}`}
					alt={movie?.title}
				/>
				<div className="overlay w-full h-full absolute top-0 hidden bg-black cursor-pointer">
					<div
						onClick={handlePlay}
						className="text-white absolute top-0 right-0 bottom-0 left-0 m-auto h-[60px] w-[60px]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8 absolute top-0 right-0 bottom-0 left-0 m-auto"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
							/>
						</svg>
					</div>
					<div>
						<div className="absolute m-2 text-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 cursor-pointer"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div onClick={handleSubcribe} className="absolute m-2 text-white right-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieShowList;
