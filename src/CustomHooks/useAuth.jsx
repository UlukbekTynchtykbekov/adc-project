import {useMutation} from "react-query";
import axios from "axios";

const fetchAddLogin = (login) => {
    return axios.post("https://adc-mern-stack.herokuapp.com/api/login", login);
}
export const useAddLoginData = () => {
    return useMutation(fetchAddLogin);
}