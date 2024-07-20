import axios from 'axios';
import React, { useRef, useState } from 'react'
import { IoMdClose, IoMdAdd } from "react-icons/io";
import { API_URL, TOKEN } from '../config';
import toast from 'react-hot-toast'


const AddMoneyModal = ({ onClose }) => {
    const [amount, setAmount] = useState(0);
    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    const handleAddButtonClick = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(`${API_URL}/api/v1/account/add`, { amount },
                {
                    headers: {
                        'Authorization': 'Bearer ' + TOKEN
                    }
                }
            );
            toast.success(data.message);
            onClose();
        } catch (error) {
            toast.error(error.response.statusText)
        }

    }

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='mt-10 flex flex-col gap-5 text-white'>
                <button onClick={onClose} className='place-self-end hover:scale-125'><IoMdClose size={30} /></button>
                <div className='bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4'>
                    <h1 className='text-3xl font-extrabold'>Enter amount to add</h1>
                    <p className='text-3xl font-bold max-w-md text-center'>You can add upto 1000000</p>
                    <form action="">
                        <input type="number"
                            placeholder='Enter amount'
                            className='w-full px-4 py-3 text-black border-gray-300 rounded-md'
                            required onChange={(e) => setAmount(e.target.value)} />
                        <button onClick={handleAddButtonClick} className='mt-4 w-full flex items-center justify-center gap-2 px-5 py-2 font-medium rounded-md bg-black'><IoMdAdd size={30} /> Add money</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMoneyModal