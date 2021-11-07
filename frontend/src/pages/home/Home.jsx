// Import components
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

// Create home component
export default function Home() {
	return (
		// Use fragment to return multiple components together
		<>
			<Topbar />
			<div className="homeContainer">
				<Leftbar />
				<Feed />
				<Rightbar />
			</div>
		</>
	);
}
