import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import MyList from "./pages/MyList.jsx";
import Account from "./pages/Account.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/account" element={<Account />} />
				<Route path="/mylist" element={<MyList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
