import {useQuery} from "react-query";
import {request} from "../utils/axios-utils";

const fetchFavorite = (userId) => {
    return request({url: `/api/favorite/${userId}`, method: 'GET'});
}
export const useFavoriteData = (userId) => {
    return useQuery( ["favorite", userId], () => fetchFavorite(userId), {
        enabled: !!userId
    });
}