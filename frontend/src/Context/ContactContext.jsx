import { createContext } from "react";
import api from '../lib/config/axios'
import toast from "react-hot-toast";

export const ContactContext = createContext({})

export default function ContactContextProvider({ children }) {

    const submitInquiry = async (data) => {
        try {
            const response = await api.post('/contact/submit-inquiry', data)
            const responseData = response.data

            if (responseData.error) {
                toast.error(responseData.error)
            } else {
                toast.success("Inquiry Submitted!")
            }
        } catch (error) {
            console.log("An Error Occured!", error)
        }
    }

    return (
        <ContactContext.Provider value={{ submitInquiry }}>
            {children}
        </ContactContext.Provider>
    )

}