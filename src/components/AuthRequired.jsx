import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRequired = () => {
	const auth = localStorage.getItem("loggedIn");
	if (auth !== "true") return <Navigate to='/login' state={{ message: "You must login first" }} />;
	return <Outlet />;
};

export default AuthRequired;
