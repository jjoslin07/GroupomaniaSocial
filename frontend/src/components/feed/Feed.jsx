import "./feed.css";
import Publish from "../publish/Publish";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed({ username }) {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const res = username
				? await axios.get("/posts/profile/" + username)
				: await axios.get("posts/");
			setPosts(res.data);
		};
		fetchPosts();
	}, [username]);

	return (
		<div className="feedContainer">
			<div className="feedWrapper">
				<Publish />
				{posts.map((p) => (
					<Post key={p.id} post={p} />
				))}
			</div>
		</div>
	);
}
