import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL, TOKEN } from "../config";
import { useRecoilValue } from "recoil";
import { userState } from "../state/authState";
import dateFormat from "dateformat";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([])
    const user = useRecoilValue(userState);

    useEffect(() => {
        fetchTransactionHistory();
    }, [])

    const fetchTransactionHistory = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/v1/account/history`, {
                headers: {
                    'Authorization': 'Bearer ' + TOKEN
                }
            });
            setTransactions(data);
        } catch (error) {
            console.log(error);
        }
    }


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
                                {transaction.toId._id == user.id ? transaction.fromId.firstName : transaction.toId.firstName}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 text-center">
                                &#8377;{transaction.amount}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 capitalize text-center">
                                {transaction.toId._id == user._id ? "Receive" : "Send"}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 text-center">
                                {dateFormat(transaction.updatedAt, "mmmm dS, yy, h:MM TT")}
                            </td>
                            <td
                                className={`py-2 px-4 border-b border-gray-200 text-center ${
                                    transaction.status === "success"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {transaction.status} Success
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
