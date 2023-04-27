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
export const useAddSquare = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddSquare, {
        onSuccess: () => {
            queryClient.invalidateQueries("squares");
        },
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
export const useUpdateSquare = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateSquare, {
        onSuccess: () => {
            queryClient.invalidateQueries("squares");
        },
    });
}

const fetchDeleteSquare = (squareId) => {
    return request({url: `/api/squares/${squareId}`, method: 'DELETE'})
}
export const useDeleteSquare = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteSquare, {
        onSuccess: () => {
            queryClient.invalidateQueries("squares");
        },
    });
}