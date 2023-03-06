import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Form, useActionData, useNavigation } from "react-router-dom";
import { loginUser } from "../api";

export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	try {
		const data = await loginUser({ email, password });
		localStorage.setItem("loggedIn", true);
		return data;
	} catch (error) {
		return { error: error.message };
	}
}

export default function Login() {
	const data = useActionData();

	const location = useLocation();
	const navigate = useNavigate();
	const navigation = useNavigation();
	console.log(navigation);
	let from = location.state?.from || "/host";

	if (data?.token) navigate(from, { replace: true });

	return (
		<div className='login-container'>
			{location?.state?.message && <h2 className='login-error'>{location.state.message}</h2>}
			{data?.error && <h2 className='login-error'>{data?.error}</h2>}
			<h1>Sign in to your account</h1>
			<Form action='/login' method='post' className='login-form'>
				<input name='email' type='email' placeholder='Email address' />
				<input name='password' type='password' placeholder='Password' />
				<button disabled={navigation.state === "submitting"}>
					{navigation.state === "idle" ? "Login" : "Logging In"}
				</button>
			</Form>
		</div>
	);
}
