import {useQuery} from "react-query";
import {request} from "../utils/axios-utils";

const fetchFavorite = () => {
    return request({url: `/api/favorite`, method: 'GET'});
}
export const useFavoriteData = () => {
    return useQuery( "favorite", fetchFavorite);
}