import React from "react";
import { db } from "../firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { UserAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Movie = ({ movie, list, type }) => {
	const { user } = UserAuth();
	const inList = () => {
		let res = false;
		list?.forEach((e) => {
			if (e.id == movie.id) res = true;
		});
		return res;
	};
	const height = 25;

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
		<div className="grid-member relative">
			<div>
				<img
					className={"h-[" + height + "vh] w-full relative"}
					src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}`}
					alt={movie?.title || movie?.name}
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

					{!isActive && (
						<div onClick={handleSubcribe} className="absolute m-2 text-white">
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
									d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
								/>
							</svg>
						</div>
					)}

					{isActive && (
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
					)}
				</div>
			</div>
		</div>
	);
};

export default Movie;
