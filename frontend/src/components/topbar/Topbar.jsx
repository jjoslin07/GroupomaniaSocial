// Import statements
import "./topbar.css";
import {
	Search,
	Notifications,
	ArrowDropDownCircle,
} from "@mui/icons-material";
import { Badge, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

// Component
export default function Topbar() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/">
					<div className="logo">
						<img
							src="/assets/Groupomania_Logos/icon-left-font-monochrome-white.png"
							alt="Groupomania logo monocrhome white"
							className="companyLogo"
						/>
					</div>
				</Link>
			</div>
			<div className="topbarCenter">
				<div className="searchbar">
					<Search className="searchIcon" />
					<input placeholder="Search Groupomania " className="searchInput" />
				</div>
			</div>
			<div className="topbarRight">
				<div className="topbarLinks">
					<Link to="/">
						<span className="topbarLink">Home</span>
					</Link>
				</div>
				<div className="topbarIcons">
					<div className="topbarIconItem">
						<Badge className="topbarBadge" badgeContent={6} color="primary">
							<Notifications />
						</Badge>
					</div>
				</div>
				<div className="userProfile">
					<Avatar className="profilePic" src={`${PF}Profile/6.jpg`} />
					<ArrowDropDownCircle className="profileDropdownArrow" />
				</div>
			</div>
		</div>
	);
}
