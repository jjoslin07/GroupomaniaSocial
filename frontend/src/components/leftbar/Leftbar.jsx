import "./leftbar.css";
import {
	RssFeed,
	Bookmarks,
	Event,
	School,
	WorkOutline,
	PeopleAlt,
	EmojiPeople,
	EmojiEmotions,
	EmojiObjects,
	DirectionsCar,
	MarkunreadMailboxOutlined,
} from "@mui/icons-material";
export default function Leftbar() {
	return (
		<div className="leftbarContainer">
			<div className="leftbarWrapper">
				<ul className="leftbarList">
					<div className="leftbarTitle">Categories</div>
					<li className="leftbarListItem">
						<MarkunreadMailboxOutlined className="leftbarIcon" />
						<span className="leftbarListItemText">Unread Posts</span>
					</li>
					<li className="leftbarListItem">
						<RssFeed className="leftbarIcon" />
						<span className="leftbarListItemText">Feed</span>
					</li>
					<li className="leftbarListItem">
						<Bookmarks className="leftbarIcon" />
						<span className="leftbarListItemText">Bookmarks</span>
					</li>
					<li className="leftbarListItem">
						<EmojiPeople className="leftbarIcon" />
						<span className="leftbarListItemText">Questions</span>
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
					<li className="leftbarListItem">
						<EmojiEmotions className="leftbarIcon" />
						<span className="leftbarListItemText">For Laughs</span>
					</li>
					<li className="leftbarListItem">
						<PeopleAlt className="leftbarIcon" />
						<span className="leftbarListItemText">New People</span>
					</li>
					<li className="leftbarListItem">
						<EmojiObjects className="leftbarIcon" />
						<span className="leftbarListItemText">Ideas</span>
					</li>
					<li className="leftbarListItem">
						<DirectionsCar className="leftbarIcon" />
						<span className="leftbarListItemText">Carpool</span>
					</li>
				</ul>
				<hr className="leftbarHr" />
				<div className="leftbarTitle">Profiles</div>
				<ul className="leftbarFriendList">
					<li className="leftbarFriend">
						<img
							className="leftbarFriendImg"
							src="/assets/Profile/2.jpg"
							alt=""
						/>
						<span className="leftbarFriendName">Vicki Smith</span>
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
						<span className="leftbarFriendName"> James Doe</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
