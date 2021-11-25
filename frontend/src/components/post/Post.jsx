import "./post.css";
import { MoreVert } from "@mui/icons-material";
const Post = () => {
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<img
							className="postProfileImg"
							src="/assets/Profile/6.jpg"
							alt="Profile Pic"
						/>
						<span className="postUsername">Jimmy Butler</span>
						<span className="postDate">5 mins ago</span>
					</div>
					<div className="postTopRight">
						<MoreVert />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">
						This was a beautiful scene I just had to get this shot!
					</span>
					<img
						className="postImg"
						src="/assets/Posts/field-6574455_1920.jpg"
						alt="Field"
					/>
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img className="postIcon" src="/assets/like.png" alt="" />
						<span className="postReactionCounter">25</span>
						<img className="postIcon" src="/assets/love.png" alt="" />
						<span className="postReactionCounter">12</span>
						<img className="postIcon" src="/assets/haha.png" alt="" />
						<span className="postReactionCounter">1</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">9 Comments</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
