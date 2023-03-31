import {useMutation} from "react-query";
import {request} from '../utils/axios-utils';

const fetchAddUser = (user) => {
    return request({url: '/api/users', method: 'post', data: user})
}
export const useAddUsersData = () => {
    return useMutation(fetchAddUser);
}