import {useMutation} from "react-query";
import axios from "axios";

const telegramBotId = process.env.REACT_APP_TELEGRAM_BOT_ID;
const chat_id = process.env.REACT_APP_TELEGRAM_CHAT_ID;
const senMessage = (data) => {
    return axios.post(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {chat_id: chat_id,
        text: data,});
}
export const useSendMessage = (onSuccess, onError) => {
    return useMutation(senMessage, {
        onSuccess: () => {
            onSuccess("Ваша заявка успешно отправлена")
        },
        onError: () => {
            onError("Не удалось отправить заявку")
        }
    })
}