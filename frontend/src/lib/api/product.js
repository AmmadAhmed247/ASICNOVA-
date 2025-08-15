import api from '../config/axios'

export const fetchProducts = async () => {
  const response = await api.get('/product/get-products')
  return response.data
}