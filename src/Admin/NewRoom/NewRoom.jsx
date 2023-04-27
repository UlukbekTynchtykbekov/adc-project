import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import {useAddRoom, useSingleRoomData, useUpdateRoom} from "../../CustomHooks/useRoomData";

const NewRoom = () => {
    const [room, setRoom] = useState(0);
    const [roomsError, setRoomsError] = useState("");
    const {id: roomId} = useParams();

    const {mutate: addRoom, data: addedRoomData, isLoading: addRoomLoading} = useAddRoom();
    const {data: roomData, isLoading: roomLoading, isError: roomIsError, error: roomError} = useSingleRoomData(roomId);
    const {mutate: updateRoom, data:updatedRoomData, isLoading: updateLoading} = useUpdateRoom()
    const onSubmitProduct = (e) => {
        e.preventDefault();
        if (room < 1){
            setRoomsError("Количество комнат должно быть больше 0")
        }

        const newRoom = {
            quantity: room
        }

        if (roomId){
            updateRoom({roomId, ...newRoom})
        }else{
            addRoom(newRoom)
        }
    }

    useEffect(() => {
        if (roomData?.data){
            setRoom(roomData?.data.quantity);
        }
    }, [roomData?.data])

    if(addedRoomData?.data || updatedRoomData?.data){
        return <Navigate to="/admin/rooms"/>
    }

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                {
                    roomLoading &&  <div style={{color: "white"}}>Loading...</div>
                }

                {
                    roomIsError &&  <div style={{color: "white"}}>{roomError?.message}</div>
                }
                <div className="new">
                    <div className="new__wrapper">
                        <h2 className="new__text">Добавить комнату</h2>
                    </div>
                    <form className="formik" onSubmit={onSubmitProduct}>
                        <div className="formik__group">
                            <h2 className="formik__text">Количество комнат</h2>
                            <input
                                className="formik__input"
                                type="number"
                                value={room}
                                placeholder="Количество комнат"
                                onChange={(e) => setRoom(e.target.value)}
                            />
                            {
                                roomsError && <p className="formik__error">*{roomsError}</p>
                            }
                        </div>
                        <button className={ addRoomLoading || updateLoading ? "button formik__button-disabled" : "button formik__button"} type="submit" disabled={addRoomLoading || updateLoading}>добавить</button>
                        {
                            addRoomLoading || updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                        }
                        {
                            addedRoomData?.response.data || updatedRoomData?.response.data ? <div>
                                <p className="formik__error">Количество комнат проекта уже существует или вы должны правильно заполнить все данные</p>
                            </div> : null
                        }
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewRoom;