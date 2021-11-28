import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../demoData";
import { Avatar } from "@mui/material";

const Post = ({ post }) => {
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Avatar
							className="postProfileImg"
							src={Users.filter((u) => u.id === post.userId)[0].profilePicture}
							alt="Profile Pic"
						/>
						<span className="postUsername">
							{Users.filter((u) => u.id === post.userId)[0].username}
						</span>
						<span className="postDate">{post.date}</span>
					</div>
					<div className="postTopRight">
						<MoreVert className="postMore" />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post?.desc}</span>
					<img className="postImg" src={post?.photo} alt="Field" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img className="postIcon" src="/assets/like.png" alt="" />
						<span className="postReactionCounter">{post.likes}</span>
						<img className="postIcon" src="/assets/love.png" alt="" />
						<span className="postReactionCounter">{post.loves}</span>
						<img className="postIcon" src="/assets/haha.png" alt="" />
						<span className="postReactionCounter">{post.funny}</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">{post.comment} Comments</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
