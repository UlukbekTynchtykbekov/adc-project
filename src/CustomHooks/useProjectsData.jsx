import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from "../utils/axios-utils";

const fetchArchitecture = () => {
    return request({url: `/api/projects`, method: 'GET'});
}
export const useProjectsData = () => {
    return useQuery("projects", fetchArchitecture);
}

const fetchProject = ({queryKey}) => {
    const projectId = queryKey[1]
    return request({url: `/api/projects/${projectId}`, method: 'GET'});
}
export const useProjectData = (projectId) => {
    return useQuery( ["project", projectId], fetchProject, {
        enabled: !!projectId
    });
}

const fetchAddProject = (project) => {
    return request({url: '/api/projects', method: 'POST', data: project})
}
export const useAddProject = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("projects");
            onSuccess("Проект был успешно добавлен")
        },
        onError: () => {
            onError("Ошибка добавления проекта")
        }
    });
}

const fetchUpdateProject = (project) => {
    const updatedProject = {...project};
    delete project.projectId
    return request({url: `/api/projects/${updatedProject.projectId}`, method: 'PUT', data: project})
}
export const useUpdateProject = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("projects");
            onSuccess("Проект был успешно обновлен")
        },
        onError: () => {
            onError("Ошибка обновления проекта")
        }
    });
}

const fetchDeleteProject = (projectId) => {
    return request({url: `/api/projects/${projectId}`, method: 'DELETE'})
}
export const useDeleteProject = (deleteSuccess, deleteError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteProject, {
        onSuccess: () => {
            queryClient.invalidateQueries("projects");
            deleteSuccess("Проект успешно удален")
        },
        onError: () => {
            deleteError("Ошибка удалении проекта")
        }
    });
}

const fetchAddReview = (reviews) => {
    return request({url: '/api/reviews', method: 'PUT', data: reviews})
}

export const useAddReviewData = (onSuccess, onError, sentMessage) => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddReview,
        {
            onSuccess: () => {
                queryClient.invalidateQueries("projects");
                onSuccess("Ваш комментарий успешно отправлен");
                sentMessage(true)
            },
            onError: () => {
                onError("Не удалось отправить комментарий")
            }
        }
    );
}

const fetchAcceptReview = (data) => {
    return request({url: `/api/projects/${data.projectId}/reviews/${data.reviewId}`, method: 'PUT',})
}

export const useAcceptReviewData = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchAcceptReview,
        {
            onSuccess: () => {
                queryClient.invalidateQueries("projects");
                queryClient.invalidateQueries("project");
                queryClient.invalidateQueries("all-reviews");
                onSuccess("Комментарий принят успешно")
            },
            onError: () => {
                onError("Не удалось принять комментарий")
            }
        }
    );
}

const fetchDeleteReview = (data) => {
    return request({url: `/api/projects/${data.projectId}/reviews/${data.reviewId}`, method: 'DELETE',})
}

export const useDeleteReviewData = (deleteSuccess, deleteError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteReview,
        {
            onSuccess: () => {
                queryClient.invalidateQueries("projects");
                queryClient.invalidateQueries("project");
                queryClient.invalidateQueries("all-reviews")
             deleteSuccess("Комментарий успешно удален")
        },
        onError: () => {
            deleteError("Не удалось удалить комментарий")
        }
        }
    );
}

const fetchFavoriteProject = (data) => {
    return request({url: `/api/projects/wishlist`, method: 'POST', data: data})
}
export const useFavoriteProject = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchFavoriteProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('auth');
            queryClient.invalidateQueries('projects');
            queryClient.invalidateQueries('project');
            onSuccess("Проект успешно активирован")
        },
        onError: () => {
            onError("Ошибка активирования проекта")
        }
    });
}