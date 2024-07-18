import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const URL = import.meta.env.VITE_SERVER_URL;

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${URL}/api/v1/auth/signup`, { userName: email, firstName, lastName, password })
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading
                        label={"Enter your infromation to create an account"}
                    />
                    <InputBox
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Jayant"
                        label={"First Name"}
                    />
                    <InputBox
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Gupta"
                        label={"Last Name"}
                    />
                    <InputBox
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jayant@gmail.com"
                        label={"Email"}
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="123456"
                        label={"Password"}
                    />
                    <div className="pt-4">
                        <Button onClick={handleClick} label={"Sign up"} />
                    </div>
                    <BottomWarning
                        label={"Already have an account?"}
                        buttonText={"Sign in"}
                        to={"/signin"}
                    />
                </div>
            </div>
        </div>
    );
}

export default Signup;
