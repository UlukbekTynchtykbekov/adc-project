import {useQuery} from "react-query";
import {request} from "../utils/axios-utils";

const fetchServices = () => {
    return request({url: `/api/services`, method: 'get'});
}
export const useServicesData = () => {
    return useQuery("services", fetchServices);
}