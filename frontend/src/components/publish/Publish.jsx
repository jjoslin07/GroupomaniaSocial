import "./publish.css";
import { PermMedia, Room, EmojiEmotions } from "@mui/icons-material";
import { TextareaAutosize } from "@mui/core";
import { Avatar } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SelectCategory } from "../category/SelectCategory";
import axios from "axios";

export default function Publish() {
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
			categoryId: 1,
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
							{/* <Label className="publishIcon" style={{ color: "blue" }} /> */}
							<SelectCategory />
							{/* <span className="publishOptionText">Category</span> */}
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
