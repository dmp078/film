import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderVideo = ({ data, type }) => {
	const handleOverView = (str) => {
		let res = "";
		if (str?.length > 140) {
			for (var i = 0; i <= 140; i++) {
				res += str[i];
			}
			res += "...";
		} else res = str;
		return res;
	};
	const temp = data[Math.floor(Math.random() * data.length)];
	const keyVideo = temp?.backdrop_path;
	const title = temp?.title || temp?.name;
	const overview = temp?.overview;

	const navigate = useNavigate();
	const handlePlay = () => {
		navigate("/play/" + type + "/" + temp?.id);
	};

	return (
		<div className="hidden md:block relative z-[1]">
			<img src={"https://image.tmdb.org/t/p/original/" + keyVideo} className="w-full" alt="" />
			{/* title + overview + play + info */}
			<div className="w-[50%] h-[40%] absolute ml-12 top-[190px] lg:top-[260px] xl:top-[320px]">
				{/* title + overview */}
				<div className="w-full text-white max-w-[40vw] flex flex-col" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
					<h1 className="font-bold text-2xl mx-auto">{title}</h1>
					<p className="mx-auto max-w-[39vw] text-lg text-center">{handleOverView(overview)}</p>
				</div>

				{/* play + info */}
				<div className="w-fit h-fit mt-4 ml-[30%]">
					{/* play */}
					<button
						onClick={handlePlay}
						className="rounded-[7%] px-6 py-2 my-auto hover:opacity-70 text-xl font-bold text-black bg-white flex"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
								clipRule="evenodd"
							/>
						</svg>
						Play
					</button>
				</div>
			</div>
		</div>
	);
};

export default HeaderVideo;
