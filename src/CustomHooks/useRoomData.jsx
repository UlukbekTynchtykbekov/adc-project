import {useMutation, useQuery, useQueryClient} from "react-query";
import {request} from "../utils/axios-utils";

const fetchRooms = () => {
    return request({url: `/api/rooms`, method: 'GET'});
}
export const useRoomData = () => {
    return useQuery("rooms", fetchRooms);
}

const fetchSingleRoom = ({queryKey}) => {
    const roomId = queryKey[1]
    return request({url: `/api/rooms/${roomId}`, method: 'GET'});
}
export const useSingleRoomData = (roomId) => {
    return useQuery( ["room", roomId], fetchSingleRoom, {
        enabled: !!roomId
    });
}

const fetchAddRoom = (room) => {
    return request({url: '/api/rooms', method: 'POST', data: room})
}
export const useAddRoom = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchAddRoom, {
        onSuccess: () => {
            queryClient.invalidateQueries("rooms");
        },
    });
}

const fetchUpdateRoom = (room) => {
    const updatedProject = {...room};
    delete room.roomId
    return request({url: `/api/rooms/${updatedProject.roomId}`, method: 'PUT', data: room})
}
export const useUpdateRoom = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateRoom, {
        onSuccess: () => {
            queryClient.invalidateQueries("rooms");
        },
    });
}

const fetchDeleteRoom = (roomId) => {
    return request({url: `/api/rooms/${roomId}`, method: 'DELETE'})
}
export const useDeleteRoom = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteRoom, {
        onSuccess: () => {
            queryClient.invalidateQueries("rooms");
        },
    });
}