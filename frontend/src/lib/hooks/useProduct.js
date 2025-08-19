import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { fetchProducts, fetchProductById, createProduct, editProduct, deleteProduct } from '../api/product'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  })
}

export const useProductById = (id)=> {
  return useQuery({
    queryKey: ['fetch-product-by-id', id],
    queryFn: ()=> fetchProductById(id),
    enabled: !!id
  })

}

export const addProduct = (data)=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    }
  })
}

export const useEditProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => editProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    }
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    }
  })
}
