import { ImageList, ImageListItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./rightbar.css";
export default function Rightbar({ user, username }) {
	const HomeRightbar = () => {
		// const PF = process.env.REACT_APP_PUBLIC_FOLDER;
		const [posts, setPosts] = useState([]);
		const PF = process.env.REACT_APP_PUBLIC_FOLDER;

		useEffect(() => {
			const fetchUser = async () => {
				const res = await axios.get(`/users`, {
					params: { userId: user.userId },
				});
				setUser(res.data);
				console.log(res.data);
			};
			fetchUser();
		}, []);
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
		const [user, setUser] = useState({});

		return (
			<>
				<div className="birthdayContainer">
					<img className="birthdayImg" src="/assets/gift2.png" alt="" />
					<span className="birthdayText">
						<b>Vicki Smith</b> and <b>2 other people</b> have birthdays today.
					</span>
				</div>
				<div className="rightbarImgContainer">
					<span className="rightbarImgTitle">Latest Photos</span>
					<ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
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
		<div className="rightbar">
			<div className="rightbarWrapper">
				{user ? <ProfileRightbar /> : <HomeRightbar />}
			</div>
		</div>
	);
}
const itemData = [
	{
		img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
		title: "Breakfast",
	},
	{
		img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
		title: "Burger",
	},
	{
		img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
		title: "Camera",
	},
	{
		img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
		title: "Coffee",
	},
	{
		img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
		title: "Hats",
	},
	{
		img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
		title: "Honey",
	},
	{
		img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
		title: "Basketball",
	},
	{
		img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
		title: "Fern",
	},
	{
		img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
		title: "Mushrooms",
	},
	{
		img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
		title: "Tomato basil",
	},
	{
		img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
		title: "Sea star",
	},
	{
		img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
		title: "Bike",
	},
];
