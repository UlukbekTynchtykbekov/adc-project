import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from "../utils/axios-utils";

const fetchArchitecture = () => {
    return request({url: `/api/projects`, method: 'GET'});
}
export const useProjectsData = () => {
    return useQuery("projects", fetchArchitecture);
}

const fetchAddProject = (project) => {
    return request({url: '/api/projects', method: 'POST', data: project})
}
export const useAddProject = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("projects");
        },
    });
}

const fetchUpdateProject = (project) => {
    const updatedProject = {...project};
    delete project.projectId
    return request({url: `/api/projects/${updatedProject.projectId}`, method: 'PUT', data: project})
}
export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("projects");
        },
    });
}

const fetchDeleteProject = (projectId) => {
    return request({url: `/api/projects/${projectId}`, method: 'DELETE'})
}
export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("projects");
        },
    });
}

const fetchAddReview = (reviews) => {
    return request({url: '/api/reviews', method: 'PUT', data: reviews})
}

export const useAddReviewData = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddReview,
        {
            onSuccess: () => {
                queryClient.invalidateQueries("projects");
                queryClient.invalidateQueries("project");
                onSuccess()
            },
            onError
        }
    );
}

const fetchAcceptReview = (data) => {
    return request({url: `/api/projects/${data.projectId}/reviews/${data.reviewId}`, method: 'PUT',})
}

export const useAcceptReviewData = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchAcceptReview,
        {
            onSuccess: () => {
                queryClient.invalidateQueries("projects");
                queryClient.invalidateQueries("project");
                queryClient.invalidateQueries("all-reviews");
            },
        }
    );
}

const fetchDeleteReview = (data) => {
    return request({url: `/api/projects/${data.projectId}/reviews/${data.reviewId}`, method: 'DELETE',})
}

export const useDeleteReviewData = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteReview,
        {
            onSuccess: () => {
                queryClient.invalidateQueries("projects");
                queryClient.invalidateQueries("project");
                queryClient.invalidateQueries("all-reviews");
            },
        }
    );
}