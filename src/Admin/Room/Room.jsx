import React, {useMemo, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Dropdown from "../../components/Dropdown";
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import RoomCard from "../RoomCard/RoomCard";
import {useRoomData} from "../../CustomHooks/useRoomData";

const Room = () => {
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState("");

    const {data: roomData, isLoading: roomDataLoading, isError: roomDataIsError, error: roomDataError} = useRoomData();

    const sortedAndFilteredRoom = useMemo(() => {
        let sortedRooms = [];
        let roomOptions = []

        if (roomData?.data) {
            for (const obj of roomData?.data) {
                const room = obj.quantity;
                roomOptions.push(room)
                setOptions(roomOptions)
            }
            if(selected === ''){
                sortedRooms = roomData?.data
            }else{
                sortedRooms = roomData?.data.filter(room => +room.quantity === +selected);
            }
        }

        return sortedRooms;
    }, [roomData?.data, selected]);

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div className="product">
                    <div className="table product__table">
                        <div className="table__header">
                            <h1 className="table__title">Квадраты</h1>
                            <div className="table__filter">
                                <Dropdown options={options} selected={selected} setSelected={setSelected}/>
                                <Link to="/admin/rooms/new">
                                    <button className="button product__add-btn">
                                        Добавить
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="table__body">
                            {roomDataLoading && <div>Loading....</div>}
                            {roomDataIsError && <div>{roomDataError?.message}</div>}
                            {
                                sortedAndFilteredRoom.length > 0 && <table className="table__main">
                                    <thead className="table__head">
                                    <tr className="table__category-list">
                                        <th className="table__category-name">Номер</th>
                                        <th className="table__category-name">Квадраты</th>
                                        <th className="table__category-name">Проекты</th>
                                        <th className="table__category-name">Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table__field">
                                    {
                                        sortedAndFilteredRoom.map((el, idx) => (
                                            <RoomCard key={el._id} el={el} idx={idx}/>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            }
                            {
                                !roomDataLoading && sortedAndFilteredRoom.length === 0 &&  <div>Нет данных</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </section>
    );
};

export default Room;