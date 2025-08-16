import { createContext, useEffect, useState } from "react";
import api from '../lib/config/axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export const AuthContext = createContext({})

export default function AuthContextProvider({ children }) {

    const [User, setUser] = useState(undefined)
    console.log(User)

    const sendOTP = async (data) => {
        try {
            const response = await api.post('/auth/send-otp', data)
            const responseData = response.data

            if (responseData.error) {
                toast.error(responseData.error)
            } else {
                toast.success("OTP Sent!")
            }
        } catch (error) {
            console.log("An Error Occured!", error)
        }
    }

    const verifyOTPAndPassword = async (data) => {
        try {
            const response = await api.post('/auth/verify-signup', data)
            const responseData = response.data

            if (responseData.error) {
                toast.error(responseData.error)
            } else {
                toast.success("Registered Successfully!")
            }
        } catch (error) {
            console.log("An Error Occured!", error)
        }
    }

    const loginUser = async (data) => {
        try {
            const response = await api.post('/auth/login-user', data);
            toast.success("Logged in successfully!");
            return { success: true, data: response.data };
        } catch (error) {
            const message = error?.response?.data?.error || "Something went wrong!";
            toast.error(message);
            return { success: false, error: message };
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = Cookies.get('accessToken')
                if (!token) {
                    setUser(null)
                    return;
                }
                const response = await api.get('/auth/get-profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setUser(response.data?.User)


            } catch (error) {
                console.log("An Error Occured!", error)
            }
        }

        fetchProfile()
    }, [])

const logout = async () => {
    try {
        Cookies.remove('accessToken'); 
        setUser(null);
        toast.success("Logged Out!");
    } catch (error) {
        console.log("An Error Occured!", error);
    }
};

const forgotPassword = async (data)=>{
    try {
        const response = await api.post('/auth/forgot-password', data)
        const responseData = response.data

        if(responseData.error){
            toast.error(responseData.error)
        } else {
            toast.success("OTP Sent!")
            return responseData
        }
    } catch (error) {
        console.log("An Error Occured!", error)
    }
}

const resetPassword = async (data)=>{
    try {
        const response = await api.post('/auth/reset-password', data)
        const responseData = response.data

        if(responseData.error){
            toast.error(responseData.error)
        } else {
            toast.success("Password Reset Successful!")
        }
    } catch (error) {
        console.log("An Error Occured!", error)
    }
}


    return (
        <AuthContext.Provider value={{ sendOTP, verifyOTPAndPassword, loginUser, User, logout, resetPassword, forgotPassword }}>
            {children}
        </AuthContext.Provider>
    )
}