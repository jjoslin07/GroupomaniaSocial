import { useContext, useEffect, useState } from "react";
import "./post.css";
import { MoreVert, Send } from "@mui/icons-material";
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
	IconButton,
	TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
const Post = ({ post }) => {
	const { user: currentUser } = useContext(AuthContext);
	const config = {
		headers: { Authorization: `Bearer ${currentUser.token}` },
	};
	const [open2, setOpen2] = useState(false);

	const handleClickOpen = () => {
		setOpen2(true);
	};
	const content = useRef();
	const handleClose2 = () => {
		setOpen2(false);
	};
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
			content: content.current.value,
		};
		try {
			await axios.post("/posts/" + post.id + "/comment", newComment, config);
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
					console.log(res);
					return new Date(c1.createdAt) - new Date(c2.createdAt);
				})
			);
		};
		fetchComments();
	}, [post]);

	// console.log(comments.map((comment) => comment.content));

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	const [likes, setLike] = useState(post.likes);
	const [isLiked, setIsLiked] = useState(false);
	// const getReaction = async () => {
	// 	await axios.get("/posts/" + post.id + "/reactions");
	// };
	const likeHandler = () => {
		try {
			axios.post(
				"/posts/" + post.id + "/like",
				{
					userId: currentUser.user.id,
				},
				config
			);
		} catch (error) {}
		setLike(isLiked ? likes - 1 : likes + 1);
		setIsLiked(!isLiked);
	};
	const [loves, setLove] = useState(post.loves);
	const [isLoved, setIsLoved] = useState(false);

	const loveHandler = () => {
		setLove(isLoved ? loves - 1 : loves + 1);
		setIsLoved(!isLoved);
	};
	const [funny, setFunny] = useState(post.funny);
	const [isFunny, setIsFunny] = useState(false);

	const funnyHandler = () => {
		setFunny(isFunny ? funny - 1 : funny + 1);
		setIsFunny(!isFunny);
	};

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
			{/* {comments.map((c) => c)}; */}
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
							<span className="postCategory">in {post.categoryId}</span>
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
										<MenuItem onClick={handleClickOpen}>Delete</MenuItem>
										<Dialog
											open={open2}
											onClose={handleClose2}
											aria-labelledby="alert-dialog-title"
											aria-describedby="alert-dialog-description"
										>
											<DialogContent>
												<DialogContentText id="alert-dialog-description">
													Delete this post?
												</DialogContentText>
											</DialogContent>
											<DialogActions>
												<Button onClick={handleClose2}>No</Button>
												<Button onClick={deleteHandler} autoFocus>
													Yes
												</Button>
											</DialogActions>
										</Dialog>

										<MenuItem>Modify</MenuItem>
									</Menu>
								</div>
							</div>
						)}
					</div>
					<div className="postCenter">
						<span className="postText">{post?.content}</span>
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
							<img
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
							<span className="postReactionCounter">{funny}</span>
						</div>
						<div className="postBottomRight">
							<span className="postCommentText">{post.comment} Comments</span>
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
						ref={content}
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
