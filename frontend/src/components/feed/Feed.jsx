import "./feed.css";
import Publish from "../publish/Publish";
import Post from "../post/Post";

export default function Feed() {
	return (
		<div className="feedContainer">
			<div className="feedWrapper">
				<Publish />
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
		</div>
	);
}
