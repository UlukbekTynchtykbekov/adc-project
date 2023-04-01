import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from '../utils/axios-utils';

const fetchFavoriteProject = ({queryKey}) => {
    const projectId = queryKey[1]
    return request({url: `/api/project-favorite/${projectId}`, method: 'get'});
}
export const useFavoriteProject = (projectId) => {
    return useQuery( ["favorite-project", projectId], fetchFavoriteProject);
}
const fetchAddFavoriteProject = (favoriteProject) => {
    return request({url: '/api/project-favorite', method: 'post', data: favoriteProject})
}
export const useAddFavoriteProject = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddFavoriteProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("favorite-project");
        },
    });
}

const fetchDeleteFavoriteProject = (id) => {
    return request({url: `/api/project-favorite/${id}`, method: 'DELETE'})
}
export const useDeleteFavoriteProject = (id) => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteFavoriteProject, {
        onSuccess: (data, variables) => {
            const { id } = variables;
            queryClient.invalidateQueries('favorite-project');
        },
    });
}