import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
	const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);
	const location = useLocation();
	function handleSubmit(e) {
		e.preventDefault();
		console.log(loginFormData);
		setStatus("submitting");
		loginUser(loginFormData)
			.then((data) => console.log(data))
			.catch((error) => setError(error.message));
		setStatus("idle");
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
			{location?.state?.message && <h2>{location.state.message}</h2>}
			<h1>Sign in to your account</h1>
			{error ?? <h2>{error}</h2>}
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
				<button disabled={status === "submitting"}>Log in</button>
			</form>
		</div>
	);
}
