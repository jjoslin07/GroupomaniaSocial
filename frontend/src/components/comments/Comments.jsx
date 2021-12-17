import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import "./comments.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Comments = ({ user }) => {
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
					{user.content}
				</Box>
			</div>
		</>
	);
};

export default Comments;
