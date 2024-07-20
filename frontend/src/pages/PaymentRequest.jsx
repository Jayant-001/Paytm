import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL, TOKEN } from '../config';
import dateFormat from 'dateformat'
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const PaymentRequest = () => {

    const [paymentRequests, setPaymentRequests] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchPaymentRequests();
    }, [])

    const fetchPaymentRequests = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/v1/account/payment-request?status=pending`, {
                headers: {
                    'Authorization': 'Bearer ' + TOKEN
                }
            });
            setPaymentRequests(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAccept = async (requestId) => {

        try {
            const { data } = await axios.post(`${API_URL}/api/v1/account/payment-request-fulfill`, { requestId }, {
                headers: {
                    'Authorization': 'Bearer ' + TOKEN
                }
            });
            toast.success(data.message)
            navigate(0);
        } catch (error) {
            toast.error(error.response.data);
        }
    }

    const handleReject = async (requestId) => {

        try {
            const { data } = await axios.post(`${API_URL}/api/v1/account/payment-request-reject`, { requestId }, {
                headers: {
                    'Authorization': 'Bearer ' + TOKEN
                }
            });
            toast.success(data.message);
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Payment Requests</h1>
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
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paymentRequests.map((request) => (

                        <tr
                            key={request._id}
                            className="hover:bg-gray-100"
                        >
                            <td className="py-2 px-4 border-b">
                                {request.fromId.firstName}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {request.amount}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {dateFormat(request.updatedAt, "mmmm dS, yy, h:MM TT")}
                            </td>
                            <td className="capitalize py-2 px-4 border-b flex gap-2 items-center justify-center">
                                <button onClick={(e) => { e.preventDefault(); handleAccept(request._id) }} className='bg-green-400 rounded-lg shadow-lg px-2 py-2 hover:bg-green-500 text-white'><FaCheck /></button>
                                <button onClick={(e) => { e.preventDefault(); handleReject(request._id) }} className='bg-red-400 rounded-lg shadow-lg px-2 py-2 hover:bg-red-500 text-white'><RxCross2 /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PaymentRequest