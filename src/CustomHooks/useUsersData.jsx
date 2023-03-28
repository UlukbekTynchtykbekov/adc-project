import {useMutation} from "react-query";
import axios from "axios";

const fetchAddUser = (user) => {
    return axios.post("https://adc-mern-stack.herokuapp.com/api/users",user);
}
export const useAddUsersData = () => {
    return useMutation(fetchAddUser);
}