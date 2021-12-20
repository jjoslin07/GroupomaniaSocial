import { useContext, useEffect, useState } from "react";
import "./post.css";
import { AddAPhoto, Label, Mood, MoreVert, Send } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Comments from "../comments/Comments";

import {
	Avatar,
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	Select,
	TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
const Post = ({ post }) => {
	// Get current user under the Alias currentUser
	const { user: currentUser } = useContext(AuthContext);
	// Const to get JWT and put in Header
	const config = {
		headers: { Authorization: `Bearer ${currentUser.token}` },
	};
	// Delete
	const [del, setDel] = useState(false);

	const handleDelOpen = () => {
		setDel(true);
	};
	const handleDelClose = () => {
		setDel(false);
	};

	// Modify
	const [mod, setMod] = useState(false);
	const handleModOpen = () => {
		setMod(true);
	};
	const handleModClose = () => {
		setMod(false);
	};

	const commentText = useRef();

	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const deleteHandler = async (e) => {
		e.preventDefault();
		if (currentUser.user.id === post.userId) {
			try {
				await axios.delete("/posts/" + post.id, config);
				window.location.reload(false);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const newComment = {
			content: commentText.current.value,
		};
		try {
			await axios.post("/posts/" + post.id + "/comment", newComment, config);
			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};

	const [file, setFile] = useState(null);

	const editContent = useRef();
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
	useEffect(() => {
		fetchData2();
	}, []);

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
	}, []);
	const [imageUrl, setImageUrl] = useState(post.imageUrl);
	const updateSelectCategory = (e) => {
		setCategory(e.target.value);
	};
	const updateSelectMood = (e) => {
		setMood(e.target.value);
	};

	const editHandler = async (e) => {
		e.preventDefault();
		const updatePost = {
			userId: currentUser.user.id,
			content: editContent.current.value,
			categoryId: category ? category : "General",
			moodId: mood ? mood : "",
			imageUrl: imageUrl,
		};
		if (file) {
			const data = new FormData();
			const fileName = Date.now() + File.name;
			data.append("name", fileName);
			data.append("file", file);
			updatePost.imageUrl = fileName;
			try {
				await axios.post("/upload", data);
			} catch (error) {
				console.log(error);
			}
		}
		try {
			await axios.patch("/posts/" + post.id, updatePost, config);
			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};

	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchComments = async () => {
			const res = post.id
				? await axios.get("/posts/" + post.id + "/comment")
				: await axios.get("posts/" + post.id);

			setComments(
				res.data.Comments.sort((c1, c2) => {
					return new Date(c1.createdAt) - new Date(c2.createdAt);
				})
			);
		};
		fetchComments();
	}, [post]);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const [likes, setLike] = useState(post.likes);
	const [isLiked, setIsLiked] = useState(false);

	const likeHandler = () => {
		if (!isLiked) {
			try {
				axios.post(
					"/posts/" + post.id + "/like",
					{
						userId: currentUser.user.id,
					},
					config
				);
			} catch (error) {
				console.log(error);
			}
			setLike(isLiked ? likes - 1 : likes + 1);
			setIsLiked(!isLiked);
		} else {
			try {
				axios.delete("/posts/" + post.id + "/like", {
					headers: {
						Authorization: `Bearer ${currentUser.token}`,
					},
					userId: currentUser.user.id,
				});
			} catch (error) {
				console.log(error);
			}
			setLike(isLiked ? likes - 1 : likes + 1);
			setIsLiked(!isLiked);
		}
	};

	// const [loves, setLove] = useState(post.loves);
	// const [isLoved, setIsLoved] = useState(false);

	// const loveHandler = () => {
	// 	if (!isLoved) {
	// 		try {
	// 			axios.post(
	// 				"/posts/" + post.id + "/love",
	// 				{
	// 					userId: currentUser.user.id,
	// 				},
	// 				config
	// 			);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 		setLove(isLoved ? loves - 1 : loves + 1);
	// 		setIsLoved(!isLoved);
	// 	} else {
	// 		try {
	// 			axios.delete("/posts/" + post.id + "/love", {
	// 				headers: {
	// 					Authorization: `Bearer ${currentUser.token}`,
	// 				},
	// 				userId: currentUser.user.id,
	// 			});
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 		setLove(isLoved ? loves - 1 : loves + 1);
	// 		setIsLoved(!isLoved);
	// 	}
	// };

	// const [funny, setFunny] = useState(post.funny);
	// const [isFunny, setIsFunny] = useState(false);

	// const funnyHandler = () => {
	// 	setFunny(isFunny ? funny - 1 : funny + 1);
	// 	setIsFunny(!isFunny);
	// };

	const [user, setUser] = useState({});

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users`, {
				params: { userId: post.userId },
			});
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);

	return (
		<>
			<Box
				className="post"
				sx={{
					boxShadow: 2,
				}}
			>
				<div className="postWrapper">
					<div className="postTop">
						<div className="postTopLeft">
							<Link to={`/profile/${user.username}`}>
								<Avatar
									className="postProfileImg"
									src={PF + user.profilePicture}
									alt=""
								/>
							</Link>
							<span className="postUsername">{user.username}</span>
							<span className="postDate">{format(post.createdAt)}</span>
							<span className="postCategory">
								in <b>{post.categoryId}</b>
							</span>
							<span className="postMood">
								{post.moodId ? "feeling " : post.moodId}
								<b>{post.moodId ? post.moodId : post.moodId}</b>
							</span>
						</div>
						{post.userId === currentUser.user.id && (
							<div className="postTopRight">
								<div className="postMenuWrapper">
									<MoreVert
										id="basic-button"
										aria-controls="basic-menu"
										aria-haspopup="true"
										aria-expanded={open ? "true" : undefined}
										onClick={handleClick}
									></MoreVert>
									<Menu
										id="basic-menu"
										anchorEl={anchorEl}
										open={open}
										onClose={handleClose}
										MenuListProps={{
											"aria-labelledby": "basic-button",
										}}
									>
										<MenuItem onClick={handleDelOpen}>Delete</MenuItem>
										<Dialog
											open={del}
											onClose={handleDelClose}
											aria-labelledby="alert-dialog-title"
											aria-describedby="alert-dialog-description"
										>
											<DialogContent>
												<DialogContentText id="alert-dialog-description">
													Delete this post?
												</DialogContentText>
											</DialogContent>
											<DialogActions>
												<Button onClick={handleDelClose}>No</Button>
												<Button onClick={deleteHandler} autoFocus>
													Yes
												</Button>
											</DialogActions>
										</Dialog>

										<MenuItem onClick={handleModOpen}>Edit</MenuItem>

										<Dialog
											open={mod}
											onClose={handleModClose}
											aria-labelledby="alert-dialog-title"
											aria-describedby="alert-dialog-description"
										>
											<Box
												component="form"
												onSubmit={editHandler}
												sx={{
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													justifyContent: "center",
													textAlign: "center",
												}}
											>
												<DialogTitle>Edit your post</DialogTitle>
												<DialogContent>
													<TextareaAutosize
														maxRows={10}
														placeholder="Share something with us ..."
														className="postInput"
														ref={editContent}
														defaultValue={post.content}
														style={{
															width: "400px",
														}}
													/>
													<div
														className="postImgContainer"
														sx={{
															marginTop: 5,
														}}
													>
														<img
															src={PF + imageUrl}
															alt=""
															className="postImg"
															style={{
																maxHeight: "300px",
																width: "100%",
															}}
														/>

														{post.imageUrl && (
															<Button
																className="postCancelImg"
																onClick={() => setImageUrl(null)}
																sx={{
																	color: "red",
																}}
															>
																Remove
															</Button>
														)}
														{!post.imageUrl && (
															<label htmlFor="file" className="postOption">
																<AddAPhoto
																	className="postAddImg"
																	sx={{
																		marginTop: 2,
																		color: "green",
																	}}
																/>
																<input
																	style={{ display: "none" }}
																	type="file"
																	id="file"
																	accept=".png, .jpeg, .jpg"
																	onChange={(e) => setFile(e.target.files[0])}
																	name="image"
																/>
															</label>
														)}
														<label htmlFor="category" className="publishOption">
															<div>
																<FormControl
																	variant="standard"
																	sx={{ m: 1, minWidth: 120 }}
																>
																	<InputLabel id="category">
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
																	<Select
																		sx={{
																			margin: 1.5,
																		}}
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
													</div>
												</DialogContent>
												<DialogActions>
													<Button onClick={handleModClose}>Cancel</Button>
													<Button type="submit">Save</Button>
												</DialogActions>
											</Box>
										</Dialog>
									</Menu>
								</div>
							</div>
						)}
					</div>
					<div id="content" className="postCenter">
						<span id="edit" className="postText">
							{post?.content}
						</span>
						<img className="postImg" src={PF + post?.imageUrl} alt="" />
					</div>

					<div className="postBottom">
						<div className="postBottomLeft">
							<img
								className="postIcon"
								src={`${PF}like.png`}
								onClick={likeHandler}
								alt=""
							/>
							<span className="postReactionCounter">{likes}</span>
							{/* <img
								className="postIcon"
								src={`${PF}love.png`}
								onClick={loveHandler}
								alt=""
							/>
							<span className="postReactionCounter">{loves}</span>
							<img
								className="postIcon"
								src={`${PF}haha.png`}
								onClick={funnyHandler}
								alt=""
							/>
							<span className="postReactionCounter">{funny}</span> */}
						</div>
						<div className="postBottomRight">
							<span className="postCommentText">
								{(comments.length === 0 && comments.length + " Comments") ||
									(comments.length === 1 && comments.length + " Comment") ||
									comments.length + " Comments"}
							</span>
						</div>
					</div>
				</div>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<hr className="postHr" />
				</Box>

				<Box
					className="commentSection"
					sx={{
						width: "100%",
					}}
				></Box>
				{comments.map((c) => (
					<Comments key={c.id} comment={c} />
				))}
				<Box
					component="form"
					onSubmit={submitHandler}
					className="commentInput"
					sx={{
						display: "flex",
						position: "relative",
					}}
				>
					<TextareaAutosize
						maxRows={4}
						placeholder="Leave a comment ... "
						className="commentInput"
						ref={commentText}
					/>
					<IconButton
						className="commentSend"
						type="submit"
						sx={{
							position: "relative",
							left: "-20px",
							color: "#3690FF",
						}}
					>
						<Send />
					</IconButton>
				</Box>
			</Box>
		</>
	);
};

export default Post;
