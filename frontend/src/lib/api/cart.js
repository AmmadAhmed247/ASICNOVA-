import api from '../config/axios'

export const fetchCart = async ()=>{
    const response = await api.get('/cart/')
    return response.data
}

export const addToCart = async ({productId, quantity})=>{
    const response = await api.post('/cart/add', {productId, quantity})
    return response.data
}

export const deleteFromCart = async (data)=>{
    const response = await api.delete('/cart/delete', data)
    return response.data
}

export const updateCart = async (data)=>{
    const response = await api.put('/cart/update', data)
    return response.data
}

