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
export const useAddCategory = (addingSuccess, addingError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
            addingSuccess("Категория был успешно добавлен")
        },
         onError: () => {
            addingError("Ошибка при добавлении категорию")
        }
    });
}

const fetchUpdateCategory = (category) => {
    const updatedProject = {...category};
    delete category.categoryId
    return request({url: `/api/categories/${updatedProject.categoryId}`, method: 'PUT', data: category})
}
export const useUpdateCategory = (addingSuccess,addingError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
            addingSuccess("Категория успешно обновлена")
        },
        onError: () => {
            addingError("Ошибка обновления категорию")
        }
    });
}

const fetchDeleteCategory = (categoryId) => {
    return request({url: `/api/categories/${categoryId}`, method: 'DELETE'})
}
export const useDeleteCategory = (deleteSuccess, deleteError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
            deleteSuccess("Категория успешно удалена")
        },
        onError: () => {
            deleteError("Ошибка удаления категории")
        }
    });
}