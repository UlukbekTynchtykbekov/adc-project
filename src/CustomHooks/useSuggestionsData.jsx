import {useQuery} from "react-query";
import axios from "axios";

const fetchSuggestions = () => {
    return axios.get("https://adc-mern-stack.herokuapp.com/api/suggestion");
}
export const useSuggestionsData = () => {
    return useQuery("suggestions", fetchSuggestions,
        {
            refetchOnWindowFocus: false
        });
}