import React from "react";
import { useRef } from "react";
import "./Navbar.scss";
import { Link, Route } from "react-router-dom";

const Navbar = () => {
	const refViewMenu = useRef(null);
	const refCloseMenu = useRef(null);
	const refMenuOverlay = useRef(null);

	return (
		<div className="justify-between container-navbar w-full h-[60px] flex px-[3%] fixed md:bg-gradient-to-b md:from-[#141414] z-[1000]">
			{/* Left */}
			<div className="flex max-w-[70%]">
				{/* Menu in mobile */}
				<button className="">
					<div
						ref={refViewMenu}
						onClick={() => {
							refCloseMenu.current.classList.remove("hidden");
							refViewMenu.current.classList.add("hidden");
							refMenuOverlay.current.classList.add("active");
						}}
						className="w-[13vw] h-[32px] flex flex-col my-auto md:hidden"
					>
						<div className="bg-white w-[8vw] h-[10%] rounded-md my-auto"></div>
						<div className="bg-white w-[8vw] h-[10%] rounded-md my-auto"></div>
						<div className="bg-white w-[8vw] h-[10%] rounded-md my-auto"></div>
					</div>
					<div
						ref={refCloseMenu}
						onClick={() => {
							refCloseMenu.current.classList.add("hidden");
							refViewMenu.current.classList.remove("hidden");
							refMenuOverlay.current.classList.remove("active");
						}}
						className="hidden w-[13vw] h-[32px] flex-col my-auto md:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-8 h-8 text-white"
						>
							<path
								fillRule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</button>
				{/* View Menu in mobile */}
				<div
					ref={refMenuOverlay}
					className="view-menu-mobile bg-black absolute w-screen h-screen left-0 -z-10 flex flex-col"
				>
					<Link
						to="/account"
						href=""
						className="h-[6vh] w-[60vw] bg-red-600  rounded-md mx-auto mt-[80px] mb-[20px] flex"
					>
						<p className="text-white text-[3vh] my-auto mx-auto">Account</p>
					</Link>
					<Link to="/signin" className="h-[6vh] w-[60vw] bg-white text-[3vh] rounded-md mx-auto my-[20px] flex">
						<p className="text-[3vh] my-auto mx-auto">Log out</p>
					</Link>
				</div>
				{/*  */}
				<Link to="/" className="flex">
					<img
						className="w-auto h-[35px] my-auto cursor-pointer"
						src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
						alt=""
					/>
				</Link>
				<Link to="/mylist" className="flex">
					<p className="text-white my-auto ml-[12px] px-[12px] py-[10px] cursor-pointer hidden md:block">My List</p>
				</Link>
			</div>

			{/* Right */}
			<div className="w-[30%] flex-row-reverse hidden md:flex">
				<Link
					to="/signin"
					className="text-white px-4 bg-red-500 my-auto py-1 mx-1 min-w-[120px] text-[16px] text-center rounded-xl"
				>
					Log out
				</Link>
				<Link
					to="/account"
					className="px-4 bg-white my-auto py-1 mx-1 min-w-[120px] text-[16px] text-center rounded-xl"
				>
					Account
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
