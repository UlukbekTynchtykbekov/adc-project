import {useQuery} from "react-query";
import {request} from "../utils/axios-utils";

const fetchProjectInfo = () => {
    return request({url: `/api/project-info`,  method: 'get'});
}
export const useProjectInfo = () => {
    return useQuery( "project-info", fetchProjectInfo);
}