import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from "../utils/axios-utils";

const fetchArchitect = () => {
    return request({url: `/api/architects`, method: 'GET'});
}
export const useArchitectData = () => {
    return useQuery("architects", fetchArchitect);
}

const fetchAddArchitect = (architect) => {
    return request({url: '/api/architects', method: 'POST', data: architect})
}
export const useAddArchitect = (addingSuccess, addingError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddArchitect, {
        onSuccess: () => {
            queryClient.invalidateQueries("architects");
            addingSuccess("Архитектор был успешно добавлен")
        },
        onError: () => {
            addingError("Ошибка при добавлении архитектора")
        }
    });
}

const fetchSingleArchitect = ({queryKey}) => {
    const architectId = queryKey[1]
    return request({url: `/api/architects/${architectId}`, method: 'GET'});
}
export const useSingleArchitectData = (architectId) => {
    return useQuery(["architect", architectId],fetchSingleArchitect, {
        enabled: !!architectId
    });
}

const fetchUpdateArchitect = (architect) => {
    const updatedProject = {...architect};
    delete architect.architectId
    return request({url: `/api/architects/${updatedProject.architectId}`, method: 'PUT', data: architect})
}
export const useUpdateArchitect = (addingSuccess, addingError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateArchitect, {
        onSuccess: () => {
            queryClient.invalidateQueries("architects");
            addingSuccess("Архитектор успешно обновлен")
        },
        onError: () => {
            addingError("Ошибка обновления архитектора")
        }
    });
}

const fetchDeleteArchitect = (architectId) => {
    return request({url: `/api/architects/${architectId}`, method: 'DELETE'})
}
export const useDeleteArchitect = (deleteSuccess, deleteError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteArchitect, {
        onSuccess: () => {
            queryClient.invalidateQueries("architects");
            deleteSuccess("Архитектор успешно удален")
        },
        onError: () => {
            deleteError("Ошибка удаления архитектора")
        }
    });
}