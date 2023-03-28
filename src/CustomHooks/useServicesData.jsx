import {useQuery} from "react-query";
import axios from "axios";

const fetchServices = () => {
    return axios.get("https://adc-mern-stack.herokuapp.com/api/services");
}
export const useServicesData = () => {
    return useQuery("services", fetchServices,
        {
            refetchOnWindowFocus: false
        });
}