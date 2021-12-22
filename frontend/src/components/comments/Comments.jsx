import { MoreVert } from "@mui/icons-material";
import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Menu,
	MenuItem,
	TextareaAutosize,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

import "./comments.css";

const Comments = ({ comment }) => {
	// Get current user under the Alias currentUser
	const { user: currentUser } = useContext(AuthContext);
	// Const to get JWT and put in Header
	const config = {
		headers: { Authorization: `Bearer ${currentUser.token}` },
	};
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);

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

	const editContent = useRef();
	const [user, setUser] = useState({});

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users`, {
				params: { userId: comment.userId },
			});
			setUser(res.data);
		};
		fetchUser();
	}, [comment.userId]);
	const deleteHandler = async (e) => {
		e.preventDefault();
		if (currentUser.user.id === comment.userId) {
			try {
				await axios.delete(
					"/posts/" + comment.postId + "/comment/" + comment.id,
					config
				);
				window.location.reload(false);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const editHandler = async (e) => {
		e.preventDefault();
		const updatePost = {
			userId: currentUser.user.id,
			content: editContent.current.value,
		};
		try {
			await axios.patch(
				"/posts/" + comment.postId + "/comment/" + comment.id,
				updatePost,
				config
			);
			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Box>
				<Box
					className="postCommentUser"
					sx={{
						display: "flex",
						margin: "10px 20px",
						alignItems: "center",
					}}
				>
					<Avatar
						className="postCommentImg"
						src={PF + user.profile_picture}
					></Avatar>
					<span className="postCommentName"> {user.display_name}</span>
					<span className="commentDate">{format(comment.createdAt)}</span>
				</Box>

				<Box
					sx={{
						display: "flex",
						width: "100%",
						alignItems: "center",
					}}
				>
					<Box
						className="postCommentDesc"
						sx={{
							backgroundColor: "#EEEEEE",
							p: 2,
							m: 2,
							borderRadius: 2,
							overflowWrap: "anywhere",
							whiteSpace: "pre-wrap",
						}}
					>
						{comment.content}
					</Box>
					{comment.userId === currentUser.user.id && (
						<Box className="postMenuWrapper">
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
											Delete this comment?
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
										<DialogTitle>Edit</DialogTitle>
										<DialogContent>
											<TextareaAutosize
												maxRows={10}
												placeholder="Leave a comment ..."
												className="commentInput"
												ref={editContent}
												defaultValue={comment.content}
												style={{
													width: "400px",
													outline: "1px solid black",
													margin: 2,
													padding: 2,
												}}
											/>
										</DialogContent>
										<DialogActions>
											<Button onClick={handleModClose}>Cancel</Button>
											<Button type="submit">Save</Button>
										</DialogActions>
									</Box>
								</Dialog>
							</Menu>
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Comments;
