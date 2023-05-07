import React, {useEffect, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {request} from "../../utils/axios-utils";
import {useArchitectData} from "../../CustomHooks/useArchitectData";
import {useCategoriesData} from "../../CustomHooks/useCategoriesData";
import {useRoomData} from "../../CustomHooks/useRoomData";
import {useSquareData} from "../../CustomHooks/useSquareData";
import {useAddProject, useUpdateProject, useProjectData} from "../../CustomHooks/useProjectsData";
import {Navigate, useParams} from "react-router-dom";
import "./new-project.scss"
import UploadImages from "../UploadImages/UploadImages";
import FormGroup from "../FormGroup/FormGroup";

const NewProject = () => {
    const [formData, setFormData] = useState({
        name: "",
        shortDesc: "",
        exterior: [],
        interior: [],
        design: [],
        architectId: "",
        categoryId: "",
        roomId: "",
        squareId: ""
    });

    const [formErrors, setFormErrors] = useState({});

    const {id: projectId} = useParams();

    const {data: architects, isLoading: architectsLoading} = useArchitectData();
    const {data: categories, isLoading: categoriesLoading} = useCategoriesData();
    const {data: rooms, isLoading: roomsLoading} = useRoomData();
    const {data: squares, isLoading: squaresLoading} = useSquareData();
    const {mutate: addProject, data: addedProjectData, isLoading: addedProjectLoading} = useAddProject();
    const {
        data: singleProject,
        isLoading: singleProjectLoading,
    } = useProjectData(projectId);
    const {mutate: updateProject, data: updatedProjectData, isLoading: updateLoading} = useUpdateProject();

    const handleInputChange = (event) => {
        const {name, value, files} = event.target;
        if (name === "exterior") {
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                data.append("images", files[i]);
            }
            return request({url: '/api/upload', method: 'POST', data: data})
                .then(response => {
                    const {data} = response;
                    setFormData((prevState) => ({
                        ...prevState,
                        exterior: [...prevState.exterior, ...data?.data]
                    }));
                })
        } else if (name === "interior") {
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                data.append("images", files[i]);
            }
            return request({url: '/api/upload', method: 'POST', data: data})
                .then(response => {
                    const {data} = response;
                    setFormData((prevState) => ({
                        ...prevState,
                        interior: [...prevState.interior, ...data?.data]
                    }));
                })
        } else if (name === "design") {
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                data.append("images", files[i]);
            }
            return request({url: '/api/upload', method: 'POST', data: data})
                .then(response => {
                    const {data} = response;
                    setFormData((prevState) => ({
                        ...prevState,
                        design: [...prevState.design, ...data?.data]
                    }));
                })
        }else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const deleteExteriorPhoto = (id) => {
        const findId = formData.exterior.find(img => img.public_id === id);
        if (findId) {
            setFormData((prevState) => ({
                ...prevState,
                exterior: formData.exterior.filter(img => img.public_id !== id)
            }));
        }
    }

    const deleteInteriorPhoto = (id) => {
        const findId = formData.interior.find(img => img.public_id === id);
        if (findId) {
            setFormData((prevState) => ({
                ...prevState,
                interior: formData.interior.filter(img => img.public_id !== id)
            }));
        }
    }

    const deleteDesignPhoto = (id) => {
        const findId = formData.design.find(img => img.public_id === id);
        if (findId) {
            setFormData((prevState) => ({
                ...prevState,
                design: formData.design.filter(img => img.public_id !== id)
            }));
        }
    }

    const selectExteriorMainPhoto = (id) => {
        const mainImage = formData.exterior.find(img => img.public_id === id);
        const addedPhotosWithoutSelected = formData.exterior.filter(img => img.public_id !== id);
        const newAddedPhotos = [mainImage, ...addedPhotosWithoutSelected];
        setFormData((prevState) => ({
            ...prevState,
            exterior: [...newAddedPhotos]
        }));
    }

    const selectInteriorMainPhoto = (id) => {
        const mainImage = formData.interior.find(img => img.public_id === id);
        const addedPhotosWithoutSelected = formData.interior.filter(img => img.public_id !== id);
        const newAddedPhotos = [mainImage, ...addedPhotosWithoutSelected];
        setFormData((prevState) => ({
            ...prevState,
            interior: [...newAddedPhotos]
        }));
    }

    const selectDesignMainPhoto = (id) => {
        const mainImage = formData.design.find(img => img.public_id === id);
        const addedPhotosWithoutSelected = formData.design.filter(img => img.public_id !== id);
        const newAddedPhotos = [mainImage, ...addedPhotosWithoutSelected];
        setFormData((prevState) => ({
            ...prevState,
            design: [...newAddedPhotos]
        }));
    }

    const onSubmitProduct = (e) => {
        e.preventDefault();
        const errors = validateInputs(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            if (projectId) {
                updateProject({projectId, ...formData})
            } else {
                addProject(formData)
            }
        }
    }

    function validateInputs(inputData) {
        let errors = {};
        const types = ["png", "jpeg", "jpg"]

        if (inputData.name.trim().length < 3 && inputData.name.trim().length < 200) {
            errors.name = "Название должно быть больше 3 букв и меньше 200 букв"
        }
        if (inputData.shortDesc.trim().length < 3 && inputData.shortDesc.trim().length < 50) {
            errors.shortDesc = "Краткое описание должно быть больше 3 букв и меньше 50 букв"
        }
        if (inputData.exterior.length < 3) {
            errors.exterior = "Экстерьер фото должно быть больше 2";
        }

        for (let i = 0; i < inputData.exterior.length; i++) {
            const file = inputData.exterior[i];
            const fileType = file.format;
            if (!types.includes(fileType)) {
                errors.exterior = "Разрешены только изображения.";
            }
        }

        if (inputData.interior.length < 3) {
            errors.interior = "Экстерьер фото должно быть больше 2";
        }

        for (let i = 0; i < inputData.interior.length; i++) {
            const file = inputData.interior[i];
            const fileType = file.format;
            if (!types.includes(fileType)) {
                errors.interior = "Разрешены только изображения.";
            }
        }

        for (let i = 0; i < inputData.design.length; i++) {
            const file = inputData.design[i];
            const fileType = file.format;
            if (!types.includes(fileType)) {
                errors.design = "Разрешены только изображения.";
            }
        }

        if (!inputData.architectId) {
            errors.architectId = "Обязательное поле"
        }
        if (!inputData.categoryId) {
            errors.categoryId = "Обязательное поле"
        }
        if (!inputData.roomId) {
            errors.roomId = "Обязательное поле"
        }
        if (!inputData.squareId) {
            errors.squareId = "Обязательное поле"
        }

        return errors;
    }

    useEffect(() => {
        if (singleProject?.data) {
            const {
                name,
                shortDesc,
                exterior,
                interior,
                design,
                architect,
                category,
                room,
                square
            } = singleProject?.data;

            setFormData((prevState) => ({
                ...prevState,
                name,
                shortDesc,
                exterior,
                interior,
                design,
                architectId: architect._id,
                categoryId: category._id,
                roomId: room._id,
                squareId: square._id
            }));
        }
    }, [singleProject?.data])

    if (addedProjectData?.data || updatedProjectData?.data) {
        return <Navigate to="/admin/projects"/>
    }

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                {
                    singleProjectLoading &&  <div style={{color: "white"}}>Loading...</div>
                }
                {
                    singleProject?.message ||
                    architects?.message ||
                    categories?.message ||
                    rooms?.message ||
                    squares?.message ?
                        <div style={{color: "white"}}>ERROR 404</div>
                        :
                        <div className="new">
                            <div className="new__wrapper">
                                <h2 className="new__text">Добавить проект</h2>
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
                                        placeholder="Название проекта"/>
                                    {
                                        formErrors.name && <p className="formik__error">*{formErrors.name}</p>
                                    }
                                </div>
                                <div className="formik__group">
                                    <h2 className="formik__text">Краткое описание</h2>
                                    <textarea
                                        className="formik__input formik__input-textarea"
                                        value={formData.shortDesc}
                                        placeholder="Краткое описание проекта"
                                        name="shortDesc"
                                        id=""
                                        cols="30"
                                        rows="10"
                                        onChange={handleInputChange}
                                    >
                            </textarea>
                                    {
                                        formErrors.shortDesc && <p className="formik__error">*{formErrors.shortDesc}</p>
                                    }
                                </div>
                                <UploadImages namePhoto="exterior" text="Экстерьер фото" photos={formData.exterior} deletePhoto={deleteExteriorPhoto}
                                              uploadPhoto={handleInputChange} photosError={formErrors.exterior}
                                              selectMainPhoto={selectExteriorMainPhoto}/>
                                <UploadImages namePhoto="interior" text="Интерьер фото" photos={formData.interior} deletePhoto={deleteInteriorPhoto}
                                              uploadPhoto={handleInputChange} photosError={formErrors.interior}
                                              selectMainPhoto={selectInteriorMainPhoto}/>
                                <UploadImages namePhoto="design" text="Дизайн фото" photos={formData.design} deletePhoto={deleteDesignPhoto}
                                              uploadPhoto={handleInputChange} selectMainPhoto={selectDesignMainPhoto}/>
                                {
                                    architects?.data && <FormGroup
                                        text={"Архитектор или дизайнер проекта"}
                                        option={"Выберите архитектора"}
                                        setData={handleInputChange}
                                        data={architects}
                                        item={formData.architectId}
                                        dataError={formErrors.architectId}
                                        type={"architectId"}
                                    />
                                }
                                {
                                    categories?.data && <FormGroup
                                        text={"Категории проекта"}
                                        option={"Выберите категорию"}
                                        setData={handleInputChange}
                                        data={categories}
                                        item={formData.categoryId}
                                        dataError={formErrors.categoryId}
                                        type={"categoryId"}
                                    />
                                }
                                {
                                    rooms?.data && <FormGroup
                                        text={"Комнаты проекта"}
                                        option={"Выберите количество комнат"}
                                        setData={handleInputChange}
                                        data={rooms}
                                        item={formData.roomId}
                                        dataError={formErrors.roomId}
                                        type={"roomId"}
                                    />
                                }
                                {
                                    squares?.data && <FormGroup
                                        text={"Площадь проекта"}
                                        option={"Выберите площадь"}
                                        setData={handleInputChange}
                                        data={squares}
                                        item={formData.squareId}
                                        dataError={formErrors.squareId}
                                        type={"squareId"}
                                    />
                                }
                                {
                                    updatedProjectData?.response?.data && <div className="formik__error">
                                        <p className="login__message-title">*{updatedProjectData?.response?.data}</p>
                                    </div>
                                }
                                {
                                    addedProjectData?.response?.data && <div className="formik__error">
                                        <p className="login__message-title">*{addedProjectData?.response?.data}</p>
                                    </div>
                                }
                                <button
                                    className={addedProjectLoading || updateLoading ? "button formik__button-disabled" : "button formik__button"}
                                    type="submit" disabled={addedProjectLoading || updateLoading}>добавить
                                </button>
                                {
                                    addedProjectLoading || updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                                }
                            </form>
                        </div>
                }
            </div>
        </section>
    );
};

export default NewProject;