import { Box, ImageList, ImageListItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./rightbar.css";
export default function Rightbar({ user, username }) {
	const HomeRightbar = () => {
		// const PF = process.env.REACT_APP_PUBLIC_FOLDER;
		const [posts, setPosts] = useState([]);
		const PF = process.env.REACT_APP_PUBLIC_FOLDER;

		const [user, setUser] = useState({});
		useEffect(() => {
			const fetchUser = async () => {
				const res = await axios.get(`/users`, {
					params: { userId: user.userId },
				});
				setUser(res.data);
				console.log(res.data);
			};
			fetchUser();
		}, [user.userId]);
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
		}, []);

		return (
			<>
				<Box>
					<div className="birthdayContainer">
						<img className="birthdayImg" src="/assets/gift2.png" alt="" />
						<span className="birthdayText">
							<b>Vicki Smith</b> and <b>2 other people</b> have birthdays today.
						</span>
					</div>
					<div className="rightbarImgContainer">
						<span className="rightbarImgTitle">Latest Photos</span>
						<ImageList
							sx={{ width: 500, height: 450 }}
							cols={3}
							rowHeight={164}
						>
							{posts.map((item) => (
								<ImageListItem key={item.id}>
									<img
										src={
											PF + `${item.imageUrl}`
												? PF + `${item.imageUrl}`
												: PF + "Groupomania_Logos/icon-left-font.svg"
										}
										srcSet={
											PF + `${item.imageUrl}`
												? PF + `${item.imageUrl}`
												: PF + "Groupomania_Logos/icon-left-font.svg"
										}
										alt=""
										loading="lazy"
									/>
								</ImageListItem>
							))}
						</ImageList>
					</div>
				</Box>
			</>
		);
	};

	const ProfileRightbar = () => {
		return (
			<>
				<div className="rightbarContainer">
					<h4 className="rightbarTitle">User Information</h4>
					<div className="rightbarInfo">
						<div className="rightbarInfoItem">
							<span className="rightbarInfoKey">City:</span>
							<span className="rightbarInfoValue">{user.city}</span>
						</div>
						<div className="rightbarInfoItem">
							<span className="rightbarInfoKey">Hometown:</span>
							<span className="rightbarInfoValue">{user.from}</span>
						</div>
						<div className="rightbarInfoItem">
							<span className="rightbarInfoKey">Department:</span>
							<span className="rightbarInfoValue">{user.dept}</span>
						</div>
						<div className="rightbarInfoItem">
							<span className="rightbarInfoKey">Years at company:</span>
							<span className="rightbarInfoValue">{user.year}</span>
						</div>
					</div>
				</div>
			</>
		);
	};
	return (
		<Box
			className="rightbar"
			sx={{
				display: { xs: "none", md: "inherit" },
			}}
		>
			<div className="rightbarWrapper">
				{user ? <ProfileRightbar /> : <HomeRightbar />}
			</div>
		</Box>
	);
}
