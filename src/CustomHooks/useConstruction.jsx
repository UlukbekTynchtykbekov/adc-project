import {useQuery} from "react-query";
import {request} from "../utils/axios-utils";

const fetchConstruction = () => {
    return request({url: `/api/constructions`, method: 'GET'});
}
export const useConstructionData = () => {
    return useQuery("constructions", fetchConstruction);
}