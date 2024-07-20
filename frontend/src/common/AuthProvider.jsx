import { useEffect } from "react";
import axios from "axios";
import { authState, userState } from "../state/authState";
import { useSetRecoilState } from "recoil";
import { API_URL, TOKEN } from "../config";

const AuthProvider = ({ children }) => {

    const setAuth = useSetRecoilState(authState);
    const setUser = useSetRecoilState(userState);

    useEffect(() => {
        const check = async () => {
            try {
                if (TOKEN) {
                    const { data } = await axios.get(`${API_URL}/api/v1/user/me`, {
                        headers: {
                            'Authorization': 'Bearer ' + TOKEN
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