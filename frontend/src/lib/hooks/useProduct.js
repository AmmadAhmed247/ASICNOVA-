import { useQuery } from "@tanstack/react-query"
import { fetchProducts, fetchProductById } from '../api/product'

export const useProducts = () => {
  return useQuery({
    queryKey: ['fetch-products'],
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
