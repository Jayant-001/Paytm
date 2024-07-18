import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/UI/Navbar";
import { useRecoilValue } from "recoil";
import { authState, userState } from "./state/authState";

function App() {

    const auth = useRecoilValue(authState)
    

    if (auth.isLoading) {
        return <h1>Loading......</h1>
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/signin" />
    }

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}

export default App;
