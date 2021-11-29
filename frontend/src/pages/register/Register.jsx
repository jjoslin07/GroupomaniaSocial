import "./register.css";

const Register = () => {
	return (
		<div className="register">
			<div className="registerWrapper">
				<div className="registerLeft">
					<h3 className="registerLogo">Groupomania Social</h3>
					<span className="registerDesc">
						Connect with friends and the world around you on Groupomania.
					</span>
				</div>
				<div className="registerRight">
					<div className="registerBox">
						<div className="registerName">
							<input placeholder="First Name" className="registerInputName" />
							<input placeholder="Last Name" className="registerInputName" />
						</div>

						<input placeholder="Email" className="registerInput" />
						<input placeholder="Password" className="registerInput" />
						<button className="registerButton">Sign Up</button>
						<button className="registerLoginButton">Log into Account</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;