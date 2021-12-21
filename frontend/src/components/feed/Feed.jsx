import "./feed.css";
import Publish from "../publish/Publish";
import Post from "../post/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Box, Container } from "@mui/material";

export default function Feed({ username }) {
	const [posts, setPosts] = useState([]);
	const { user } = useContext(AuthContext);
	useEffect(() => {
		const fetchPosts = async () => {
			const res = username
				? await axios.get("/posts/profile/" + username)
				: await axios.get("posts/");

			setPosts(
				res.data.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				})
			);
		};
		fetchPosts();
	}, [username]);

	return (
		<>
			<Container
				className="feedContainer"
				sx={{
					padding: { lg: 5 },
				}}
			>
				<Box className="feedWrapper">
					{(!username || username === user.user.username) && <Publish />}
					{posts.map((p) => (
						<Post key={p.id} post={p} />
					))}
				</Box>
			</Container>
		</>
	);
}
