import "./publish.css";
import { PermMedia, Room, EmojiEmotions, Label } from "@mui/icons-material";
export default function Publish() {
	return (
		<div className="publishContainer">
			<div className="publishWrapper">
				<div className="publishTop">
					<img
						className="publishProfileImg"
						src="/assets/Profile/male.png"
						alt=""
					/>
					<input
						placeholder="Share something with us ..."
						className="publishInput"
					/>
				</div>
				<hr className="publishHr" />
				<div className="publishBottom">
					<div className="publishOptions">
						<div className="publishOption">
							<PermMedia className="publishIcon" style={{ color: "green" }} />
							<span className="publishOptionText">Photo</span>
						</div>
						<div className="publishOption">
							<Label className="publishIcon" style={{ color: "blue" }} />
							<span className="publishOptionText">Tag</span>
						</div>
						<div className="publishOption">
							<Room className="publishIcon" style={{ color: "red" }} />
							<span className="publishOptionText">Location</span>
						</div>
						<div className="publishOption">
							<EmojiEmotions
								className="publishIcon"
								style={{ color: "orange" }}
							/>
							<span className="publishOptionText">Mood</span>
						</div>
					</div>
					<button className="publishButton"> Publish</button>
				</div>
			</div>
		</div>
	);
}
