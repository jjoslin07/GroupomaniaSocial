import "./profiles.css";
import { Avatar } from "@mui/material";
const Profiles = ({ user }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div>
			<li className="leftbarFriend">
				<Avatar
					className="leftbarFriendImg"
					src={PF + user.profilePicture}
					alt="Avatar Picture"
				/>
				<span className="leftbarFriendName">{user.username}</span>
			</li>
		</div>
	);
};

export default Profiles;
