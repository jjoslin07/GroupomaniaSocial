import "./online.css";
import { Avatar } from "@mui/material";

export default function Online({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div>
			<li className="rightbarProfile">
				<div className="rightbarProfileImgContainer">
					<Avatar alt="Avatar Picture" src={PF + user.profile_picture} />
				</div>
				<span className="rightbarUsername">{user.username}</span>
			</li>
		</div>
	);
}
