import axios from "axios"
export const validateToken = async (token) => {
    try {
        const URL = import.meta.env.VITE_SERVER_URL;
         await axios.get(`${URL}/api/v1/user/me`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return true;
    } catch (error) {
        return false;
    }
}