import "./publish.css";
import { PermMedia, Room, EmojiEmotions, Label } from "@mui/icons-material";
import { TextareaAutosize } from "@mui/core";
import { Avatar, Link } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Publish() {
	const { user } = useContext(AuthContext);
	return (
		<div className="publishContainer">
			<div className="publishWrapper">
				<div className="publishTop">
					<Avatar
						className="publishProfileImg"
						src={user.info.profilePicture}
						alt=""
					/>
					<TextareaAutosize
						maxRows={4}
						placeholder="Share something with us ..."
						className="publishInput"
						style={{ width: "100%" }}
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
							<span className="publishOptionText">Category</span>
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
