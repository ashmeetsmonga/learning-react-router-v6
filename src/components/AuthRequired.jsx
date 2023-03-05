import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const AuthRequired = () => {
	const auth = localStorage.getItem("loggedIn");
	const location = useLocation();
	if (auth !== "true") {
		console.log(auth);
		return (
			<Navigate
				to='/login'
				replace
				state={{ from: location.pathname, message: "You must login first" }}
			/>
		);
	}
	return <Outlet />;
};

export default AuthRequired;
