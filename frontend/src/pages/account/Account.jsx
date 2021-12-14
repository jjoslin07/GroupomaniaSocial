// import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	// IconButton,
	// Input,
	// InputAdornment,
	// InputLabel,
	// OutlinedInput,
	TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useContext, useRef } from "react";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./account.css";

const Account = () => {
	const { user: currentUser } = useContext(AuthContext);
	// const config = {
	// 	headers: { Authorization: `Bearer ${currentUser.token}` },
	// };
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordVerify = useRef();
	const profilePicture = useRef();
	const coverPicture = useRef();
	const desc = useRef();
	const city = useRef();
	const from = useRef();
	const dept = useRef();
	const year = useRef();
	console.log(currentUser.token);
	const submitHandler = async (e) => {
		e.preventDefault();
		axios.put(
			"/users/" + currentUser.user.id,
			{
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
				passwordVerify: passwordVerify.current.value,
				profilePicture: profilePicture.current.value,
				coverPicture: coverPicture.current.value,
				desc: desc.current.value,
				city: city.current.value,
				from: from.current.value,
				dept: dept.current.value,
				year: year.current.value,
			},
			{
				headers: {
					Authorization: `Bearer ${currentUser.token}`,
				},
			}
		);
	};

	return (
		<>
			<Topbar />
			<div className="account">
				<div className="accountWrapper">
					<div className="accountTop">
						<h3 className="accountLogo">Welcome {currentUser.user.username}</h3>

						<span className="accountDesc">
							You can manage your account here.
						</span>
					</div>
					<div className="accountBottom">
						<Box
							onSubmit={submitHandler}
							component="form"
							className="accountBox"
							sx={{
								"& .MuiTextField-root": { m: 1, width: "25ch" },
							}}
							noValidate
							autoComplete="off"
						>
							<TextField
								id="outlined-start-adornment"
								placeholder="Name"
								required
								ref={username}
								className="accountInput"
								type="text"
								defaultValue={currentUser.user.username}
								label="required"
							/>
							<TextField
								id="outlined-start-adornment"
								placeholder="Email"
								required
								ref={email}
								className="accountInput"
								type="email"
								defaultValue={currentUser.user.email}
								label="required"
							/>

							{/* <OutlinedInput
								className="accountInput"
								id="outlined-adornment-password"
								placeholder="password"
								variant="outlined"
								minLength="6"
								ref={password}
								type={values.showPassword ? "text" : "password"}
								value={values.password}
								onChange={handleChange("password")}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{values.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Password"
							/> */}
							<TextField
								placeholder="Password"
								required
								ref={password}
								className="accountInput"
								type="password"
								minLength="6"
								label="password"
							/>
							<TextField
								placeholder="Verify Password"
								required
								ref={passwordVerify}
								className="accountInput"
								type="password"
								minLength="6"
								label="verify password"
							/>
							<TextField
								placeholder="profilePicture"
								ref={profilePicture}
								className="accountInput"
								type="email"
							/>
							<TextField
								placeholder="coverPicture"
								ref={coverPicture}
								className="accountInput"
								type="email"
							/>
							<TextField
								placeholder="Description"
								ref={desc}
								className="accountInput"
								type="text"
								defaultValue={currentUser.user.desc}
							/>
							<TextField
								placeholder="City"
								ref={city}
								className="accountInput"
								type="text"
								defaultValue={currentUser.user.city}
							/>
							<TextField
								placeholder="Hometown"
								ref={from}
								className="accountInput"
								type="text"
								defaultValue={currentUser.user.from}
							/>
							<TextField
								placeholder="Department"
								ref={dept}
								className="accountInput"
								type="text"
								defaultValue={currentUser.user.dept}
							/>
							<TextField
								placeholder="Years at Company"
								ref={year}
								className="accountInput"
								type="number"
							/>
							<div className="accountButtonContainer">
								<button className="accountCancelButton" type="submit">
									Cancel
								</button>
								<button className="accountSaveButton" type="submit">
									Save
								</button>
							</div>
						</Box>
					</div>
				</div>
			</div>
		</>
	);
};
export default Account;
