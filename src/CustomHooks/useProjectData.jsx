import {useQuery} from "react-query";
import axios from "axios";

const fetchProject = ({queryKey}) => {
    const projectId = queryKey[1]
    return axios.get(`https://adc-mern-stack.herokuapp.com/api/projects/${projectId}`);
}
export const useProjectData = (projectId) => {
    return useQuery( ["project", projectId], fetchProject,
        {
            refetchOnWindowFocus: false
        });
}