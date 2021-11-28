import "./rightbar.css";
import { Users } from "../../demoData";
import Online from "../online/Online";
export default function Rightbar() {
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
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
			</div>
		</div>
	);
}
