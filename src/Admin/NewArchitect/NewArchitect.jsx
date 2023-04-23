import React, {useEffect, useState} from 'react';
import './new-architect.scss'
import Sidebar from "../../components/Sidebar/Sidebar";
import {request} from "../../utils/axios-utils";
import {useAddArchitect, useSingleArchitectData, useUpdateArchitect} from "../../CustomHooks/useArchitectData";
import {Navigate, useParams} from "react-router-dom";
import UploadImages from "../UploadImages/UploadImages";

const NewArchitect = () => {

    const [firstname, setFirstname] = useState("");
    const [firstnameError, setFirstnameError] = useState("");
    const [lastname, setLastname] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [bio, setBio] = useState("");
    const [images, setImages] = useState([]);
    const [imagesError, setImagesError] = useState("");

    const {id: architectId} = useParams();

    const {mutate: addArchitect, data: addedArchitectData, isLoading: addArchitectLoading} = useAddArchitect();
    const {data: architectData, isLoading: architectLoading, isError: architectIsError, error: architectError} = useSingleArchitectData(architectId);
    const {mutate: updateArchitect, data:updatedArchitectData, isLoading: updateLoading} = useUpdateArchitect()

    const uploadPhoto = (e) => {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("images", files[i]);
        }
        return request({url: '/api/upload', method: 'POST', data: data})
            .then(response => {
                const {data} = response;
                setImages(prev => {
                    return [...prev, ...data?.data]
                })
            })
    }

    const deleteImage = (id) => {
        const findId = images.find(img => img.public_id === id);
        if (findId){
            setImages(prevState => {
                return images.filter(img => img.public_id !== id);
            })
        }
    }

    const selectArchitectMainPhoto = (id) => {
        const mainImage = images.find(img => img.public_id === id);
        const addedPhotosWithoutSelected = images.filter(img => img.public_id !== id);
        const newAddedPhotos = [mainImage, ...addedPhotosWithoutSelected];
        setImages(newAddedPhotos)
    }

    const onSubmitProduct = (e) => {
        e.preventDefault();
        if (firstname.length < 3 && firstname.length < 200){
            setFirstnameError("Название должно быть больше 3 букв и меньше 200 букв")
        }

        if (lastname.length < 3 && lastname.length < 200){
            setLastnameError("Название должно быть больше 3 букв и меньше 200 букв")
        }

        if (!dateOfBirth.length){
            setDateOfBirthError("Обязательное поле")
        }

        if (!images.length){
            setImagesError("Обязательное поле")
        }

        const newArchitect = {
            firstname, lastname,
            dateOfBirth,
            bio, images,
        }

        if (architectId){
            updateArchitect({architectId, ...newArchitect})
        }else{
            addArchitect(newArchitect)
        }
    }

    useEffect(() => {
        if (architectData?.data){
            const dateString = architectData?.data.dateOfBirth;
            const dateParts = dateString.split("T");
            const date = dateParts[0];

            setFirstname(architectData?.data.firstname);
            setLastname(architectData?.data.lastname);
            setDateOfBirth(date);
            setBio(architectData?.data.bio);
            setImages(architectData?.data.images)
        }
    }, [architectData?.data])

    if (addedArchitectData?.data || updatedArchitectData?.data){
        return <Navigate to="/admin/architect"/>
    }

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                {
                    architectLoading &&  <div style={{color: "white"}}>Loading...</div>
                }

                {
                    architectIsError &&  <div style={{color: "white"}}>{architectError?.message}</div>
                }
                <div className="new">
                    <div className="new__wrapper">
                        <h2 className="new__text">Добавить архитектор</h2>
                    </div>
                    <form className="formik" onSubmit={onSubmitProduct}>
                        <div className="formik__group">
                            <h2 className="formik__text">Имя</h2>
                            <input
                                className="formik__input"
                                type="text"
                                value={firstname}
                                placeholder="Имя архитектора"
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            {
                                firstnameError && <p className="formik__error">*{firstnameError}</p>
                            }
                        </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Фамилия</h2>
                            <input
                                className="formik__input"
                                type="text"
                                value={lastname}
                                placeholder="Фамилия архитектора"
                                onChange={(e) => setLastname(e.target.value)}
                            />
                            {
                                lastnameError && <p className="formik__error">*{lastnameError}</p>
                            }
                        </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Дата рождения</h2>
                            <input
                                className="formik__input"
                                type="date"
                                value={dateOfBirth}
                                placeholder="Дата рождения"
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                            {
                                dateOfBirthError && <p className="formik__error">*{dateOfBirthError}</p>
                            }
                        </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Краткая биография</h2>
                            <textarea
                                className="formik__input formik__input-textarea"
                                placeholder="Краткая биография"
                                cols="30"
                                rows="10"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <UploadImages text="Фото" photos={images} deletePhoto={deleteImage} uploadPhoto={uploadPhoto} photosError={imagesError} selectMainPhoto={selectArchitectMainPhoto}/>
                        <button className={ addArchitectLoading || updateLoading ? "button formik__button-disabled" : "button formik__button"} type="submit" disabled={addArchitectLoading || updateLoading}>добавить</button>
                        {
                            addArchitectLoading || updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                        }
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewArchitect;