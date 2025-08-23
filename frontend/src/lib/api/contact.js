import api from '../config/axios'

export const getAllInquires = async ()=>{
    try {
        const response = await api.get('/contact/inquiries')
        return response.data
    } catch (error) {
        console.log("An Error Occured!")
    }
}