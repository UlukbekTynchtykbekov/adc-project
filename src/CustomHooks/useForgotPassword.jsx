import {request} from "../utils/axios-utils";
import {useMutation, useQuery} from "react-query";

const fetchAddPassword = (email) => {
    return request({url: '/api/password-reset', method: 'POST', data: email})
}
export const useAddPassword = () => {
    return useMutation(fetchAddPassword);
}

const fetchResetPassword = (params) => {
    const {param} = params
    return request({url: `/api/password-reset/${param.id}/${param.token}`, method: 'GET'});
}
export const useResetPasswordData = (params) => {
    return useQuery(["reset-password", params], () => fetchResetPassword(params));
}

const fetchReset = (data) => {
    const updatedData = {...data};
    delete data.id
    delete data.token
    return request({url: `/api/password-reset/${updatedData.id}/${updatedData.token}`, method: 'POST', data:data});
}
export const useResetData = () => {
    return useMutation(fetchReset);
}