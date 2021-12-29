import * as React from "react";
// import "./topbar.css";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { AuthContext } from "../../context/AuthContext";
import { Chip, Link } from "@mui/material";

// import { useNavigate } from "react-router-dom";
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

export default function Topbar() {
	const { user } = React.useContext(AuthContext);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};
	async function logout() {
		localStorage.clear();
		sessionStorage.clear();
		window.location.reload(false);
	}
	// const navigate = useNavigate();

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<Link
				href={`/profile/${user.user.username}`}
				sx={{
					textDecoration: "none",
					color: "black",
				}}
			>
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			</Link>
			<Link
				href={`/account/${user.user.username}`}
				sx={{
					textDecoration: "none",
					color: "black",
				}}
			>
				<MenuItem onClick={handleMenuClose}>My account</MenuItem>
			</Link>
			<MenuItem onClick={(handleMenuClose, logout)}>Logout</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Menu</p>
			</MenuItem>
		</Menu>
	);

	return (
		<Box
			sx={{
				flexGrow: 1,
				position: "sticky",
				top: 0,
				zIndex: 999,
				width: "100%",
			}}
		>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "#fb2d01",
				}}
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
					>
						<Link
							href={"/"}
							sx={{
								textDecoration: "none",
								color: "white",
							}}
						>
							<MenuIcon
								sx={{
									display: { sm: "none" },
								}}
							/>
						</Link>
					</IconButton>
					<Box
						sx={{
							display: { xs: "none", sm: "inline" },
							marginLeft: -5,
							marginRight: 10,
							cursor: "pointer",
						}}
					>
						<Link href={"/"}>
							<img
								src="/assets/Groupomania_Logos/icon-left-font-monochrome-white.svg"
								alt="Groupomania logo monocrhome white"
								className="companyLogo"
								width="175"
								height="50"
							/>
						</Link>
					</Box>

					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>

					<Box sx={{ flexGrow: 1 }} />
					<Link
						href={`/profile/${user.user.username}`}
						sx={{
							textDecoration: "none",
						}}
					>
						<Chip
							label={user.user.display_name}
							variant="outlined"
							sx={{
								color: "white",
								fontSize: "14px",
								fontWeight: "500",
								cursor: "pointer",
							}}
						/>
					</Link>

					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}
