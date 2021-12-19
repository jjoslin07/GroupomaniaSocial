import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

import "./comments.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Comments = ({ comment }) => {
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
	return (
		<>
			<div>
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
						src={PF + user.profilePicture}
					></Avatar>
					<span className="postCommentName"> {user.username}</span>
					<span className="commentDate">{format(comment.createdAt)}</span>
				</Box>

				<Box
					className="postCommentDesc"
					sx={{
						backgroundColor: "#EEEEEE",
						p: 2,
						m: 2,
						borderRadius: 2,
					}}
				>
					{comment.content}
				</Box>
			</div>
		</>
	);
};

export default Comments;
