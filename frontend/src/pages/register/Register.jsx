import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordVerify = useRef();
	const navigate = useNavigate();

	const handleClick = async (e) => {
		e.preventDefault();
		if (passwordVerify.current.value !== password.current.value) {
			passwordVerify.current.setCustomValidity("Passwords don't match!");
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			};
			try {
				await axios.post("users/sign-up", user);
				navigate("/login");
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<>
			<div className="register" maxwidth="sm">
				<div className="registerWrapper">
					<div className="registerLeft">
						<h3 className="registerLogo">Groupomania Social</h3>
						<span className="registerDesc">
							Connect with friends and meet new coworkers at Groupomania.
						</span>
					</div>
					<div className="registerRight">
						<form className="registerBox" onSubmit={handleClick}>
							<input
								placeholder="Username"
								required
								ref={username}
								className="registerInputName"
								type="text"
							/>
							<input
								placeholder="Email"
								required
								ref={email}
								className="registerInput"
								type="email"
							/>
							<input
								placeholder="Password"
								required
								ref={password}
								className="registerInput"
								type="password"
								minLength="6"
							/>
							<input
								placeholder="Verify Password"
								required
								ref={passwordVerify}
								className="registerInput"
								type="password"
								minLength="6"
							/>
							<button className="registerButton" type="submit">
								Sign Up
							</button>
							<button className="registerLoginButton">Log into Account</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
