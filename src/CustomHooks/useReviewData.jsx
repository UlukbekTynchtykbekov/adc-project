import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from '../utils/axios-utils';

const fetchReview = ({queryKey}) => {
    const projectId = queryKey[1]
    return request({url: `/api/projects/${projectId}/reviews`, method: 'GET'});
}
export const useReviewData = (projectId) => {
    return useQuery(["review", projectId], fetchReview);
}

const fetchAddReview = (reviews) => {
    return request({url: '/api/reviews', method: 'PUT', data: reviews})
}

export const useAddReviewData = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddReview,
        {
            onSuccess: () => {
                queryClient.invalidateQueries("review");
                onSuccess()
            },
            onError
        }
    );
}