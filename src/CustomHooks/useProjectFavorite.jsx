import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from '../utils/axios-utils';

const fetchFavoriteProjects = () => {
    return request({url: `/api/project-favorite`, method: 'GET'});
}
export const useFavoriteProjects = () => {
    return useQuery( "favorite-projects", fetchFavoriteProjects);
}

const fetchFavoriteProject = (projectId) => {
    return request({url: `/api/project-favorite/${projectId}`, method: 'GET'});
}
export const useFavoriteProject = (projectId) => {
    return useQuery( ["favorite-project", projectId], () =>  fetchFavoriteProject(projectId));
}

const fetchAddFavoriteProject = (favoriteProject) => {
    return request({url: '/api/project-favorite', method: 'POST', data: favoriteProject})
}
export const useAddFavoriteProject = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddFavoriteProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("favorite-projects");
            queryClient.invalidateQueries("favorite-project");
            onSuccess()
        },
        onError
    });
}

const fetchDeleteFavoriteProject = (id) => {
    return request({url: `/api/project-favorite/${id}`, method: 'DELETE'})
}
export const useDeleteFavoriteProject = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteFavoriteProject, {
        onSuccess: (data, variables) => {
            const { id } = variables;
            queryClient.invalidateQueries('favorite-projects');
            queryClient.invalidateQueries('favorite-project');
            onSuccess()
        },
        onError
    });
}