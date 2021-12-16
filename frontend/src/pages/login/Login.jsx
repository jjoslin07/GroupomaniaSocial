import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Login = () => {
	const email = useRef();
	const password = useRef();
	const { isFetching, dispatch } = useContext(AuthContext);

	const handleClick = (e) => {
		e.preventDefault();
		loginCall(
			{ email: email.current.value, password: password.current.value },
			dispatch
		);
	};

	return (
		<div className="login">
			<Box
				className="loginWrapper"
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "column", md: "row" },
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Box
					className="loginLeft"
					sx={{
						width: { xs: 375, md: 500 },
						textAlign: "justify",
					}}
				>
					<h3 className="loginLogo">Groupomania Social</h3>
					<span className="loginDesc">
						Connect with friends and meet new coworkers at Groupomania.
					</span>
				</Box>
				<div className="loginRight">
					<Box
						className="loginBox"
						onSubmit={handleClick}
						component="form"
						sx={{
							width: 375,
							boxShadow: 1,
							marginTop: { xs: 5 },
							marginLeft: { xs: 0, md: 5 },
						}}
					>
						<input
							placeholder="Email"
							type="email"
							required
							className="loginInput"
							ref={email}
						/>
						<input
							placeholder="Password"
							type="password"
							required
							minLength="6"
							className="loginInput"
							ref={password}
						/>
						<button className="loginButton" type="submit" disabled={isFetching}>
							{isFetching ? (
								<CircularProgress
									className="loginProgress"
									color="inherit"
									size="20px"
								/>
							) : (
								"Log In"
							)}
						</button>
						<span className="loginForgot">Forgot Password?</span>
						<Link className="loginRegisterLink" to="/register">
							<button className="loginRegisterButton">
								{isFetching ? (
									<CircularProgress
										className="loginProgress"
										color="inherit"
										size="20px"
									/>
								) : (
									"Register Account"
								)}
							</button>
						</Link>
					</Box>
				</div>
			</Box>
		</div>
	);
};

export default Login;
