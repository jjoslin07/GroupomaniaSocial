import "./follow.css";
import { Avatar } from "@mui/material";
const Follow = ({ user }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div>
			<li className="rightbarFollow">
				<Avatar
					className="rightbarFollowImg"
					src={PF + user.profile_picture}
					alt="Avatar Picture"
				/>
				<span className="rightbarFriendName">{user.username}</span>
			</li>
		</div>
	);
};

export default Follow;
