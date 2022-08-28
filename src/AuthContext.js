import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState, useContext } from "react";
import { auth } from "./firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState({});

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	const [windowSize, setWindowSize] = useState(getWindowSize());

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize());
		}

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logOut = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
		return () => {
			unsub();
		};
	});

	return <AuthContext.Provider value={{ windowSize, user, signIn, logOut }}>{children}</AuthContext.Provider>;
}

export function UserAuth() {
	return useContext(AuthContext);
}
