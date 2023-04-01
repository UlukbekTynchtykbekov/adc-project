import {useQuery} from "react-query";
import {request} from "../utils/axios-utils";

const fetchSuggestions = () => {
    return request({url: `/api/suggestion`, method: 'get'});
}
export const useSuggestionsData = () => {
    return useQuery("suggestions", fetchSuggestions);
}