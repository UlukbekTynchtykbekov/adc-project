import axios from "axios";

const client = axios.create({baseURL: "https://adc-mern-stack.herokuapp.com"});

export const request = ({...options}) => {
    client.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem("token")}`
    const onSuccess = (response) => response
    const onError = (error) => {
        console.log(error)
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}