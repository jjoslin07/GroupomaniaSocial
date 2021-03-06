import "./publish.css";
import {
	Label,
	CancelPresentationOutlined,
	AddAPhoto,
	Mood,
} from "@mui/icons-material";
import { TextareaAutosize } from "@mui/core";
import {
	Avatar,
	Box,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";
export default function Publish() {
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState([]);

	const [mood, setMood] = useState("");
	const [moods, setMoods] = useState([]);

	async function fetchData2() {
		try {
			const moodData = await axios.get("/posts/mood/all");
			setMoods(moodData.data.map((moo) => moo.name));
		} catch (error) {
			console.log(error);
		}
	}

	async function fetchData() {
		try {
			const categoryData = await axios.get(`/posts/category/all`);
			setCategories(categoryData.data.map((cat) => cat.name));
		} catch (e) {
			console.error(e);
		}
	}

	useEffect(() => {
		fetchData();
		fetchData2();
	}, []);
	const updateSelectCategory = (e) => {
		setCategory(e.target.value);
	};
	const updateSelectMood = (e) => {
		setMood(e.target.value);
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
			moodId: mood ? mood : "--",
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
		<Container
			className="publishContainer"
			sx={{
				boxShadow: 2,
			}}
		>
			<div className="publishWrapper">
				<div className="publishTop">
					<Avatar
						className="publishProfileImg"
						src={PF + user.user.profile_picture}
						alt=""
					/>
					<TextareaAutosize
						maxRows={10}
						placeholder="Share something with us ... "
						className="publishInput"
						// style={{ width: "100%" }}
						ref={content}
					/>
				</div>
				<hr className="publishHr" />
				{file && (
					<div className="publishImgContainer">
						<img
							src={URL.createObjectURL(file)}
							alt=""
							className="publishImg"
						/>
						<CancelPresentationOutlined
							className="publishCancelImg"
							onClick={() => setFile(null)}
						/>
					</div>
				)}
				<Box
					component="form"
					className="publishBottom"
					onSubmit={submitHandler}
					sx={{
						display: "flex",
						alignItems: "center",
						padding: 1,
						justifyContent: { xs: "center", md: "space-between" },
					}}
				>
					<Box
						sx={{
							flexDirection: { xs: "column", sm: "row" },
						}}
						className="publishOptions"
					>
						<label htmlFor="file" className="publishOption">
							<AddAPhoto className="publishIcon" style={{ color: "green" }} />
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
							<div>
								<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
									<InputLabel sx={{}} id="category">
										Category
									</InputLabel>
									<Select
										sx={{ margin: 1.5 }}
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
						<label htmlFor="mood" className="publishOption">
							<div>
								<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
									<InputLabel id="mood">Mood</InputLabel>
									<Select
										sx={{ margin: 1.5 }}
										labelId="mood"
										className="dropDownMenu"
										IconComponent={Mood}
										onChange={updateSelectMood}
										value={mood}
										label="Mood"
									>
										{moods.map((item) => (
											<MenuItem key={item} value={item}>
												{item}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
						</label>
					</Box>
					<button className="publishButton" type="submit">
						{" "}
						Publish
					</button>
				</Box>
			</div>
		</Container>
	);
}
