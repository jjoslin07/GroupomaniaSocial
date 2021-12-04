import "./feed.css";
import Publish from "../publish/Publish";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed() {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get("posts/");
			setPosts(res.data);
		};
		fetchPosts();
	}, []);

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
