import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../state/authState";

const ProfilePage = () => {
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        balance: "1000",
        transactions: [
            {
                id: 1,
                name: "Transaction 1",
                amount: "$200",
                type: "Send",
                date: "2024-01-01",
                status: "Success",
            },
            {
                id: 2,
                name: "Transaction 2",
                amount: "$300",
                type: "Receive",
                date: "2024-01-02",
                status: "Failed",
            },
        ],
        requests: [
            {
                id: 1,
                name: "Request 1",
                amount: "$50",
                date: "2024-01-01",
                status: "Pending",
            },
            {
                id: 2,
                name: "Request 2",
                amount: "$100",
                date: "2024-01-02",
                status: "Completed",
            },
        ],
    };

    const userData = useRecoilValue(userState)
    console.log(userData);

    const navigate = useNavigate();

    const [showTransactions, setShowTransactions] = useState(false);
    const [showRequests, setShowRequests] = useState(false);

    const toggleTransactions = () => setShowTransactions(!showTransactions);
    const toggleRequests = () => setShowRequests(!showRequests);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/signin")
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-3xl font-bold mb-4 text-gray-700">
                    Profile
                </h2>
                <p className="text-lg">
                    <strong className="font-semibold text-gray-600">
                        Name:
                    </strong>{" "}
                    {userData?.firstName + " " + userData?.lastName}
                </p>
                <p className="text-lg">
                    <strong className="font-semibold text-gray-600">
                        Email:
                    </strong>{" "}
                    {userData?.userName}
                </p>
                <p className="text-lg">
                    <strong className="font-semibold text-gray-600">
                        Phone:
                    </strong>{" "}
                    {user.phone}
                </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-between">
                <h2 className="text-3xl font-bold mb-4 text-gray-700">
                    Balance{" "}
                    <span className="text-4xl font-bold text-green-500">
                        {" "}
                        &#8377;{user.balance}{" "}
                    </span>
                </h2>
                <button className="flex items-center h-fit bg-green-500 text-white gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3">
                    Add money
                    <svg
                        className="w-5 h-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        ></path>
                    </svg>
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2
                    className="text-2xl font-bold mb-4 text-gray-700 cursor-pointer hover:text-blue-500"
                    onClick={toggleTransactions}
                >
                    Transaction History {showTransactions ? "▲" : "▼"}
                </h2>
                {showTransactions && (
                    <table className="min-w-full bg-white border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left text-gray-600">
                                    Name
                                </th>
                                <th className="py-2 px-4 border-b text-left text-gray-600">
                                    Amount
                                </th>
                                <th className="py-2 px-4 border-b text-left text-gray-600">
                                    Type
                                </th>
                                <th className="py-2 px-4 border-b text-left text-gray-600">
                                    Date
                                </th>
                                <th className="py-2 px-4 border-b text-left text-gray-600">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.transactions.map((transaction) => (
                                <tr
                                    key={transaction.id}
                                    className="hover:bg-gray-100"
                                >
                                    <td className="py-2 px-4 border-b">
                                        {transaction.name}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {transaction.amount}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {transaction.type}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {transaction.date}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {transaction.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2
                    className="text-2xl font-bold mb-4 text-gray-700 cursor-pointer hover:text-blue-500"
                    onClick={toggleRequests}
                >
                    Payment Requests {showRequests ? "▲" : "▼"}
                </h2>
                {showRequests && (
                    <table className="min-w-full bg-white border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left text-gray-600">
                                    Name
                                </th>
                                <th className="py-2 px-4 border-b text-left text-gray-600">
                                    Amount
                                </th>
                                <th className="py-2 px-4 border-b text-left text-gray-600">
                                    Date
                                </th>
                                <th className="py-2 px-4 border-b text-left text-gray-600">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.requests.map((request) => (
                                <tr
                                    key={request.id}
                                    className="hover:bg-gray-100"
                                >
                                    <td className="py-2 px-4 border-b">
                                        {request.name}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {request.amount}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {request.date}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {request.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Button label={"Logout"} onClick={handleLogout} />
        </div>
    );
};

export default ProfilePage;
