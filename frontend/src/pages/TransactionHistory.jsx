import React from "react";

const transactions = [
    {
        _id: 2,
        name: "Alice",
        amount: 50,
        type: "send",
        date: "2023-07-01",
        status: "success",
    },
    {
        _id: 3,
        name: "Bob",
        amount: 20,
        type: "receive",
        date: "2023-07-02",
        status: "failed",
    },
    {
        _id: 4,
        name: "Charlie",
        amount: 30,
        type: "send",
        date: "2023-07-03",
        status: "success",
    },
    {
        _id: 5,
        name: "David",
        amount: 25,
        type: "receive",
        date: "2023-07-04",
        status: "success",
    },
    // Add more transactions as needed
];

const TransactionHistory = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200">
                            Name
                        </th>
                        <th className="py-2 px-4 border-b border-gray-200">
                            Amount
                        </th>
                        <th className="py-2 px-4 border-b border-gray-200">
                            Type
                        </th>
                        <th className="py-2 px-4 border-b border-gray-200">
                            Date
                        </th>
                        <th className="py-2 px-4 border-b border-gray-200">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b border-gray-200 text-center">
                                {transaction.name}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 text-center">
                                &#8377;{transaction.amount}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 capitalize text-center">
                                {transaction.type}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 text-center">
                                {transaction.date}
                            </td>
                            <td
                                className={`py-2 px-4 border-b border-gray-200 text-center ${
                                    transaction.status === "success"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {transaction.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
