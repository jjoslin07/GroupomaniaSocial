import "./publish.css";
import { PermMedia, Room, EmojiEmotions, Label } from "@mui/icons-material";
import { TextareaAutosize } from "@mui/core";
import {
	Avatar,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { SelectCategory } from "../category/SelectCategory";

import axios from "axios";

export default function Publish() {
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		try {
			const data = await axios.get(`/posts/category/all`);
			setCategories(data.data.map((cat) => cat.name));
		} catch (e) {
			console.error(e);
		}
	}

	const updateSelectCategory = (e) => {
		setCategory(e.target.value);
	};
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const { user } = useContext(AuthContext);
	const content = useRef();

	const [file, setFile] = useState(null);
	const config = {
		headers: { Authorization: `Bearer ${user.token}` },
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const newPost = {
			userId: user.user.id,
			content: content.current.value,
			categoryId: category ? category : "General",
		};
		if (file) {
			const data = new FormData();
			const fileName = Date.now() + file.name;
			data.append("name", fileName);
			data.append("file", file);
			newPost.imageUrl = fileName;
			try {
				await axios.post("/upload", data);
			} catch (error) {
				console.log(error);
			}
		}
		try {
			await axios.post("/posts", newPost, config);
			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="publishContainer">
			<div className="publishWrapper">
				<div className="publishTop">
					<Avatar
						className="publishProfileImg"
						src={PF + user.user.profilePicture}
						alt=""
					/>
					<TextareaAutosize
						maxRows={4}
						placeholder="Share something with us ... "
						className="publishInput"
						style={{ width: "100%" }}
						ref={content}
					/>
				</div>
				<hr className="publishHr" />
				<form className="publishBottom" onSubmit={submitHandler}>
					<div className="publishOptions">
						<label htmlFor="file" className="publishOption">
							<PermMedia className="publishIcon" style={{ color: "green" }} />
							<span className="publishOptionText">Photo</span>
							<input
								style={{ display: "none" }}
								type="file"
								id="file"
								accept=".png,.jpeg,.jpg"
								onChange={(e) => setFile(e.target.files[0])}
								name="image"
							/>
						</label>
						<label htmlFor="category" className="publishOption">
							{/* <SelectCategory /> */}
							<div>
								<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
									<InputLabel id="category">Category</InputLabel>
									<Select
										style={{ margin: 15, color: "primary" }}
										labelId="category"
										className="dropDownMenu"
										IconComponent={Label}
										onChange={updateSelectCategory}
										value={category}
										label="Category"
									>
										{categories.map((item) => (
											<MenuItem key={item} value={item}>
												{item}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
						</label>
						<div className="publishOption">
							<Room className="publishIcon" style={{ color: "red" }} />
							<span className="publishOptionText">Location</span>
						</div>
						<div className="publishOption">
							<EmojiEmotions
								className="publishIcon"
								style={{ color: "orange" }}
							/>
							<span className="publishOptionText">Mood</span>
						</div>
					</div>
					<button className="publishButton" type="submit">
						{" "}
						Publish
					</button>
				</form>
			</div>
		</div>
	);
}
