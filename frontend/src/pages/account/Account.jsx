// import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Link, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useContext, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

import "./account.css";
import { CancelPresentationOutlined, PhotoCamera } from "@mui/icons-material";

const Account = () => {
	// Navigate const for page redirection
	// const navigate = useNavigate();
	// Set user to Alias to currentUser
	const { user: currentUser } = useContext(AuthContext);
	// Send user token to header
	const config = {
		headers: { Authorization: `Bearer ${currentUser.token}` },
	};

	// Reference

	// State
	const [username, setUsername] = useState(currentUser.user.username);
	const [email, setEmail] = useState(currentUser.user.email);
	const [password, setPassword] = useState(currentUser.user.password);
	const [profile_picture, set_profile_picture] = useState(null);
	const [cover_picture, set_cover_picture] = useState(null);

	const [desc, setDesc] = useState(currentUser.user.desc);
	const [city, setCity] = useState(currentUser.user.city);
	const [from, setFrom] = useState(currentUser.user.from);
	const [dept, setDept] = useState(currentUser.user.dept);
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
	const handleProfileImg = (event) => {
		set_profile_picture(event.target.files[0]);
	};
	const handleCoverImg = (event) => {
		set_cover_picture(event.target.files[0]);
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		const user = {
			username: username,
			email: email,
			password: password,
			desc: desc,
			city: city,
			from: from,
			dept: dept,
			year: year,
		};
		if (profile_picture) {
			const data = new FormData();
			const fileName = Date.now() + profile_picture.name;
			data.append("name", fileName);
			data.append("file", profile_picture);
			user.profile_picture = fileName;
			try {
				await axios.post("/upload", data);
			} catch (error) {
				console.log(error);
			}
		}
		if (cover_picture) {
			const data = new FormData();
			const fileName = Date.now() + cover_picture.name;
			data.append("name", fileName);
			data.append("file", cover_picture);
			user.cover_picture = fileName;
			try {
				await axios.post("/upload", data);
			} catch (error) {
				console.log(error);
			}
		}
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
						<Box
							sx={{
								position: "relative",
								display: "flex",
								backgroundColor: "white",
								width: 500,
								height: 200,
								boxShadow: 1,
							}}
						>
							<label htmlFor="profileImg" className="accountOption">
								<PhotoCamera
									className="accountIcon"
									style={{ color: "green" }}
								/>
								<span className="accountOptionText">Profile Picture</span>
								<input
									style={{ display: "none" }}
									type="file"
									id="profileImg"
									accept=".png,.jpeg,.jpg"
									onChange={handleProfileImg}
									name="image"
								/>
							</label>
							<hr className="accountHr" />
							{profile_picture && (
								<div className="accountImgContainer">
									<img
										src={URL.createObjectURL(profile_picture)}
										alt=""
										className="accountImg"
									/>
									<CancelPresentationOutlined
										className="accountCancelImg"
										onClick={() => set_profile_picture(null)}
									/>
								</div>
							)}
						</Box>
						<Box
							sx={{
								marginTop: 3,
								position: "relative",
								display: "flex",
								backgroundColor: "white",
								width: 500,
								height: 200,
								boxShadow: 1,
							}}
						>
							<label htmlFor="coverImg" className="accountOption">
								<PhotoCamera
									className="accountIcon"
									style={{ color: "green" }}
								/>
								<span className="accountOptionText">Cover Picture</span>
								<input
									style={{ display: "none" }}
									type="file"
									id="coverImg"
									accept=".png,.jpeg,.jpg"
									onChange={handleCoverImg}
									name="image"
								/>
							</label>
							<hr className="accountHr" />
							{cover_picture && (
								<div className="accountImgContainer">
									<img
										src={URL.createObjectURL(cover_picture)}
										alt=""
										className="accountImgAlt"
									/>
									<CancelPresentationOutlined
										className="accountCancelImgAlt"
										onClick={() => set_cover_picture(null)}
									/>
								</div>
							)}
						</Box>
						<span className="accountDeleteLink">
							Want to delete your account? Click{" "}
							<Link
								href={`/account/${currentUser.user.username}/delete`}
								sx={{
									cursor: "pointer",
									color: "#fb2f01",
									textDecoration: "none",
								}}
							>
								<b>Here</b>
							</Link>
						</span>
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
								// placeholder="Name"
								required
								className="accountInput"
								type="text"
								label="Name"
								onChange={handleChangeName}
								defaultValue={currentUser.user.username}
							/>
							<TextField
								// placeholder="Email"
								required
								className="accountInput"
								type="email"
								label="Email"
								onChange={handleChangeEmail}
								defaultValue={currentUser.user.email}
							/>
							<TextField
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
								required
								className="accountInput"
								type="password"
								minLength="6"
								label="verify password"
								// ref={verify}
								defaultValue={currentUser.user.password}
							/>
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
