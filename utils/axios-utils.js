import axios from "axios";

const client = axios.create({baseURL: "https://adc-mern-stack.herokuapp.com"});

export const request = ({...option}) => {
    const onSuccess = response => response
    const onerror = error => {
        return error
    }
}