import "./profiles.css";
import { Avatar } from "@mui/material";
const Profiles = ({ user }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div>
			<a href={`/profile/${user.username}`}>
				<div className="leftbarFriend">
					<Avatar
						className="leftbarFriendImg"
						src={PF + user.profile_picture}
						alt=""
					/>
					<span className="leftbarFriendName">{user.display_name}</span>
				</div>
			</a>
		</div>
	);
};

export default Profiles;
