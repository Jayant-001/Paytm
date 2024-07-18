import { useEffect, useState } from "react";
import axios from "axios";
import { authState, userState } from "../state/authState";
import { useSetRecoilState } from "recoil";

const AuthProvider = ({ children }) => {

    const setAuth = useSetRecoilState(authState);
    const setUser = useSetRecoilState(userState);

    useEffect(() => {
        const check = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    setUser(data);
                    setAuth({ isAuthenticated: true, isLoading: false })
                }
                else {
                    setAuth({ isAuthenticated: false, isLoading: false })
                }
            } catch (error) {
                setAuth({ isAuthenticated: false, isLoading: false })
            }
        }
        check();
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider;