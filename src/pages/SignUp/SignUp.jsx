import React, { useRef } from "react";
import { useEffect } from "react";
import "./SignUp.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../AuthContext";
import Footer from "../../components/Footer";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
	const { signIn, logOut } = UserAuth();
	logOut();
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const refContainerEmail = useRef(null);
	const refInputEmail = useRef(null);

	const refContainerPassword = useRef(null);
	const refInputPassword = useRef(null);

	const navigate = useNavigate();

	const ClickOutSideEmail = (ref) => {
		const handleOutSide = (e) => {
			if (
				ref.current &&
				!ref.current.contains(e.target) &&
				ref.current.classList.contains("active") &&
				refInputEmail.current.value == ""
			) {
				ref.current.classList.remove("active");
			}
		};
		useEffect(() => {
			document.addEventListener("mousedown", handleOutSide);
			return () => {
				document.removeEventListener("mousedown", handleOutSide);
			};
		});
	};

	const ClickOutSidePassword = (ref) => {
		const handleOutSide = (e) => {
			if (
				ref.current &&
				!ref.current.contains(e.target) &&
				ref.current.classList.contains("active") &&
				refInputPassword.current.value == ""
			) {
				ref.current.classList.remove("active");
			}
		};
		useEffect(() => {
			document.addEventListener("mousedown", handleOutSide);
			return () => {
				document.removeEventListener("mousedown", handleOutSide);
			};
		});
	};
	const handleSubmit = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				setDoc(doc(db, "users", email), {
					shows: [],
				});
				navigate("/");
			})
			.catch((er) => {
				setError(er.code);
			});
	};

	ClickOutSideEmail(refContainerEmail);
	ClickOutSidePassword(refContainerPassword);

	return (
		<div className="container absolute left-0 right-0 top-0 bottom-0 max-w-none min-h-[800px] sm:min-h-[1000px]">
			{/* Overlay */}
			<div className="overlay w-full h-full absolute z-[1] hidden md:block"></div>
			{/* Navbar */}
			<div className="navbar h-[90px] w-full flex px-[10%] relative z-10">
				<img
					className="h-[50%] w-auto my-auto"
					src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
					alt=""
				/>
			</div>
			{/* Form */}
			<div className="container-form-signin rounded-md h-fit w-fit mx-auto relative z-10">
				<div className="form-signin w-full h-fit">
					{/*  */}
					<h1 className="font-bold text-white text-[30px]">Sign Up </h1>
					{/* Email */}
					<div
						onClick={() => {
							refContainerEmail.current.classList.add("active");
							refInputEmail.current.focus();
						}}
						ref={refContainerEmail}
						className="container-email bg-[#333] w-[90vw] sm:w-[190px] min-w-[280px] h-[60px]  text-white flex flex-col rounded-lg mt-[10px] md:mt-[20px]"
					>
						<div className="w-full flex h-auto my-auto ">
							<h1 className="placeholder-email ml-[20px] my-auto text-slate-400">Email or Phone Number</h1>
						</div>
						<input
							type="email"
							ref={refInputEmail}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							className="input-email h-[80%] text-[20px] ml-[20px] relative hidden"
						/>
					</div>

					{/* Password */}
					<div
						onClick={() => {
							refContainerPassword.current.classList.add("active");
							refInputPassword.current.focus();
						}}
						ref={refContainerPassword}
						className="container-password bg-[#333] w-[90vw] sm:w-[190px] min-w-[280px] h-[60px]  text-white flex flex-col rounded-lg mt-[10px] md:mt-[20px]"
					>
						<div className="w-full flex h-auto my-auto">
							<h1 className="placeholder-password ml-[20px] my-auto text-slate-400">Password</h1>
						</div>

						<input
							type="password"
							ref={refInputPassword}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							className="input-password h-[80%] text-[20px] ml-[20px] relative hidden"
						/>
					</div>
					{/*  */}

					{/* Submit */}
					<button
						onClick={handleSubmit}
						className="w-[80%] mx-auto rounded-lg bg-[#e50914] text-white mt-[10px] md:mt-[20px] h-[60px] flex"
					>
						<h1 className="text-[20px] mx-auto my-auto">Sign Up</h1>
					</button>
					{/*  */}

					{/* error */}
					<div className="w-full h-[30px] mt-[25px]">
						<h1 className="text-red-600 font-bold text-center">{error}</h1>
					</div>

					<div className="flex mx-auto w-fit">
						<h1 className="text-white h-[30px]">Already have an account?</h1>
						<Link to="/" className="text-blue-500 mx-[5px] font-bold cursor-pointer">
							Log In
						</Link>
					</div>
					{/*  */}
				</div>
				{/*  */}
			</div>
			{/* footer */}
			<div className="absolute bottom-0 right-0 left-0">
				<Footer />
			</div>
		</div>
	);
};

export default SignUp;
