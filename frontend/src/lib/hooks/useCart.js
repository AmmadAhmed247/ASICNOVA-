import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { addToCart, deleteFromCart, fetchCart, updateCart } from "../api/cart"

export const useCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: fetchCart,
        staleTime: 1000 * 60
    })
}

export const useAddToCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addToCart,
        onSuccess: () => { queryClient.invalidateQueries(['cart']) }
    })
}

export const useDeleteFromCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteFromCart,
        onSuccess: () => { queryClient.invalidateQueries(['cart']) }
    })
}

export const useUpdateCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateCart,
        onSuccess: () => { queryClient.invalidateQueries(['cart']) }
    })
}
