import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";

export default function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<>
			<Topbar />
			<div className="profile">
				<Leftbar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								className="profileCoverImg"
								src={`${PF}Posts/2.jpg`}
								alt=""
							/>
							<img
								className="profileUserImg"
								src={`${PF}Profile/2.jpg`}
								alt=""
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">Vicky Smith</h4>
							<span className="profileInfoDesc">
								Get to bag and nothing else.
							</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed />
						<Rightbar profile />
					</div>
				</div>
			</div>
		</>
	);
}
