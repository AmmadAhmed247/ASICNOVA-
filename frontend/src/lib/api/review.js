import api from '../config/axios'

export async function postReview(id, review){
    const response = await api.post(`/product/${id}/create-review`, review)
    return response.data
}