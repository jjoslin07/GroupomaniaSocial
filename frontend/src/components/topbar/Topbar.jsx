// Import statements
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";

// Component
export default function Topbar() {
	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<span className="logo">
					<img
						src="/assets/Groupomania_Logos/icon-left-font-monochrome-white.png"
						alt="Groupomania logo monocrhome white"
						className="companyLogo"
					/>
				</span>
			</div>
			<div className="topbarCenter">
				<div className="searchbar">
					<Search className="searchIcon" />
					<input placeholder="Search Groupomania " className="searchInput" />
				</div>
			</div>
			<div className="topbarRight">
				<div className="topbarLinks">
					<span className="topbarLink">Home</span>
					<span className="topbarLink">Timeline</span>
				</div>
				<div className="topbarIcons">
					<div className="topbarIconItem">
						<Person />
						<span className="topbarIconBadge">1</span>
					</div>
					<div className="topbarIconItem">
						<Chat />
						<span className="topbarIconBadge">2</span>
					</div>
					<div className="topbarIconItem">
						<Notifications />
						<span className="topbarIconBadge">1</span>
					</div>
				</div>
				<img
					src="/assets/Profile/6.jpg"
					alt="Profile Pic"
					className="profilePicture"
				/>
			</div>
		</div>
	);
}
