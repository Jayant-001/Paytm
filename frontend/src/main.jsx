import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Send from "./pages/Send.jsx";
import TransactionHistory from "./pages/TransactionHistory.jsx";
import Profile from "./pages/Profile.jsx";
import Landing from "./components/Landing.jsx";
import { RecoilRoot } from "recoil";
import AuthProvider from "./common/AuthProvider.jsx";
import { Toaster } from 'react-hot-toast';
import Request from "./pages/Request.jsx";
import PaymentRequest from "./pages/PaymentRequest.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/send",
                element: <Send />,
            },
            {
                path: "/request",
                element: <Request />
            },
            {
                path: "payment-requests",
                element: <PaymentRequest />
            },
            {
                path: "/transactions",
                element: <TransactionHistory />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/signin",
        element: <Signin />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RecoilRoot>
            <AuthProvider>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <RouterProvider router={router} />
            </AuthProvider>
        </RecoilRoot>
    </React.StrictMode>
);
