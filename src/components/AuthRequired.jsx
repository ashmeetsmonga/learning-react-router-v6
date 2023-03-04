import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const AuthRequired = () => {
	const auth = localStorage.getItem("loggedIn");
	const location = useLocation();
	if (auth !== "true")
		return (
			<Navigate to='/login' replace state={{ from: location, message: "You must login first" }} />
		);
	return <Outlet />;
};

export default AuthRequired;
