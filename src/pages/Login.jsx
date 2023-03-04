import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
	localStorage.setItem("loggedIn", false);
	const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);

	const location = useLocation();
	const navigate = useNavigate();
	let from = location.state?.from || "/";

	function handleSubmit(e) {
		setError(null);
		e.preventDefault();
		console.log(loginFormData);
		setStatus("submitting");
		loginUser(loginFormData)
			.then((data) => {
				console.log(data);
				localStorage.setItem("loggedIn", true);
				navigate(from, { replace: true });
			})
			.catch((error) => setError(error.message))
			.finally(() => setStatus("idle"));
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setLoginFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return (
		<div className='login-container'>
			{location?.state?.message && <h2 className='login-error'>{location.state.message}</h2>}
			{error && <h2 className='login-error'>{error}</h2>}
			<h1>Sign in to your account</h1>
			<form onSubmit={handleSubmit} className='login-form'>
				<input
					name='email'
					onChange={handleChange}
					type='email'
					placeholder='Email address'
					value={loginFormData.email}
				/>
				<input
					name='password'
					onChange={handleChange}
					type='password'
					placeholder='Password'
					value={loginFormData.password}
				/>
				<button disabled={status === "submitting"}>
					{status === "idle" ? "Login" : "Logging In"}
				</button>
			</form>
		</div>
	);
}
