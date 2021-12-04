import "./rightbar.css";
import { Users } from "../../demoData";
import { AvatarGroup } from "@mui/material";
import Follow from "../follow/Follow";
export default function Rightbar({ profile }) {
	const HomeRightbar = () => {
		// const PF = process.env.REACT_APP_PUBLIC_FOLDER;

		return (
			<>
				<div className="birthdayContainer">
					<img className="birthdayImg" src="/assets/gift2.png" alt="" />
					<span className="birthdayText">
						<b>Vicki Smith</b> and <b>2 other people</b> have birthdays today.
					</span>
				</div>
				{/* <h4 className="rightbarTitle">Followers</h4>
				<AvatarGroup className="rightbarFollowing">
					{Users.map((u) => (
						<Follow key={u.id} user={u} />
					))}
				</AvatarGroup>
				<h4 className="rightbarTitle">Following</h4>
				<AvatarGroup className="rightbarFollowing">
					{Users.map((u) => (
						<Follow key={u.id} user={u} />
					))}
				</AvatarGroup> */}
			</>
		);
	};

	const ProfileRightbar = () => {
		return (
			<>
				<h4 className="rightbarTitle">User Information</h4>
				<div className="rightbarInfo">
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">City:</span>
						<span className="rightbarInfoValue">Los Angeles</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Hometown:</span>
						<span className="rightbarInfoValue">Chicago</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Department:</span>
						<span className="rightbarInfoValue">Design</span>
					</div>
				</div>
				<h4 className="rightbarTitle">Followers</h4>
				<AvatarGroup className="rightbarFollowing">
					{Users.map((u) => (
						<Follow key={u.id} user={u} />
					))}
				</AvatarGroup>
				<h4 className="rightbarTitle">Following</h4>
				<AvatarGroup className="rightbarFollowing">
					{Users.map((u) => (
						<Follow key={u.id} user={u} />
					))}
				</AvatarGroup>
			</>
		);
	};
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{profile ? <ProfileRightbar /> : <HomeRightbar />}
			</div>
		</div>
	);
}
