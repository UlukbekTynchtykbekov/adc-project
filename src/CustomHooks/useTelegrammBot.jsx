import {useMutation} from "react-query";
import axios from "axios";

const telegramBotId = "6206777064:AAG4YCVtKKoEM-ZWusXSZQ-KQEj7fz5cB4Q";
const chat_id = 1067940689;
const senMessage = (data) => {
    return axios.post(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {chat_id: chat_id,
        text: data,});
}
export const useSendMessage = () => {
    return useMutation(senMessage)
}