import axios from "axios";
import {useQuery} from "react-query";

const fetchProjectInfo = () => {
    return axios.get(`https://adc-mern-stack.herokuapp.com/api/project-info`);
}
export const useProjectInfo = () => {
    return useQuery( "project-info", fetchProjectInfo,
        {
            refetchOnWindowFocus: false
        });
}