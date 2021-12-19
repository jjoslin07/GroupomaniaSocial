import { Container } from "@mui/material";
import { Box } from "@mui/system";

export default function Confirmation() {
	async function reload() {
		await window.localStorage.clear();
		await window.sessionStorage.clear();
		window.location.reload(false);
	}
	return (
		<div>
			<>
				<Container
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						margin: 20,
					}}
				>
					<Box
						sx={{
							textAlign: "center",
							fontSize: "40px",
							color: "#fb2f01",
							fontWeight: "500",
						}}
					>
						You account has been deleted.
					</Box>
					<Box
						sx={{
							color: "red",
							fontWeight: "300",
							marginTop: "15px",
							display: "flex",
						}}
					>
						Click
						<Box
							onClick={reload}
							sx={{
								fontWeight: "500",
								cursor: "pointer",
								margin: "0 5px",
							}}
						>
							here
						</Box>
						to register account.
					</Box>
				</Container>
			</>
		</div>
	);
}
