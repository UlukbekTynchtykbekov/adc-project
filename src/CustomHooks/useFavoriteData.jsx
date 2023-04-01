import {useQuery} from "react-query";
import {request} from "../utils/axios-utils";

const fetchFavorite = ({queryKey}) => {
    const userId = queryKey[1]
    return request({url: `/api/favorite/${userId}`, method: 'get'});
}
export const useFavoriteData = (userId) => {
    return useQuery( ["favorite", userId], fetchFavorite);
}