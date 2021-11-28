import "./feed.css";
import Publish from "../publish/Publish";
import Post from "../post/Post";
import { Posts } from "../../demoData";

export default function Feed() {
	return (
		<div className="feedContainer">
			<div className="feedWrapper">
				<Publish />
				{Posts.map((p) => (
					<Post key={p.id} post={p} />
				))}
			</div>
		</div>
	);
}
