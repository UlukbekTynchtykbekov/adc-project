import {useMutation, useQuery} from "react-query";
import {request} from '../utils/axios-utils';

const fetchAddLogin = (login) => {
    return request({url: '/api/login', method: 'post', data: login})
}

export const useAddLoginData = () => {
    return useMutation(fetchAddLogin);
}

const fetchLoginMe = () => {
    return request({url: '/api/users/me', method: "get"});
}

export const useLoginMe = () => {
    return useQuery("auth", fetchLoginMe);
}