import { useContext, useEffect, useState } from "react";
import "./post.css";
import { MoreVert } from "@mui/icons-material";

import { Avatar } from "@mui/material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Post = ({ post }) => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [likes, setLike] = useState(post.likes);
	const [isLiked, setIsLiked] = useState(false);
	const { user: currentUser } = useContext(AuthContext);
	const config = {
		headers: { Authorization: `Bearer ${currentUser.token}` },
	};

	const likeHandler = () => {
		try {
			axios.post(
				"/posts/" + post.id + "/like",
				{
					userId: currentUser.user.id,
				},
				config
			);
		} catch (error) {}
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

	const [user, setUser] = useState({});

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users`, {
				params: { userId: post.userId },
			});
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`/profile/${user.username}`}>
							<Avatar
								className="postProfileImg"
								src={PF + user.profilePicture}
								alt=""
							/>
						</Link>
						<span className="postUsername">{user.username}</span>
						<span className="postDate">{format(post.createdAt)}</span>
					</div>
					<div className="postTopRight">
						<MoreVert className="postMore" />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post?.content}</span>
					<img className="postImg" src={PF + post?.imageUrl} alt="" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img
							className="postIcon"
							src={`${PF}like.png`}
							onClick={likeHandler}
							alt=""
						/>
						<span className="postReactionCounter">{likes}</span>
						<img
							className="postIcon"
							src={`${PF}love.png`}
							onClick={loveHandler}
							alt=""
						/>
						<span className="postReactionCounter">{loves}</span>
						<img
							className="postIcon"
							src={`${PF}haha.png`}
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
