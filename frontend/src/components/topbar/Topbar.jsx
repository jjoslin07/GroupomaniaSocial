// Import statements
import "./topbar.css";
import {
	Search,
	Notifications,
	ArrowDropDownCircle,
} from "@mui/icons-material";
import { Badge, Avatar } from "@mui/material";

// Component
export default function Topbar() {
	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<div className="logo">
					<img
						src="/assets/Groupomania_Logos/icon-left-font-monochrome-white.png"
						alt="Groupomania logo monocrhome white"
						className="companyLogo"
					/>
				</div>
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
				</div>
				<div className="topbarIcons">
					<div className="topbarIconItem">
						<Badge className="topbarBadge" badgeContent={6} color="primary">
							<Notifications />
						</Badge>
					</div>
				</div>
				<div className="userProfile">
					<Avatar className="profilePic" src="/assets/Profile/6.jpg" />
					<ArrowDropDownCircle className="profileDropdownArrow" />
				</div>
			</div>
		</div>
	);
}
