import {request} from "../utils/axios-utils";
import {useMutation, useQuery} from "react-query";

const fetchAddPassword = (email) => {
    return request({url: '/api/password-reset', method: 'POST', data: email})
}
export const useAddPassword = (onSuccess, onError) => {
    return useMutation(fetchAddPassword, {
        onSuccess: () => {
            onSuccess("Ссылка для сброса пароля отправлена на вашу электронную почту")
        },
        onError: () => {
            onError("Не удалось отправить ссылку для сброса пароля")
        }
    });
}

const fetchResetPassword = (params) => {
    const {param} = params
    return request({url: `/api/password-reset/${param.id}/${param.token}`, method: 'GET'});
}
export const useResetPasswordData = (params) => {
    return useQuery(["reset-password", params], () => fetchResetPassword(params));
}

const fetchReset = (data) => {
    const updatedData = data.param;
    delete data.param
    delete data.confirmPassword
    return request({url: `/api/password-reset/${updatedData.id}/${updatedData.token}`, method: 'POST', data:data});
}
export const useResetData = () => {
    return useMutation(fetchReset);
}