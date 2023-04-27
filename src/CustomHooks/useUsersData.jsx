import {useMutation, useQuery} from "react-query";
import {request} from '../utils/axios-utils';

const fetchAddUser = (user) => {
    return request({url: '/api/users', method: 'post', data: user})
}
export const useAddUsersData = () => {
    return useMutation(fetchAddUser);
}
const  fetchUsers = () =>{
    return request({url: '/api/users', method: 'GET'})
}
export const useUsersData = () =>{
    return useQuery("users", fetchUsers)
}

const fetchToken = (tokenData) => {
    console.log(tokenData)
    return request({url: `/api/users/${tokenData.param.id}/verify/${tokenData.param.token}`, method: 'GET'});
}
export const useTokenData = (tokenData) => {
    return useQuery(["token", tokenData], () => fetchToken(tokenData));
}
