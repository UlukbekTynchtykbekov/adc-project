import {useQuery} from "react-query";
import {request} from "../utils/axios-utils";

const fetchProject = ({queryKey}) => {
    const projectId = queryKey[1]
    return request({url: `/api/projects/${projectId}`, method: 'GET'});
}
export const useProjectData = (projectId) => {
    return useQuery( ["project", projectId], fetchProject, {
        enabled: !!projectId
    });
}