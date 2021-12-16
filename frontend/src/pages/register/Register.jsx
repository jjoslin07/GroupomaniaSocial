import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

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
			<div className="register">
				<Box
					className="registerWrapper"
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "column", md: "row" },
						alignItems: { xs: "center" },
						justifyContent: "center",
					}}
				>
					<Box
						className="registerLeft"
						sx={{
							width: 375,
							textAlign: { xs: "justify", s: "initial", md: "initial" },
						}}
					>
						<h3 className="registerLogo">Groupomania Social</h3>
						<span className="registerDesc">
							Connect with friends and meet new coworkers at Groupomania.
						</span>
					</Box>
					<div className="registerRight">
						<Box
							component="form"
							className="registerBox"
							onSubmit={handleClick}
							sx={{
								width: 375,
								height: 400,
								boxShadow: 1,
								marginTop: { xs: 5 },
								marginLeft: { xs: 0, md: 5 },
							}}
						>
							<input
								placeholder="Name"
								required
								ref={username}
								className="registerInput"
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
							<Link className="registerLoginLink" to="/login">
								<button className="registerLoginButton">
									Log into Account
								</button>
							</Link>
						</Box>
					</div>
				</Box>
			</div>
		</>
	);
};

export default Register;
