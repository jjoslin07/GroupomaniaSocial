import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

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
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Groupomania Social</h3>
					<span className="loginDesc">
						Connect with friends and meet new coworkers at Groupomania.
					</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleClick}>
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
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
