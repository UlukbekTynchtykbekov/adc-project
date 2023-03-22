import {useQuery} from "react-query";
import axios from "axios";

const fetchArchitecture = () => {
    return axios.get("https://adc-mern-stack.herokuapp.com/api/projects");
}
export const useProjectsData = () => {
    return useQuery("projects", fetchArchitecture,
        {
            refetchOnWindowFocus: false
        });
}