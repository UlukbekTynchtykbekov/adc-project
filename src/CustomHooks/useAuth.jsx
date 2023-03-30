import {useMutation} from "react-query";
import {request} from '../utils/axios-utils';

const fetchAddLogin = (login) => {
    return request({url: '/api/login', method: 'post', data: login})
}
export const useAddLoginData = () => {
    return useMutation(fetchAddLogin);
}