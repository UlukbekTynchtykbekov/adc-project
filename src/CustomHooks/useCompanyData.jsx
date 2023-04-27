import {request} from "../utils/axios-utils";
import {useQuery} from "react-query";


const fetchCompany = () => {
    return request({url: `/api/company`, method: 'GET'});
}
export const useCompanyData = () => {
    return useQuery("constructions", fetchCompany);
}
