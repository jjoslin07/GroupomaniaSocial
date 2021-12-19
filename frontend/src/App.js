import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Account from "./pages/account/Account";
import DeleteAccount from "./pages/delete/DeleteAccount";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Confirmation from "./pages/delete/Confirmation";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<Router>
			<Routes>
				<Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
				<Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
				<Route
					path="/register"
					element={user ? <Navigate to="/" /> : <Register />}
				/>
				<Route
					path="/profile/:username"
					element={user ? <Profile /> : <Navigate to="/login" />}
				/>
				<Route
					path="/account/:username"
					element={user ? <Account /> : <Navigate to="/login" />}
				/>
				<Route
					path="/account/:username/delete"
					element={user ? <DeleteAccount /> : <Navigate to="/login" />}
				/>
				<Route
					path="/confirmation"
					element={user ? <Confirmation /> : <Navigate to="/login" />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
