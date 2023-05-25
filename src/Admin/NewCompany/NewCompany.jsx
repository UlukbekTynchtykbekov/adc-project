import React, {useEffect, useRef, useState} from 'react';
import TimePicker from 'react-time-picker';
import {Navigate, useParams} from "react-router-dom";
import {request} from "../../utils/axios-utils";
import Sidebar from "../../components/Sidebar/Sidebar";
import UploadImages from "../UploadImages/UploadImages";
import {useSingleCompanyData, useUpdateCompany} from "../../CustomHooks/useCompanyData";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {showSuccessNotification, showErrorNotification} from "../../CustomHooks/useToast"
import "./new-company.scss"
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import {useSelector} from "react-redux";

const NewCompany = () => {
        const [formData, setFormData] = useState({
            name: "",
            title: "",
            desc: "",
            street: "",
            city: "",
            state: "",
            phoneNumber: +996,
            suggestionPhoneNumber: +996,
            email: "",
            images: [],
            workSchedule: [{
                fromTime: "",
                toTime: ""
            }]
        });

        const [formErrors, setFormErrors] = useState({});
        const {openSidebar} = useSelector(state => state.sidebar);
        const elementRefs = useRef(null);
        const {id: companyId} = useParams();

        const {
            data: singleCompany,
            isLoading: singleCompanyLoading,
            isError: singleCompanyIsError,
            error: singleCompanyError
        } = useSingleCompanyData(companyId);

        const {
            mutate: updateCompany,
            data: updatedCompanyData,
            isLoading: updateLoading
        } = useUpdateCompany(showSuccessNotification, showErrorNotification)

        const handleInputChange = (event) => {
            const {name, value, files} = event.target;
            if (name === "images") {
                const data = new FormData();
                for (let i = 0; i < files.length; i++) {
                    data.append("images", files[i]);
                }
                return request({url: '/api/upload', method: 'POST', data: data})
                    .then(response => {
                        const {data} = response;
                        setFormData((prevState) => ({
                            ...prevState,
                            images: [...prevState.images, ...data?.data]
                        }));
                    })
            } else if (name.startsWith("workSchedule")) {
                const [fieldName, index, subFieldName] = name.split(".");
                setFormData((prevFormData) => {
                    const newWorkSchedule = [...prevFormData.workSchedule];
                    newWorkSchedule[index][subFieldName] = value;
                    return {...prevFormData, workSchedule: newWorkSchedule};
                });
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
            }
        };

        const deletePhoto = (id) => {
            const findId = formData.exterior.find(img => img.public_id === id);
            if (findId) {
                setFormData((prevState) => ({
                    ...prevState,
                    images: formData.images.filter(img => img.public_id !== id)
                }));
            }
        }

        const selectMainPhoto = (id) => {
            const mainImage = formData.images.find(img => img.public_id === id);
            const addedPhotosWithoutSelected = formData.images.filter(img => img.public_id !== id);
            const newAddedPhotos = [mainImage, ...addedPhotosWithoutSelected];
            setFormData((prevState) => ({
                ...prevState,
                images: [...newAddedPhotos]
            }));
        }

        const onSubmitProduct = (e) => {
            e.preventDefault();
            const errors = validateInputs(formData);
            setFormErrors(errors);

            if (Object.keys(errors).length === 0) {
                updateCompany({companyId, ...formData})
            }
        }

        function validateInputs(inputData) {
            let errors = {};
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const types = ["png", "jpeg", "jpg"]

            if (!inputData.name.trim()) {
                errors.name = "Обязательное поле"
            }
            if (!inputData.title.trim()) {
                errors.title = "Обязательное поле"
            }
            if (!inputData.desc.trim()) {
                errors.desc = "Обязательное поле"
            }
            if (!inputData.street.trim()) {
                errors.street = "Обязательное поле"
            }
            if (!inputData.city.trim()) {
                errors.city = "Обязательное поле"
            }
            if (!inputData.state) {
                errors.state = "Обязательное поле"
            }
            if (!inputData.phoneNumber) {
                errors.phoneNumber = "Обязательное поле"
            }
            if (!inputData.suggestionPhoneNumber) {
                errors.suggestionPhoneNumber = "Обязательное поле"
            }
            if (!inputData.email) {
                errors.email = "Электронная почта обязательна"
            } else if (!re.test(String(inputData.email).toLowerCase())) {
                errors.email = 'Электронная почта недействительна';
            }

            for (let i = 0; i < inputData.images.length; i++) {
                const file = inputData.images[i];
                const fileType = file.format;
                if (!types.includes(fileType)) {
                    errors.images = "Разрешены только изображения.";
                }
            }
            for (let i = 0; i < inputData.workSchedule.length; i++) {
                const item = inputData.workSchedule[i];
                if (!item.fromTime.trim() || !item.toTime.trim()) {
                    errors.workSchedule = "Время работы должно быть указано для каждого дня.";
                    break;
                }
            }

            return errors;
        }

        useEffect(() => {
            if (singleCompany?.data) {
                const {
                    name,
                    title,
                    desc,
                    street,
                    city,
                    state,
                    phoneNumber,
                    suggestionPhoneNumber,
                    email,
                    images,
                    workSchedule
                } = singleCompany?.data;

                setFormData((prevState) => ({
                    ...prevState,
                    name,
                    title,
                    desc,
                    street,
                    city,
                    state,
                    phoneNumber,
                    suggestionPhoneNumber,
                    email,
                    images,
                    workSchedule,
                }));
            }
            if (elementRefs.current) {
                elementRefs.current.classList.toggle('close', openSidebar);
            }
        }, [singleCompany?.data, openSidebar])

        if (updatedCompanyData?.status === 200) {
            return <Navigate to="/admin/company"/>
        }

        return (
            <section className="dashboard">
                <div className="row">
                    <Sidebar/>
                    {
                        singleCompanyLoading && <Loader/>
                    }

                    {
                        singleCompanyIsError &&
                        <Error status={singleCompanyError?.status} page={singleCompanyError?.message}/>
                    }
                    <div ref={elementRefs} className="new">
                        <div className="new__wrapper">
                            <h2 className="new__text">Добавить компанию</h2>
                        </div>
                        <form onSubmit={onSubmitProduct} className="formik">
                            <div className="formik__group">
                                <h2 className="formik__text">Название</h2>
                                <input
                                    className="formik__input"
                                    value={formData.name}
                                    type="text"
                                    name="name"
                                    onChange={handleInputChange}
                                    placeholder="Название компании"/>
                                {
                                    formErrors.name && <p className="formik__error">*{formErrors.name}</p>
                                }
                            </div>
                            <div className="formik__group">
                                <h2 className="formik__text">Заголовок</h2>
                                <input
                                    className="formik__input"
                                    value={formData.title}
                                    type="text"
                                    name="title"
                                    onChange={handleInputChange}
                                    placeholder="Заголовок компании"/>
                                {
                                    formErrors.title && <p className="formik__error">*{formErrors.title}</p>
                                }
                            </div>
                            <div className="formik__group">
                                <h2 className="formik__text">Краткое описание</h2>
                                <textarea
                                    className="formik__input formik__input-textarea"
                                    value={formData.desc}
                                    placeholder="Описание компании"
                                    name="desc"
                                    id=""
                                    cols="30"
                                    rows="10"
                                    onChange={handleInputChange}
                                >
                            </textarea>
                                {
                                    formErrors.desc && <p className="formik__error">*{formErrors.desc}</p>
                                }
                            </div>
                            <div className="formik__group">
                                <h2 className="formik__text">Улица</h2>
                                <input
                                    className="formik__input"
                                    value={formData.street}
                                    type="text"
                                    name="street"
                                    onChange={handleInputChange}
                                    placeholder="Улица"/>
                                {
                                    formErrors.street && <p className="formik__error">*{formErrors.street}</p>
                                }
                            </div>
                            <div className="formik__group">
                                <h2 className="formik__text">Город</h2>
                                <input
                                    className="formik__input"
                                    value={formData.city}
                                    type="text"
                                    name="city"
                                    onChange={handleInputChange}
                                    placeholder="Город"/>
                                {
                                    formErrors.city && <p className="formik__error">*{formErrors.city}</p>
                                }
                            </div>
                            <div className="formik__group">
                                <h2 className="formik__text">Страна</h2>
                                <input
                                    className="formik__input"
                                    value={formData.state}
                                    type="text"
                                    name="state"
                                    onChange={handleInputChange}
                                    placeholder="Страна"/>
                                {
                                    formErrors.state && <p className="formik__error">*{formErrors.state}</p>
                                }
                            </div>
                            <div className="formik__group">
                                <h2 className="formik__text">Номер телефона</h2>
                                <input
                                    className="formik__input"
                                    value={formData.phoneNumber}
                                    type="number"
                                    name="phoneNumber"
                                    onChange={handleInputChange}
                                    placeholder="Номер телефона"/>
                                {
                                    formErrors.phoneNumber && <p className="formik__error">*{formErrors.phoneNumber}</p>
                                }
                            </div>
                            <div className="formik__group">
                                <h2 className="formik__text">Номер телефона для консультации</h2>
                                <input
                                    className="formik__input"
                                    value={formData.suggestionPhoneNumber}
                                    type="number"
                                    name="suggestionPhoneNumber"
                                    onChange={handleInputChange}
                                    placeholder="Номер телефона для консультации"/>
                                {
                                    formErrors.suggestionPhoneNumber &&
                                    <p className="formik__error">*{formErrors.suggestionPhoneNumber}</p>
                                }
                            </div>
                            <div className="formik__group">
                                <h2 className="formik__text">Электронная почта компании</h2>
                                <input
                                    className="formik__input"
                                    value={formData.email}
                                    type="text"
                                    name="email"
                                    onChange={handleInputChange}
                                    placeholder="Электронная почта компании"/>
                                {
                                    formErrors.email && <p className="formik__error">*{formErrors.email}</p>
                                }
                            </div>
                            <UploadImages namePhoto="images" text="Фото"
                                          photos={formData.images}
                                          deletePhoto={deletePhoto}
                                          uploadPhoto={handleInputChange} photosError={formErrors.images}
                                          selectMainPhoto={selectMainPhoto}/>
                            <div className="formik__group">
                                <h2 className="formik__text">График работы</h2>
                                <div className="formik__timepicker">
                                    <label htmlFor="fromTime">От: </label>
                                    <TimePicker
                                        id="fromTime"
                                        name="workSchedule.0.fromTime"
                                        value={formData.workSchedule[0].fromTime}
                                        className="my-time-picker"
                                        onChange={date => handleInputChange({
                                            target: {
                                                value: date,
                                                name: "workSchedule.0.fromTime"
                                            }
                                        })}
                                    />
                                </div>
                                <div className="formik__timepicker">
                                    <label htmlFor="toTime">До: </label>
                                    <TimePicker
                                        id="toTime"
                                        name="workSchedule.0.toTime"
                                        value={formData.workSchedule[0].toTime}
                                        className="my-time-picker"
                                        onChange={date => handleInputChange({
                                            target: {
                                                value: date,
                                                name: 'workSchedule.0.toTime'
                                            }
                                        })}
                                    />
                                </div>
                                {
                                    formErrors.workSchedule && <p className="formik__error">*{formErrors.workSchedule}</p>
                                }
                            </div>
                            {
                                updatedCompanyData?.response?.data && <div className="formik__error">
                                    <p className="login__message-title">*{updatedCompanyData?.response?.data}</p>
                                </div>
                            }
                            <button
                                className={updateLoading ? "button formik__button-disabled" : "button formik__button"}
                                type="submit" disabled={updateLoading}>добавить
                            </button>
                            {
                                updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                            }
                        </form>
                    </div>
                </div>
            </section>
        );
    }
;

export default NewCompany;