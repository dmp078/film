import React from "react";
import { useRef } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../AuthContext";
import { useState } from "react";

const Navbar = () => {
	const refViewMenu = useRef(null);
	const refCloseMenu = useRef(null);
	const refMenuOverlay = useRef(null);
	const { logOut } = UserAuth();
	const [content, setContent] = useState("");
	const navigate = useNavigate();

	const handleSearch = () => {
		navigate("/search/" + content);
	};

	return (
		<div className="justify-between container-navbar w-full h-[60px] flex px-8 fixed z-[1000]">
			{/* Left */}
			<div className="flex max-w-[60%]">
				{/* Menu in mobile */}
				<button className="">
					<div
						ref={refViewMenu}
						onClick={() => {
							refCloseMenu.current.classList.remove("hidden");
							refViewMenu.current.classList.add("hidden");
							refMenuOverlay.current.classList.add("active");
						}}
						className="w-fit pr-6 h-[32px] flex flex-col my-auto lg:hidden"
					>
						<div className="bg-white w-10 h-[10%] rounded-md my-auto"></div>
						<div className="bg-white w-10 h-[10%] rounded-md my-auto"></div>
						<div className="bg-white w-10 h-[10%] rounded-md my-auto"></div>
					</div>
					<div
						ref={refCloseMenu}
						onClick={() => {
							refCloseMenu.current.classList.add("hidden");
							refViewMenu.current.classList.remove("hidden");
							refMenuOverlay.current.classList.remove("active");
						}}
						className="hidden pr-6 h-[32px] w-fit flex-col my-auto lg:hidden"
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
					className="view-menu-mobile bg-[#141414] absolute w-screen h-screen left-0 -z-10 flex flex-col"
				>
					<Link to="/mylist" href="" className="h-[6vh] w-[60vw] rounded-md mx-auto mt-[80px] mb-[20px] flex">
						<p className="text-white text-[3vh] my-auto mx-auto">My List</p>
					</Link>

					<Link to="/account" href="" className="h-[6vh] w-[60vw] bg-red-600  rounded-md mx-auto mb-[20px] flex">
						<p className="text-white text-[3vh] my-auto mx-auto">Account</p>
					</Link>

					<Link to="/" onClick={logOut} className="h-[6vh] w-[60vw] bg-white text-[3vh] rounded-md mx-auto flex">
						<p className="text-[3vh] my-auto mx-auto">Log out</p>
					</Link>
				</div>
				{/*  */}

				<Link to="/home" className="flex">
					<img
						className="w-fit h-[40px] my-auto cursor-pointer"
						src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
						alt=""
					/>
				</Link>
				<Link to="/mylist" className="flex">
					<p className="text-white my-auto ml-[12px] px-[12px] py-[10px] cursor-pointer hidden md:block text-[20px]">
						My List
					</p>
				</Link>
			</div>

			{/* Search */}
			<form onSubmit={handleSearch} className="container-search w-[30%] lg:w-[25%] h-full flex">
				<svg
					onClick={handleSearch}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 my-auto mx-2 text-white cursor-pointer"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>

				<input
					onChange={(e) => {
						setContent(e.target.value);
					}}
					placeholder="Titles, people, genres"
					type="text"
					className="search-input text-white my-3 w-full mx-auto px-2"
				/>
			</form>
			{/*  */}

			{/* Right */}
			<div className="w-[30%] flex-row-reverse hidden lg:flex">
				<Link
					to="/"
					onClick={logOut}
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
