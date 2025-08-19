import api from '../config/axios'

export const fetchProducts = async () => {
  const response = await api.get('/product/get-products')
  return response.data
}

export const fetchProductById = async (id)=> {
    const response = await api.get(`/product/getProductById/${id}`)
    return response.data.product
}

export const createProduct = async (data)=>{
  const response = await api.post('/product/create-product', data)
  return response.data
}

export const editProduct = async (id, data) => {
  const response = await api.put(`/product/edit-product/${id}`, data)
  return response.data
}

export const deleteProduct = async (id) => {
  const response = await api.delete(`/product/delete-product/${id}`)
  return response.data
}