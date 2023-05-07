import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from '../utils/axios-utils';

const fetchAddUser = (user) => {
    delete user["confirmPassword"]
    return request({url: '/api/users', method: 'POST', data: user})
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

const  fetchUser = ({queryKey}) =>{
    const id = queryKey[1]
    return request({url: `/api/users/${id}`, method: 'GET'})
}
export const useUserData = (id) =>{
    return useQuery(["user", id], fetchUser, {
        enabled: !!id
    })
}

const fetchToken = (tokenData) => {
    const {id} = tokenData;
    const {token} = tokenData
    return request({url: `/api/users/${id}/verify/${token}`, method: 'GET'});
}
export const useTokenData = (tokenData) => {
    return useQuery(["token", tokenData], () => fetchToken(tokenData));
}

const fetchUpdateUserRole = (user) => {
    const updatedUserRole = {...user};
    delete user.id
    return request({url: `/api/users/${updatedUserRole.id}/update/role`, method: 'PUT', data: user})
}
export const useUpdateUserRole = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateUserRole, {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        },
    });
}


