import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="bg-green-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left: Title */}
                <Link to="/" className="text-white text-2xl font-bold">
                    PayTM
                </Link>
                {/* Middle: Tabs */}
                <div className="space-x-4">
                    <Link
                        to="dashboard"
                        className="text-white hover:text-gray-300"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="money-requests"
                        className="text-white hover:text-gray-300"
                    >
                        Money Requests
                    </Link>
                    <Link
                        to="transactions"
                        className="text-white hover:text-gray-300"
                    >
                        History
                    </Link>
                    {/* Add more tabs as needed */}
                </div>
                {/* Right: Profile */}
                <div className="text-white">
                    <Link to="profile" className="hover:text-gray-300">
                        Profile
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
