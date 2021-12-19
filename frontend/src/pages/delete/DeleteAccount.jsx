import Topbar from "../../components/topbar/Topbar";
import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
	// Get current user under the Alias currentUser

	const { user: currentUser } = useContext(AuthContext);
	// Const to get JWT and put in Header

	const config = {
		headers: { Authorization: `Bearer ${currentUser.token}` },
	};

	// Delete
	const [del, setDel] = useState(false);

	const handleDelOpen = () => {
		setDel(true);
	};
	const handleDelClose = () => {
		setDel(false);
	};
	const navigate = useNavigate();
	const deleteHandler = async (e) => {
		e.preventDefault();

		try {
			await axios.delete("/users/" + currentUser.user.id, config);
			await window.localStorage.clear();
			await window.sessionStorage.clear();
			await navigate("/confirmation");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<>
				<Topbar />
				<Container
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box
						sx={{
							fontSize: "40px",
							color: "#fb2f01",
							marginTop: 10,
						}}
					>
						We hate to see you go 🥺
					</Box>
					<Box
						sx={{
							marginTop: 5,
						}}
					>
						<Button
							onClick={handleDelOpen}
							variant="contained"
							style={{
								backgroundColor: "red",
								color: "white",
								fontSize: "22px",
							}}
						>
							Delete Account
						</Button>
						<Dialog
							open={del}
							onClose={handleDelClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									Are you sure you want to delete your account?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleDelClose}>No</Button>
								<Button onClick={deleteHandler} autoFocus>
									Yes
								</Button>
							</DialogActions>
						</Dialog>
					</Box>
				</Container>
			</>
		</div>
	);
};

export default DeleteAccount;
