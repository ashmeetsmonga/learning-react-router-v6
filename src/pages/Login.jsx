import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Form } from "react-router-dom";
import { loginUser } from "../api";

export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const data = await loginUser({ email, password });
	localStorage.setItem("loggedIn", true);
	console.log(data);
}

export default function Login() {
	localStorage.setItem("loggedIn", false);
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);

	const location = useLocation();
	const navigate = useNavigate();
	let from = location.state?.from || "/";

	function handleSubmit(e) {
		setError(null);
		e.preventDefault();
		setStatus("submitting");
		loginUser(loginFormData)
			.then((data) => {
				localStorage.setItem("loggedIn", true);
				navigate(from, { replace: true });
			})
			.catch((error) => setError(error.message))
			.finally(() => setStatus("idle"));
	}

	return (
		<div className='login-container'>
			{location?.state?.message && <h2 className='login-error'>{location.state.message}</h2>}
			{error && <h2 className='login-error'>{error}</h2>}
			<h1>Sign in to your account</h1>
			<Form action='/login' method='post' className='login-form'>
				<input name='email' type='email' placeholder='Email address' />
				<input name='password' type='password' placeholder='Password' />
				<button disabled={status === "submitting"}>
					{status === "idle" ? "Login" : "Logging In"}
				</button>
			</Form>
		</div>
	);
}
