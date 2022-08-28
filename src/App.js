import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import MyList from "./pages/MyList.jsx";
import Account from "./pages/Account.jsx";
import { AuthContextProvider, UserAuth } from "./AuthContext";
import ProtectAuth from "./ProtectAuth";
import ExploreAll from "./pages/ExploreAll";
import Play from "./pages/Play/Play";
import BackHome from "./pages/BackHome";
import ViewSearch from "./pages/ViewSearch";
import React from "react";

function App() {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/home"
						element={
							<ProtectAuth>
								<Home />
							</ProtectAuth>
						}
					/>
					<Route
						path="/search/:query"
						element={
							<ProtectAuth>
								<ViewSearch />
							</ProtectAuth>
						}
					/>
					<Route path="*" element={<BackHome />} />
					<Route
						path="/play/:type/:id"
						element={
							<ProtectAuth>
								<Play />
							</ProtectAuth>
						}
					/>
					<Route
						path="/home/:type/:name"
						element={
							<ProtectAuth>
								<ExploreAll />
							</ProtectAuth>
						}
					/>
					<Route path="/" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route
						path="/account"
						element={
							<ProtectAuth>
								<Account />
							</ProtectAuth>
						}
					/>
					<Route
						path="/mylist"
						element={
							<ProtectAuth>
								<MyList />
							</ProtectAuth>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>
	);
}

export default App;
