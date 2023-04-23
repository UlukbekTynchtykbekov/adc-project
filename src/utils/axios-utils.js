import axios from "axios";

const client = axios.create({baseURL:process.env.REACT_APP_API_URL});

export const request = ({...options}) => {
    client.defaults.headers.common["x-auth-token"] = `${window.localStorage.getItem("token")}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}