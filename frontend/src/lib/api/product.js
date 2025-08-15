import api from '../config/axios'

export const fetchProducts = async () => {
  const response = await api.get('/product/get-products')
  return response.data
}

export const fetchProductById = async (id)=> {
    const response = await api.get(`/product/getProductById/${id}`)
    return response.data.product
}