import "./rightbar.css";
import { Users } from "../../demoData";
import Online from "../online/Online";
export default function Rightbar({ profile }) {
	const HomeRightbar = () => {
		return (
			<>
				<div className="birthdayContainer">
					<img className="birthdayImg" src="/assets/gift2.png" alt="" />
					<span className="birthdayText">
						<b>Vicki Smith</b> and <b>2 other people</b> have birthdays today.
					</span>
				</div>
				<h4 className="rightbarTitle">People Online</h4>
				<ul className="rightbarProfileList">
					{Users.map((u) => (
						<Online key={u.id} user={u} />
					))}
				</ul>
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
				<h4 className="rightbarTitle">Friends</h4>
				<div className="rightbarFollowings">
					<div className="rightbarFollowing">
						<img
							className="rightbarFollowingImg"
							src="/assets/Profile/6.jpg"
							alt=""
						/>
						<span className="rightbarFollowingName">Jimmy Butler</span>
					</div>
					<div className="rightbarFollowing">
						<img
							className="rightbarFollowingImg"
							src="/assets/Profile/5.jpg"
							alt=""
						/>
						<span className="rightbarFollowingName">Jimmy Butler</span>
					</div>
					<div className="rightbarFollowing">
						<img
							className="rightbarFollowingImg"
							src="/assets/Profile/4.jpg"
							alt=""
						/>
						<span className="rightbarFollowingName">Jimmy Butler</span>
					</div>
					<div className="rightbarFollowing">
						<img
							className="rightbarFollowingImg"
							src="/assets/Profile/9.jpg"
							alt=""
						/>
						<span className="rightbarFollowingName">Jimmy Butler</span>
					</div>
					<div className="rightbarFollowing">
						<img
							className="rightbarFollowingImg"
							src="/assets/Profile/8.jpg"
							alt=""
						/>
						<span className="rightbarFollowingName">Jimmy Butler</span>
					</div>
					<div className="rightbarFollowing">
						<img
							className="rightbarFollowingImg"
							src="/assets/Profile/10.jpg"
							alt=""
						/>
						<span className="rightbarFollowingName">Jimmy Butler</span>
					</div>
				</div>
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
