import { useQuery } from "react-query";
import {request} from '../utils/axios-utils';

const fetchReview = ({queryKey}) => {
    const projectId = queryKey[1]
    return request({url: `/api/projects/${projectId}/reviews`, method: 'GET'});
}
export const useReviewData = (projectId) => {
    return useQuery(["reviews", projectId], fetchReview, {
        enabled: !!projectId
    });
}

const fetchAllReview = ({queryKey}) => {
    const projectId = queryKey[1]
    return request({url: `/api/projects/${projectId}/all-reviews`, method: 'GET'});
}
export const useAllReviewData = (projectId) => {
    return useQuery(["all-reviews", projectId], fetchAllReview, {
        enabled: !!projectId
    });
}

