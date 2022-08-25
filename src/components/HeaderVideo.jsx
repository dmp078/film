import React from "react";

const HeaderVideo = ({ data }) => {
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
	const keyVideo = temp.backdrop_path;
	const title = temp.title;
	const overview = temp.overview;

	return (
		<div className="hidden md:block relative z-[1]">
			<img src={"https://image.tmdb.org/t/p/original/" + keyVideo} className="w-full h-auto" alt="" />
			{/* title + overview + play + info */}
			<div className="w-[50%] h-[40%] absolute top-[260px] lg:top-[320px] xl:top-[380px] ml-[3%]">
				{/* title + overview */}
				<div
					className="w-full text-white max-w-[40vw] flex flex-col"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
				>
					<h1 className="font-bold text-[2.5vw] mx-auto">{title}</h1>
					<p className="text-[1.5vw] mx-auto max-w-[39.5vw] text-center">{handleOverView(overview)}</p>
				</div>

				{/* play + info */}
				<div className="w-[45vw] h-[13%] flex mt-[3%]">
					{/* play */}
					<a
						href=""
						className="px-[1%] rounded-[7%] py-[1%] my-auto hover:opacity-90 text-[1.4vw] font-bold mx-[0.5vw] text-black bg-white flex"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="mr-[0.4vw] h-[1.5vw] w-[1.5vw] my-auto"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
								clipRule="evenodd"
							/>
						</svg>
						Play
					</a>
					{/* info */}
					<div className="px-[1%] rounded-[7%] py-[1%] my-auto hover:opacity-90 text-[1.4vw] font-bold  mx-[0.5vw] text-white bg-slate-700 flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="mr-[0.4vw] h-[1.5vw] w-[1.5vw] my-auto"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clipRule="evenodd"
							/>
						</svg>
						More Info
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderVideo;
