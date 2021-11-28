import "./profiles.css";
import { Avatar } from "@mui/material";
const Profiles = ({ user }) => {
	return (
		<div>
			<li className="leftbarFriend">
				<Avatar
					className="leftbarFriendImg"
					src={user.profilePicture}
					alt="Avatar Picture"
				/>
				<span className="leftbarFriendName">{user.username}</span>
			</li>
		</div>
	);
};

export default Profiles;
