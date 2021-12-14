import "./rightbar.css";
export default function Rightbar({ user }) {
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
						<span className="rightbarInfoValue">{user.city}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Hometown:</span>
						<span className="rightbarInfoValue">{user.from}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Department:</span>
						<span className="rightbarInfoValue">{user.dept}</span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Years at company:</span>
						<span className="rightbarInfoValue">{user.year}</span>
					</div>
				</div>
			</>
		);
	};
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{user ? <ProfileRightbar /> : <HomeRightbar />}
			</div>
		</div>
	);
}
