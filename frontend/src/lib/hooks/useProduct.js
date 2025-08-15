import { useQuery } from "@tanstack/react-query"
import {fetchProducts} from '../api/product'

export const useProducts = () => {
  return useQuery({
    queryKey: ['fetch-products'],
    queryFn: fetchProducts
  })
}
