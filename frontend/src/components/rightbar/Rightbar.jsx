import "./rightbar.css";
export default function Rightbar() {
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				<div className="birthdayContainer">
					<img className="birthdayImg" src="/assets/gift.png" alt="" />
					<span className="birthdayText">
						<b>Vicki Smith</b> and <b>2 other people</b> have birthdays today.
					</span>
				</div>
				<h4 className="rightbarTitle">People Online</h4>
				<ul className="rightbarProfileList">
					<li className="rightbarProfile">
						<div className="rightbarProfileImgContainer">
							<img
								className="rightbarProfileImg"
								src="/assets/Profile/2.jpg"
								alt=""
							/>
							<span className="rightbarOnline"></span>
						</div>
						<span className="rightbarUsername"> Vicki Smith</span>
					</li>
					<li className="rightbarProfile">
						<div className="rightbarProfileImgContainer">
							<img
								className="rightbarProfileImg"
								src="/assets/Profile/7.jpg"
								alt=""
							/>
							<span className="rightbarOnline"></span>
						</div>
						<span className="rightbarUsername"> Jason Michael Thomas</span>
					</li>
					<li className="rightbarProfile">
						<div className="rightbarProfileImgContainer">
							<img
								className="rightbarProfileImg"
								src="/assets/Profile/10.jpg"
								alt=""
							/>
							<span className="rightbarOnline"></span>
						</div>
						<span className="rightbarUsername"> Jim Cauldwell</span>
					</li>
					<li className="rightbarProfile">
						<div className="rightbarProfileImgContainer">
							<img
								className="rightbarProfileImg"
								src="/assets/Profile/1.jpg"
								alt=""
							/>
							<span className="rightbarOnline"></span>
						</div>
						<span className="rightbarUsername"> Fanny Rodriguez</span>
					</li>
					<li className="rightbarProfile">
						<div className="rightbarProfileImgContainer">
							<img
								className="rightbarProfileImg"
								src="/assets/Profile/4.jpg"
								alt=""
							/>
							<span className="rightbarOnline"></span>
						</div>
						<span className="rightbarUsername"> Khloe Buttons</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
