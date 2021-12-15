// import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Button,
	IconButton,
	Input,
	// IconButton,
	// Input,
	// InputAdornment,
	// InputLabel,
	// OutlinedInput,
	TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useContext, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

import "./account.css";
import { PhotoCamera } from "@mui/icons-material";

const Account = () => {
	// Navigate const for page redirection
	const navigate = useNavigate();
	// Set user to Alias to currentUser
	const { user: currentUser } = useContext(AuthContext);
	// Send user token to header
	const config = {
		headers: { Authorization: `Bearer ${currentUser.token}` },
	};
	const [username, setUsername] = useState(currentUser.user.username);
	const [email, setEmail] = useState(currentUser.user.email);
	const [password, setPassword] = useState(currentUser.user.password);
	const [passwordVerify, setPasswordVerify] = useState(
		currentUser.user.password
	);
	const [profilePicture, setProfilePicture] = useState(
		currentUser.user.profilePicture
	);

	const [coverPicture, setCoverPicture] = useState(
		currentUser.user.coverPicture
	);
	const [desc, setDesc] = useState(currentUser.user.desc);
	const [city, setCity] = useState(currentUser.user.city);
	// const city = useRef();
	const [from, setFrom] = useState(currentUser.user.from);
	// const from = useRef();
	const [dept, setDept] = useState(currentUser.user.dept);
	// const dept = useRef();
	const [year, setYear] = useState(currentUser.user.year);

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
			await window.localStorage.clear();
			await window.location.reload();
		} catch (error) {
			throw "An error occurred"(error);
		}
	};

	return (
		<>
			<Topbar />
			<div className="account">
				<div className="accountWrapper">
					{/* <div className="accountTop">
						<h3 className="accountLogo">Welcome {currentUser.user.username}</h3>

						<span className="accountDesc">
							You can manage your account here.
						</span>
					</div> */}
					<div className="accountLeft">
						<h3 className="accountLogo">Welcome {currentUser.user.username}</h3>

						<span className="accountDesc">
							You can manage your account here.
						</span>
						<label htmlFor="icon-button-file">
							<Input accept="image/*" id="icon-button-file" type="file" />
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
							>
								<PhotoCamera />
							</IconButton>
						</label>
						<label htmlFor="icon-button-file">
							<Input accept="image/*" id="icon-button-file" type="file" />
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
							>
								<PhotoCamera />
							</IconButton>
						</label>
					</div>
					<div className="accountRight">
						<Box
							onSubmit={submitHandler}
							component="form"
							className="accountBox"
							sx={{
								"& .MuiTextField-root": { m: 1, width: "50ch" },
								boxShadow: 1,
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
								defaultValue={currentUser.user.username}
							/>
							<TextField
								id="outlined-start-adornment"
								// placeholder="Email"
								required
								className="accountInput"
								type="email"
								label="Email"
								onChange={handleChangeEmail}
								defaultValue={currentUser.user.email}
							/>
							<TextField
								// placeholder={currentUser.user.password}
								required
								className="accountInput"
								type="password"
								minLength="6"
								label="password"
								// ref={pass}
								onChange={handleChangePass}
								defaultValue={currentUser.user.password}
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
								defaultValue={currentUser.user.password}
							/>
							{/* <TextField
								placeholder="profilePicture"
								className="accountInput"
								type="string"
								onChange={setProfilePicture}
							/>
							<TextField
								placeholder="coverPicture"
								className="accountInput"
								type="string"
								onChange={setCoverPicture}
							/> */}
							<TextField
								// placeholder="Description"
								className="accountInput"
								type="text"
								label="Description"
								defaultValue={currentUser.user.desc}
								onChange={handleChangeDesc}
							/>
							<TextField
								label="City"
								className="accountInput"
								type="text"
								defaultValue={currentUser.user.city}
								// onChange={submitHandler}
								// value={city}
								onChange={handleChangeCity}
							/>
							<TextField
								label="Hometown"
								className="accountInput"
								type="text"
								onChange={handleChangeFrom}
								defaultValue={currentUser.user.from}
							/>
							<TextField
								label="Department"
								className="accountInput"
								type="text"
								onChange={handleChangeDept}
								defaultValue={currentUser.user.dept}
							/>
							<TextField
								label="Years at Company"
								className="accountInput"
								type="number"
								onChange={handleChangeYear}
								defaultValue={currentUser.user.year}
							/>
							<div className="accountButtonContainer">
								<Button
									className="accountSaveBtn"
									type="submit"
									variant="contained"
									endIcon={<SaveIcon />}
								>
									Save
								</Button>
								<span className="saveButtonMsg">*Requires Login*</span>
							</div>
						</Box>
					</div>
				</div>
			</div>
		</>
	);
};
export default Account;
