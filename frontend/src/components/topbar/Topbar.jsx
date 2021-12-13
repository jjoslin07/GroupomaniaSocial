// Import statements
import "./topbar.css";
import {
	Search,
	Notifications,
	ArrowDropDownCircle,
} from "@mui/icons-material";
import { Badge, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

// Component
export default function Topbar() {
	const { user } = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	async function logout() {
		localStorage.clear();
		sessionStorage.clear();
		window.location.reload(false);
	}
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
					<Link to={`/profile/${user.user.username}`}>
						<Avatar
							className="profilePic"
							src={PF + user.user.profilePicture}
						/>
					</Link>
					<div>
						<ArrowDropDownCircle
							className="profileDropdownArrow"
							id="basic-button"
							aria-controls="basic-menu"
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							onClick={handleClick}
						>
							Dashboard
						</ArrowDropDownCircle>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							<Link to={`/profile/${user.user.username}`}>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
							</Link>
							<MenuItem onClick={handleClose}>My account</MenuItem>
							{/* <Link to={`/login`}> */}
							<MenuItem onClick={(handleClose, logout)}>Logout</MenuItem>
							{/* </Link> */}
						</Menu>
					</div>
				</div>
			</div>
		</div>
	);
}
