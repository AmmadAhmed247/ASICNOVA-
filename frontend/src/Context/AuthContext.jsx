import { createContext } from "react";
import api from '../lib/config/axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({})

export default function AuthContextProvider({ children }) {

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

    const loginUser = async (data)=>{
        try {
            const response = await api.post('/auth/login-user', data)
            const responseData = response.data

            if(responseData.error){
                toast.error(responseData.error)
            } else {
                toast.success("Logged In Successfuly!")
            }
        } catch (error) {
            console.log("An Error Occured!", error)
        }
    }

    return (
        <AuthContext.Provider value={{ sendOTP, verifyOTPAndPassword, loginUser }}>
            {children}
        </AuthContext.Provider>
    )
}