// import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Button,
	// IconButton,
	// Input,
	// InputAdornment,
	// InputLabel,
	// OutlinedInput,
	TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import "./account.css";

const Account = () => {
	// Navigate const for page redirection
	const navigate = useNavigate();
	// Set user to Alias to currentUser
	const { user: currentUser } = useContext(AuthContext);
	// Send user token to header
	const config = {
		headers: { Authorization: `Bearer ${currentUser.token}` },
	};
	// useState
	const [username, setUsername] = useState(currentUser.user.username);
	// const username = useRef();
	const [email, setEmail] = useState(currentUser.user.email);
	// const email = useRef();
	const [password, setPassword] = useState(currentUser.user.password);
	// const pass = useRef();
	const [passwordVerify, setPasswordVerify] = useState(
		currentUser.user.password
	);
	// const verify = useRef();
	const [profilePicture, setProfilePicture] = useState(
		currentUser.user.profilePicture
	);
	// const profilePicture = useRef();
	const [coverPicture, setCoverPicture] = useState(
		currentUser.user.coverPicture
	);
	// const coverPicture = useRef();
	// const desc = useRef();
	const [desc, setDesc] = useState(currentUser.user.desc);
	const [city, setCity] = useState(currentUser.user.city);
	// const city = useRef();
	const [from, setFrom] = useState(currentUser.user.from);
	// const from = useRef();
	const [dept, setDept] = useState(currentUser.user.dept);
	// const dept = useRef();
	const [year, setYear] = useState(currentUser.user.year);
	// const year = useRef();
	// console.log(currentUser.token);
	// const submitHandler = async (e) => {
	// 	e.preventDefault();
	// 	await axios.put(
	// 		"/users/" + currentUser.user.id,
	// 		{
	// 			username: username.current.value,
	// 			email: email.current.value,
	// 			password: password.current.value,
	// 			passwordVerify: passwordVerify.current.value,
	// 			profilePicture: profilePicture.current.value,
	// 			coverPicture: coverPicture.current.value,
	// 			desc: desc.current.value,
	// 			city: city.current.value,
	// 			from: from.current.value,
	// 			dept: dept.current.value,
	// 			year: year.current.value,
	// 		},
	// 		{
	// 			headers: {
	// 				Authorization: `Bearer ${currentUser.token}`,
	// 			},
	// 		}
	// 	);
	// };

	// Handle change for form
	const handleChangeName = (event) => {
		setUsername(event.currentTarget.value);
	};
	const handleChangeEmail = (event) => {
		setEmail(event.currentTarget.value);
	};
	const handleChangePass = (event) => {
		setPassword(event.currentTarget.value);
	};
	const handleChangePassVerify = (event) => {
		setPasswordVerify(event.currentTarget.value);
	};
	const handleChangeDesc = (event) => {
		setDesc(event.currentTarget.value);
	};
	const handleChangeCity = (event) => {
		setCity(event.currentTarget.value);
	};
	const handleChangeFrom = (event) => {
		setFrom(event.currentTarget.value);
	};
	const handleChangeDept = (event) => {
		setDept(event.currentTarget.value);
	};
	const handleChangeYear = (event) => {
		setYear(event.currentTarget.value);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		// if (passwordVerify.value !== password.current.value) {
		// 	passwordVerify.current.setCustomValidity("Passwords don't match!");
		// } else {
		const user = {
			username: username,
			email: email,
			password: password,
			passwordVerify: passwordVerify,
			profilePicture: profilePicture,
			coverPicture: coverPicture,
			desc: desc,
			city: city,
			from: from,
			dept: dept,
			year: year,
		};
		try {
			await axios.put("/users/" + currentUser.user.id, user, config);
		} catch (error) {
			console.log(error);
		}
		// }

		localStorage.clear();
		localStorage.setItem("user", JSON.stringify(user));
		await navigate("/profile/" + currentUser.user.username);
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
								// placeholder="Name"
								required
								className="accountInput"
								type="text"
								label="Name"
								onChange={handleChangeName}
								// defaultValue={currentUser.user.username}
							/>
							<TextField
								id="outlined-start-adornment"
								// placeholder="Email"
								required
								className="accountInput"
								type="email"
								label="Email"
								onChange={handleChangeEmail}
								// defaultValue={currentUser.user.email}
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
								// placeholder={currentUser.user.password}
								required
								className="accountInput"
								type="password"
								minLength="6"
								label="password"
								// ref={pass}
								onChange={handleChangePass}
							/>
							<TextField
								// placeholder="Verify Password"
								required
								className="accountInput"
								type="password"
								minLength="6"
								label="verify password"
								// ref={verify}
								onChange={handleChangePassVerify}
							/>

							<TextField
								placeholder="profilePicture"
								className="accountInput"
								type="string"
							/>
							<TextField
								placeholder="coverPicture"
								className="accountInput"
								type="string"
							/>
							<TextField
								// placeholder="Description"
								className="accountInput"
								type="text"
								label="Description"
								// defaultValue={currentUser.user.desc}
								onChange={handleChangeDesc}
							/>
							<TextField
								label="City"
								className="accountInput"
								type="text"
								// defaultValue={currentUser.user.city}
								// onChange={submitHandler}
								// value={city}
								onChange={handleChangeCity}
							/>
							<TextField
								label="Hometown"
								className="accountInput"
								type="text"
								onChange={handleChangeFrom}
								// defaultValue={currentUser.user.from}
							/>
							<TextField
								label="Department"
								className="accountInput"
								type="text"
								onChange={handleChangeDept}
								// defaultValue={currentUser.user.dept}
							/>
							<TextField
								label="Years at Company"
								className="accountInput"
								type="number"
								onChange={handleChangeYear}
							/>
							<div className="accountButtonContainer">
								{/* <button className="accountCancelButton" type="submit">
									Cancel
								</button> */}
								{/* <button className="accountSaveButton" type="submit">
									Save
								</button> */}

								<Button
									type="submit"
									variant="contained"
									endIcon={<SaveIcon />}
								>
									Save
								</Button>
							</div>
						</Box>
					</div>
				</div>
			</div>
		</>
	);
};
export default Account;
