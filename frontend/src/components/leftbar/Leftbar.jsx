import "./leftbar.css";
import {
	RssFeed,
	Chat,
	Groups,
	VideoCall,
	Bookmarks,
	LiveHelp,
	Event,
	School,
	WorkOutline,
} from "@mui/icons-material";
export default function Leftbar() {
	return (
		<div className="leftbar">
			<div className="leftbarWrapper">
				<ul className="leftbarList">
					<li className="leftbarListItem">
						<RssFeed className="leftbarIcon" />
						<span className="leftbarListItemText">Feed</span>
					</li>
					<li className="leftbarListItem">
						<Chat className="leftbarIcon" />
						<span className="leftbarListItemText">Chats</span>
					</li>
					<li className="leftbarListItem">
						<VideoCall className="leftbarIcon" />
						<span className="leftbarListItemText">Video Call</span>
					</li>
					<li className="leftbarListItem">
						<Groups className="leftbarIcon" />
						<span className="leftbarListItemText">Groups</span>
					</li>
					<li className="leftbarListItem">
						<Bookmarks className="leftbarIcon" />
						<span className="leftbarListItemText">Bookmarks</span>
					</li>
					<li className="leftbarListItem">
						<LiveHelp className="leftbarIcon" />
						<span className="leftbarListItemText">Live Help</span>
					</li>
					<li className="leftbarListItem">
						<Event className="leftbarIcon" />
						<span className="leftbarListItemText">Events</span>
					</li>
					<li className="leftbarListItem">
						<School className="leftbarIcon" />
						<span className="leftbarListItemText">Learning</span>
					</li>
					<li className="leftbarListItem">
						<WorkOutline className="leftbarIcon" />
						<span className="leftbarListItemText">Job Openings</span>
					</li>
				</ul>
				<button className="leftbarButton">Show More</button>
				<hr className="leftbarHr" />
				<ul className="leftbarFriendList">
					<li className="leftbarFriend">
						<img
							className="leftbarFriendImg"
							src="/assets/Profile/2.jpg"
							alt=""
						/>
						<span className="leftbarFriendName">Jill Smith</span>
					</li>
					<li className="leftbarFriend">
						<img
							className="leftbarFriendImg"
							src="/assets/Profile/7.jpg"
							alt=""
						/>
						<span className="leftbarFriendName">Jason Michael Thomas</span>
					</li>
					<li className="leftbarFriend">
						<img
							className="leftbarFriendImg"
							src="/assets/Profile/10.jpg"
							alt=""
						/>
						<span className="leftbarFriendName">Jim Cauldwell</span>
					</li>
					<li className="leftbarFriend">
						<img
							className="leftbarFriendImg"
							src="/assets/Profile/1.jpg"
							alt=""
						/>
						<span className="leftbarFriendName">Fanny Rodriguez</span>
					</li>
					<li className="leftbarFriend">
						<img
							className="leftbarFriendImg"
							src="/assets/Profile/4.jpg"
							alt=""
						/>
						<span className="leftbarFriendName">Khloe Buttons</span>
					</li>
					<li className="leftbarFriend">
						<img
							className="leftbarFriendImg"
							src="/assets/Profile/female.png"
							alt=""
						/>
						<span className="leftbarFriendName"> Jane Doe</span>
					</li>
					<li className="leftbarFriend">
						<img
							className="leftbarFriendImg"
							src="/assets/Profile/male.png"
							alt=""
						/>
						<span className="leftbarFriendName"> John Doe</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
