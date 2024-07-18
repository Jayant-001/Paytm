import { atom, selector } from "recoil";
import { validateToken } from "../hooks/authHook";

// To store authentication state
export const authState = atom({
    key: "authState",
    default: {
        isAuthenticated: false,
        isLoading: true,
    }
})

export const checkAuthState = selector({
    key: 'checkAuthState',
    get: async ({ get }) => {
        const auth = get(authState);
        const token = localStorage.getItem("token");
        if (token) {
            const isTokenValid = await validateToken(token);
            if (isTokenValid) {
                return { isAuthenticated: true, isLoading: false }
            }
        }
        return { isAuthenticated: false, isLoading: false }
    }
})

export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});