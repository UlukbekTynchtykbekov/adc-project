import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from "../utils/axios-utils";

const fetchProjectInfos = () => {
    return request({url: `/api/project-info`,  method: 'GET'});
}
export const useProjectInfo = () => {
    return useQuery( "project-infos", fetchProjectInfos);
}

const fetchProjectInfo = ({queryKey}) => {
    const projectInfoId = queryKey[1]
    return request({url: `/api/project-info/${projectInfoId}`, method: 'GET'});
}
export const useProjectInfoData = (projectInfoId) => {
    return useQuery( ["project-info", projectInfoId], fetchProjectInfo, {
        enabled: !!projectInfoId
    });
}

const fetchAddProjectInfo = (projectInfo) => {
    return request({url: '/api/project-info', method: 'POST', data: projectInfo})
}
export const useAddProjectInfo = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddProjectInfo, {
        onSuccess: () => {
            queryClient.invalidateQueries("project-info");
            onSuccess("Информация был успешно добавлена")
        },
        onError: () => {
            onError("Ошибка добавления информации")
        }
    });
}

const fetchUpdateProjectInfo = (projectInfo) => {
    const updatedProject = {...projectInfo};
    delete projectInfo.projectInfoId
    return request({url: `/api/project-info/${updatedProject.projectInfoId}`, method: 'PUT', data: projectInfo})
}
export const useUpdateProjectInfo = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateProjectInfo, {
        onSuccess: () => {
            queryClient.invalidateQueries("project-info");
            onSuccess("Информация был успешно обновлена")
        },
        onError: () => {
            onError("Ошибка обновления информации")
        }
    });
}

const fetchDeleteProjectInfo = (projectInfoId) => {
    return request({url: `/api/project-info/${projectInfoId}`, method: 'DELETE'})
}
export const useDeleteProjectInfo = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteProjectInfo, {
        onSuccess: () => {
            queryClient.invalidateQueries("project-infos");
            onSuccess("Информация был успешно удалена")
        },
        onError: () => {
            onError("Ошибка удалении информации")
        }
    });
}