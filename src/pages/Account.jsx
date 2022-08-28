import React, { useEffect } from "react";
import { useState } from "react";
import { UserAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";

const Account = () => {
	const [list, setList] = useState([]);
	const { user } = UserAuth();

	useEffect(() => {
		onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
			setList(doc.data()?.shows);
		});
	}, [user.email]);

	return (
		<div className="">
			<Navbar />
			<div className="w-full h-[150px]"></div>
			<h1 className="text-[40px] text-center font-bold w-full text-white">Email: {user?.email}</h1>
			<h1 className="text-[40px] text-center font-bold w-full text-white">Subcribed: {list.length}</h1>
		</div>
	);
};

export default Account;
