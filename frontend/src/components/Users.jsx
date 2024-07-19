import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { API_URL, TOKEN } from "../config.js"
import { useNavigate } from "react-router-dom";

const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([
        {
            firstName: "Jayant",
            lastName: "Gupta",
            _id: 1,
        },
        {
            firstName: "Jayant",
            lastName: "Gupta",
            _id: 1,
        },
        {
            firstName: "Jayant",
            lastName: "Gupta",
            _id: 1,
        },
    ]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`${API_URL}/api/v1/user`, {
                headers: {
                    'Authorization': 'Bearer ' + TOKEN
                }
            })
            setUsers(data);
            console.log(data);
        })()
    }, [])

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                ></input>
            </div>
            <div>
                {users.map((user, index) => (
                    <User key={index} user={user} />
                ))}
            </div>
        </>
    );
};

function User({ user }) {

    const navigate = useNavigate();
    const handleSend = async (e) => {
        e.preventDefault();
        navigate(`/send?id=${user._id}&name=${user.firstName}`)
    }

    const handleRequest = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${API_URL}/api/v1/user`, {
                headers: {
                    'Authorization': 'Bearer ' + TOKEN
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <div className="flex flex-col justify-center h-ful">
                    <Button label={"Request"} onClick={handleRequest} />
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <Button label={"Send"} onClick={handleSend} />
                </div>
            </div>
        </div>
    );
}
export default Users;
