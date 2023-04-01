import axios from "axios";

const client = axios.create({baseURL: "http://localhost:8000"});

export const request = ({...options}) => {
    client.defaults.headers.common["x-auth-token"] = `${window.localStorage.getItem("token")}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}