import "./leftbar.css";

import Profiles from "../profiles/Profiles";
import { useEffect, useState } from "react";

import axios from "axios";
import { Box } from "@mui/material";

export default function Leftbar() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await axios.get("/users/all");
			setUsers(
				res.data.sort((u1, u2) => {
					return new Date(u2.createdAt) - new Date(u1.createdAt);
				})
			);
		};
		fetchUsers();
	}, []);
	return (
		<Box
			className="leftbarContainer"
			sx={{
				display: { xs: "none", md: "inherit" },
			}}
		>
			<div className="leftbarWrapper">
				{/* <ul className="leftbarList">
					<h4 className="leftbarTitle">Categories</h4>
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
				<hr className="leftbarHr" /> */}
				<h4 className="leftbarTitle">Profiles</h4>
				<ul className="leftbarFriendList">
					{users.map((u) => (
						<Profiles key={u.id} user={u} />
					))}
				</ul>
			</div>
		</Box>
	);
}
