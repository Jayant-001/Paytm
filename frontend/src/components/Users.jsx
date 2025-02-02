import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { API_URL, TOKEN } from "../config.js"
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../state/authState.js";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`${API_URL}/api/v1/user?filter=${searchText}`, {
                headers: {
                    'Authorization': 'Bearer ' + TOKEN
                }
            })
            setUsers(data);
        })()
    }, [searchText])

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                onChange={(e) => setSearchText(e.target.value)}
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
    const me = useRecoilValue(userState);

    // exclude current from the list
    if(me._id == user._id) return <></>;

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0].toUpperCase()}
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
                    <Button label={"Request"} onClick={() => navigate(`/request?id=${user._id}&name=${user.firstName}`)} />
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <Button label={"Send"} onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)} />
                </div>
            </div>
        </div>
    );
}
export default Users;
