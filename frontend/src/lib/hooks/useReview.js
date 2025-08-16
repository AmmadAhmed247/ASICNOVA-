import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview } from "../api/review";

export function usePostReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, review }) => postReview(id, review),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['product', variables.id]);
    },
  });
}