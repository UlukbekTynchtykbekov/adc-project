import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from '../utils/axios-utils';

const fetchFavoriteProjects = (favoriteId) => {
    return request({url: `/api/project-favorite/${favoriteId}`, method: 'GET'});
}
export const useFavoriteProjects = (favoriteId) => {
    return useQuery( "favorite-projects", () => fetchFavoriteProjects(favoriteId),{
        enabled: !!favoriteId
    });
}

const fetchFavoriteProject = (data) => {
    return request({url: `/api/project-favorite/${data.projectId}/${data.favoriteId}`, method: 'GET'});
}
export const useFavoriteProject = (data) => {
    return useQuery( ["favorite-project", data], () =>  fetchFavoriteProject(data));
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
            onSuccess("Проект был успешно добавлен")
        },
        onError: () => {
            onError("Ошибка при добавлении проекта")
        }
    });
}

const fetchDeleteFavoriteProject = (data) => {
    return request({url: `/api/project-favorite/${data.projectId}/${data.favoriteId}`, method: 'DELETE'})
}
export const useDeleteFavoriteProject = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteFavoriteProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('favorite-projects');
            queryClient.invalidateQueries('favorite-project');
            onSuccess("Проект успешно удален")
        },
        onError: () => {
            onError("Ошибка удаления проекта")
        }
    });
}