import { useQuery } from "@tanstack/react-query";
import { getAllInquires } from "../api/contact";

export const useInquiry = () => {
    return useQuery({
        queryKey: ['inquiries'],
        queryFn: getAllInquires
    })
}