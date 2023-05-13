import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from '../utils/axios-utils';

const fetchLoginMe = () => {
    return request({url: '/api/users/me', method: "get"});
}

export const useLoginMe = () => {
    return useQuery("auth", fetchLoginMe);
}

const fetchAddLogin = (login) => {
    return request({url: '/api/login', method: 'POST', data: login})
}

export const useAddLoginData = (onSuccess, onError) => {
    return useMutation(fetchAddLogin, {
        onSuccess: () => {
            onSuccess("Вы успешно авторизованы")
        },
        onError: () => {
            onError("Неудачная авторизация")
        }
    });
}

const fetchUpdateUser = (updatedUser) => {
    return request({url: `/api/users/update/profile`, method: 'PUT', data: updatedUser})
}
export const useUpdateUser = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateUser, {
      onSuccess: () => {
            queryClient.invalidateQueries("auth");
            onSuccess("Вы успешно изменили свой профиль")
        },
        onError: () => {
            onError("Не удалось изменить профиль")
        }
    });
}

const fetchChangePassword = (newPassword) => {
    return request({url: `/api/users/update/password`, method: 'PUT', data: newPassword})
}
export const useChangePassword = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(fetchChangePassword, {
        onSuccess: () => {
            queryClient.invalidateQueries("auth");
            onSuccess("Вы успешно изменили свой пароль")
        },
        onError: () => {
            onError("Не удалось изменить пароль")
        }
    });
}