import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from "../utils/axios-utils";

const fetchSquare = () => {
    return request({url: `/api/squares`, method: 'GET'});
}
export const useSquareData = () => {
    return useQuery("squares", fetchSquare);
}

const fetchAddSquare = (square) => {
    return request({url: '/api/squares', method: 'POST', data: square})
}
export const useAddSquare = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddSquare, {
        onSuccess: () => {
            queryClient.invalidateQueries("squares");
            onSuccess("Площадь был успешно добавлена")
        },
        onError: () => {
            onError("Ошибка при добавлении площади")
        }
    });
}

const fetchSingleSquare = ({queryKey}) => {
    const squareId = queryKey[1]
    return request({url: `/api/squares/${squareId}`, method: 'GET'});
}
export const useSingleSquareData = (squareId) => {
    return useQuery( ["square", squareId], fetchSingleSquare, {
        enabled: !!squareId
    });
}

const fetchUpdateSquare = (square) => {
    const updatedProject = {...square};
    delete square.squareId
    return request({url: `/api/squares/${updatedProject.squareId}`, method: 'PUT', data: square})
}
export const useUpdateSquare = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateSquare, {
        onSuccess: () => {
            queryClient.invalidateQueries("squares");
            onSuccess("Площадь был успешно обновлена")
        },
        onError: () => {
            onError("Ошибка при  обновлении площади")
        }
    });
}

const fetchDeleteSquare = (squareId) => {
    return request({url: `/api/squares/${squareId}`, method: 'DELETE'})
}
export const useDeleteSquare = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteSquare, {
        onSuccess: () => {
            queryClient.invalidateQueries("squares");
            onSuccess("Площадь был успешно удалена")
        },
        onError: () => {
            onError("Ошибка при  удалении площади")
        }
    });
}