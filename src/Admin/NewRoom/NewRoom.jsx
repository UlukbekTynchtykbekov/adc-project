import React, {useEffect, useRef, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import {useAddRoom, useSingleRoomData, useUpdateRoom} from "../../CustomHooks/useRoomData";
import { showSuccessNotification, showErrorNotification } from "../../CustomHooks/useToast"
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import {useSelector} from "react-redux";

const NewRoom = () => {
    const [formData, setFormData] = useState({
        quantity: 0,
    });
    const [formErrors, setFormErrors] = useState({});
    const {openSidebar} = useSelector(state => state.sidebar);
    const elementRefs = useRef(null);
    const {id: roomId} = useParams();

    const {mutate: addRoom, data: addedRoomData, isLoading: addRoomLoading, isError: addIsError} = useAddRoom(showSuccessNotification, showErrorNotification);
    const {data: roomData, isLoading: roomLoading, isError, error} = useSingleRoomData(roomId);
    const {mutate: updateRoom, data: updatedRoomData, isLoading: updateLoading, isError: updateIsError} = useUpdateRoom(showSuccessNotification, showErrorNotification)

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const onSubmitProduct = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            if (roomId) {
                updateRoom({roomId, ...formData})
            } else {
                addRoom(formData)
            }
        }
    }

    const validateForm = (data) => {
        const errors = {};

        if (!data.quantity) {
            errors.quantity = "Количество комнат должно быть больше 0";
        }

        return errors;
    };

    useEffect(() => {
        if (roomData?.data) {
            setFormData((prevState) => ({
                ...prevState,
                quantity: roomData?.data.quantity
            }))
        }
        if (elementRefs.current) {
            elementRefs.current.classList.toggle('close', openSidebar);
        }
    }, [roomData?.data, openSidebar])

    if (addedRoomData?.data || updatedRoomData?.data) {
        return <Navigate to="/admin/rooms"/>
    }

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                {
                    roomLoading &&  <Loader />
                }

                {
                    isError && <Error status={error?.status} page={error?.message}/>
                }
                {
                    !roomLoading && !isError && <div ref={elementRefs} className="new">
                        <div className="new__wrapper">
                            <h2 className="new__text">Добавить комнату</h2>
                        </div>
                        <form className="formik" onSubmit={onSubmitProduct}>
                            <div className="formik__group">
                                <h2 className="formik__text">Количество комнат</h2>
                                <input
                                    className="formik__input"
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    placeholder="Количество комнат"
                                    onChange={handleInputChange}
                                />
                                {
                                    formErrors.quantity && <p className="formik__error">*{formErrors.quantity}</p>
                                }
                            </div>
                            <button
                                className={addRoomLoading || updateLoading ? "button formik__button-disabled" : "button formik__button"}
                                type="submit" disabled={addRoomLoading || updateLoading}>добавить
                            </button>
                            {
                                addRoomLoading || updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                            }
                            {
                                addIsError || updateIsError ? <div>
                                    <p className="formik__error">Количество комнат проекта уже существует или вы должны
                                        правильно заполнить все данные</p>
                                </div> : null
                            }
                        </form>
                    </div>
                }
            </div>
        </section>
    );
};

export default NewRoom;