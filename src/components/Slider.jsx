import React, { useRef } from "react";
import "./Slider.scss";

const Slider = ({ data, title }) => {
	const refArrowLeft = useRef(null);
	const refContainer = useRef(null);
	const refArrowRight = useRef(null);
	const numberPage = useRef(1);

	const handleArrowLeft = () => {
		numberPage.current--;
		if (numberPage.current < 4) {
			refArrowRight.current.style.display = "flex";
		}
		let length = "translate(-" + 26.35 * (numberPage.current - 1) + "%, 0)";
		refContainer.current.style.transform = length;
		if (numberPage.current <= 1) {
			refArrowLeft.current.style.display = "none";
			return;
		}
	};

	const handleArrowRight = () => {
		numberPage.current++;
		if (numberPage.current > 1) {
			refArrowLeft.current.style.display = "flex";
		}
		let length = "translate(-" + 26.35 * (numberPage.current - 1) + "%, 0)";
		refContainer.current.style.transform = length;
		if (numberPage.current >= 4) {
			refArrowRight.current.style.display = "none";
			return;
		}
	};

	return (
		<div>
			<div className="w-full h-[30px] bg-[#141414] relative z-[10]"></div>
			<div className="container-slider w-full h-[180px] bg-[#141414] flex flex-col relative z-[10]">
				<div className="w-full h-[25%] flex px-[3%] relative z-[10]">
					<a className="container-left flex cursor-pointer" href="">
						<h1 className="text-white font-bold text-[24px] my-auto bg-[#141414] z-10">{title}</h1>
						<div className="container-explore flex pl-[10px]">
							<p className="text-blue-500 my-auto">Explore All</p>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 text-blue-500 my-auto"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
							</svg>
						</div>
					</a>
				</div>
				{/* Scroll Movie */}
				<div className="container-scroll w-full h-full flex relative z-[100] mt-[5px]">
					<div ref={refArrowLeft} onClick={handleArrowLeft} className="arrow-left h-full w-[3%] absolute z-10 my-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8 text-white my-auto mx-auto"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
							/>
						</svg>
					</div>

					<div className="h-full w-full">
						<div
							ref={refContainer}
							className={"list-movie flex h-full w-[900vw] lg:w-[360vw] md:w-[440vw] sm:w-[600vw] absolute left-[3%]"}
						>
							{data.map((movie, index) => (
								<div
									key={index}
									className="container-movie-member relative w-[45vw] h-full lg:w-[18vw] md:w-[22vw] sm:w-[30vw]"
								>
									<div className="movie-member cursor-pointer flex flex-col bg-black absolute w-[44.1vw] h-[300%] lg:w-[17.7vw] md:w-[21.5vw] sm:w-[29.3vw]  md:hover:lg:w-[20vw] md:hover:md:w-[24vw]">
										<img
											className="w-full h-[33.34%]"
											src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
											alt=""
										/>
										<div className="w-full h-[15%] flex">
											<h1 className=" text-white text-center font-bold text-[20px] my-auto h-[fit-content] mx-auto">
												{movie.title}
											</h1>
										</div>
										<h1 className="w-full h-[46.66%] text-[grey] overflow-hidden">{movie.overview}</h1>
										<div className="w-full h-[5%] flex">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6 mx-auto my-auto text-white"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
												/>
											</svg>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div
						ref={refArrowRight}
						onClick={handleArrowRight}
						className="arrow-right w-[3%]  h-full right-0 absolute flex"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8 text-white my-auto mx-auto"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Slider;
