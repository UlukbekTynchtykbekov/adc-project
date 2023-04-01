import {useQuery} from "react-query";
import {request} from "../utils/axios-utils";

const fetchArchitecture = () => {
    return request({url: `/api/projects`, method: 'get'});
}
export const useProjectsData = () => {
    return useQuery("projects", fetchArchitecture);
}