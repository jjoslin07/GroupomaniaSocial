import "./follow.css";
import { Avatar } from "@mui/material";
const Follow = ({ user }) => {
	return (
		<div>
			<li className="rightbarFollow">
				<Avatar
					className="rightbarFollowImg"
					src={user.profilePicture}
					alt="Avatar Picture"
				/>
				<span className="rightbarFriendName">{user.username}</span>
			</li>
		</div>
	);
};

export default Follow;
