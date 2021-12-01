import "./online.css";
import { Avatar } from "@mui/material";

export default function Online({ user }) {
	return (
		<div>
			<li className="rightbarProfile">
				<div className="rightbarProfileImgContainer">
					<Avatar alt="Avatar Picture" src={user.profilePicture} />
				</div>
				<span className="rightbarUsername">{user.username}</span>
			</li>
		</div>
	);
}
