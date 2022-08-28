import { Navigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import React from "react";

const ProtectAuth = ({ children }) => {
	const { user, logOut } = UserAuth();
	if (user) return children;
	else {
		logOut();
		return <Navigate to="/" />;
	}
};

export default ProtectAuth;
