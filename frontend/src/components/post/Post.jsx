import { useState } from "react";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../demoData";
import { Avatar } from "@mui/material";

const Post = ({ post }) => {
	const [likes, setLike] = useState(post.likes);
	const [isLiked, setIsLiked] = useState(false);

	const likeHandler = () => {
		setLike(isLiked ? likes - 1 : likes + 1);
		setIsLiked(!isLiked);
	};
	const [loves, setLove] = useState(post.loves);
	const [isLoved, setIsLoved] = useState(false);

	const loveHandler = () => {
		setLove(isLoved ? loves - 1 : loves + 1);
		setIsLoved(!isLoved);
	};
	const [funny, setFunny] = useState(post.funny);
	const [isFunny, setIsFunny] = useState(false);

	const funnyHandler = () => {
		setFunny(isFunny ? funny - 1 : funny + 1);
		setIsFunny(!isFunny);
	};

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
						<img
							className="postIcon"
							src="/assets/like.png"
							onClick={likeHandler}
							alt=""
						/>
						<span className="postReactionCounter">{likes}</span>
						<img
							className="postIcon"
							src="/assets/love.png"
							onClick={loveHandler}
							alt=""
						/>
						<span className="postReactionCounter">{loves}</span>
						<img
							className="postIcon"
							src="/assets/haha.png"
							onClick={funnyHandler}
							alt=""
						/>
						<span className="postReactionCounter">{funny}</span>
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
