import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from "../utils/axios-utils";

const fetchCategories = () => {
    return request({url: `/api/categories`, method: 'GET'});
}
export const useCategoriesData = () => {
    return useQuery("categories", fetchCategories);
}

const fetchCategory = ({queryKey}) => {
    const categoryId = queryKey[1]
    return request({url: `/api/categories/${categoryId}`, method: 'GET'});
}
export const useCategoryData = (categoryId) => {
    return useQuery( ["category", categoryId], fetchCategory, {
        enabled: !!categoryId
    });
}

const fetchAddCategory = (category) => {
    return request({url: '/api/categories', method: 'POST', data: category})
}
export const useAddCategory = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
        },
    });
}

const fetchUpdateCategory = (category) => {
    const updatedProject = {...category};
    delete category.categoryId
    return request({url: `/api/categories/${updatedProject.categoryId}`, method: 'PUT', data: category})
}
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
        },
    });
}

const fetchDeleteCategory = (categoryId) => {
    return request({url: `/api/categories/${categoryId}`, method: 'DELETE'})
}
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
        },
    });
}