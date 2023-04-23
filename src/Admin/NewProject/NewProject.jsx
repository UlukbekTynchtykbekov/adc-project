import React, {useEffect, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {request} from "../../utils/axios-utils";
import {useArchitectData} from "../../CustomHooks/useArchitectData";
import {useCategoriesData} from "../../CustomHooks/useCategoriesData";
import {useRoomData} from "../../CustomHooks/useRoomData";
import {useSquareData} from "../../CustomHooks/useSquareData";
import {useAddProject, useUpdateProject} from "../../CustomHooks/useProjectsData";
import {Navigate, useParams} from "react-router-dom";
import {useProjectData} from "../../CustomHooks/useProjectData";
import "./new-project.scss"
import UploadImages from "../UploadImages/UploadImages";
import FormGroup from "../FormGroup/FormGroup";

const NewProject = () => {
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [shortDescError, setShortDescError] = useState("");
    const [exteriorPhotos, setExteriorPhotos] = useState([]);
    const [exteriorPhotosError, setExteriorPhotosError] = useState("");
    const [interiorPhotos, setInteriorPhotos] = useState([]);
    const [interiorPhotosError, setInteriorPhotosError] = useState("");
    const [designPhotos, setDesignPhotos] = useState([]);
    const [architect, setArchitect] = useState("");
    const [architectError, setArchitectError] = useState("");
    const [category, setCategory] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [room, setRoom] = useState("");
    const [roomError, setRoomError] = useState("");
    const [square, setSquare] = useState("");
    const [squareError, setSquareError] = useState("");

    const {id: projectId} = useParams();

    const { data:architects } = useArchitectData();
    const { data:categories } = useCategoriesData();
    const { data:rooms } = useRoomData();
    const { data:squares } = useSquareData();
    const {mutate: addProject, data:addedProjectData, isLoading: addedProjectLoading} = useAddProject();
    const {data: singleProject, isLoading: singleProjectLoading, isError: singleProjectIsError, error: singleProjectError} = useProjectData(projectId);
    const {mutate: updateProject, data:updatedProjectData, isLoading: updateLoading} = useUpdateProject()

    const uploadExteriorPhoto = (e) => {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("images", files[i]);
        }
        return request({url: '/api/upload', method: 'POST', data: data})
            .then(response => {
                const {data} = response;
                setExteriorPhotos(prev => {
                    return [...prev, ...data?.data]
                })
            })
    }

    const uploadInteriorPhoto = (e) => {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("images", files[i]);
        }
        return request({url: '/api/upload', method: 'POST', data: data})
            .then(response => {
                const {data} = response;
                setInteriorPhotos(prev => {
                    return [...prev, ...data?.data]
                })
            })
    }

    const uploadDesignPhoto = (e) => {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("images", files[i]);
        }
        return request({url: '/api/upload', method: 'POST', data: data})
            .then(response => {
                const {data} = response;
                setDesignPhotos(prev => {
                    return [...prev, ...data?.data]
                })
            })
    }

    const deleteExteriorPhoto = (id) => {
        const findId = exteriorPhotos.find(img => img.public_id === id);
        if (findId){
            setExteriorPhotos(prevState => {
                return exteriorPhotos.filter(img => img.public_id !== id)
            })
        }
    }

    const deleteInteriorPhoto = (id) => {
        const findId = interiorPhotos.find(img => img.public_id === id);
        if (findId){
            setInteriorPhotos(prevState => {
                return interiorPhotos.filter(img => img.public_id !== id)
            })
        }
    }

    const deleteDesignPhoto = (id) => {
        const findId = designPhotos.find(img => img.public_id === id);
        if (findId){
            setDesignPhotos(prevState => {
                return designPhotos.filter(img => img.public_id !== id);
            })
        }
    }

    const selectExteriorMainPhoto = (id) => {
        const mainImage = exteriorPhotos.find(img => img.public_id === id);
        const addedPhotosWithoutSelected = exteriorPhotos.filter(img => img.public_id !== id);
        const newAddedPhotos = [mainImage, ...addedPhotosWithoutSelected];
        setExteriorPhotos(newAddedPhotos)
    }

    const selectInteriorMainPhoto = (id) => {
        const mainImage = interiorPhotos.find(img => img.public_id === id);
        const addedPhotosWithoutSelected = interiorPhotos.filter(img => img.public_id !== id);
        const newAddedPhotos = [mainImage, ...addedPhotosWithoutSelected];
        setInteriorPhotos(newAddedPhotos)
    }

    const selectDesignMainPhoto = (id) => {
        const mainImage = designPhotos.find(img => img.public_id === id);
        const addedPhotosWithoutSelected = designPhotos.filter(img => img.public_id !== id);
        const newAddedPhotos = [mainImage, ...addedPhotosWithoutSelected];
        setDesignPhotos(newAddedPhotos)
    }

    const onSubmitProduct = (e) => {
        e.preventDefault();
        if (title.length < 3 && title.length < 200){
            setTitleError("Название должно быть больше 3 букв и меньше 200 букв")
        }
        if (shortDesc.length < 3 && shortDesc.length < 50){
            setShortDescError("Название должно быть больше 3 букв и меньше 50 букв")
        }
        if (exteriorPhotos.length < 3){
            setExteriorPhotosError("Экстерьер фото должно быть больше 2")
        }
        if (interiorPhotos.length < 3){
            setInteriorPhotosError("Интерьер фото должно быть больше 2")
        }
        if (!architect){
            setArchitectError("Обязательное поле")
        }
        if (!category){
            setCategoryError("Обязательное поле")
        }
        if (!room){
            setRoomError("Обязательное поле")
        }
        if (!square){
            setSquareError("Обязательное поле")
        }
        const newProject = {
            name: title,
            shortDesc,
            exterior: exteriorPhotos,
            interior: interiorPhotos,
            design: designPhotos,
            architectId: architect,
            categoryId: category,
            roomId: room,
            squareId: square
        }
        if (projectId){
            console.log(newProject)
            updateProject({projectId, ...newProject})
        }else{
            addProject(newProject)
        }
    }

    useEffect(() => {
        if (singleProject?.data){
            setTitle(singleProject?.data.name)
            setShortDesc(singleProject?.data.shortDesc)
            setExteriorPhotos(singleProject?.data.exterior)
            setInteriorPhotos(singleProject?.data.interior)
            setDesignPhotos(singleProject?.data.design)
            setArchitect(singleProject?.data.architect._id)
            setCategory(singleProject?.data.category._id)
            setRoom(singleProject?.data.room._id)
            setSquare(singleProject?.data.square._id)
        }
    }, [singleProject?.data])

    if (addedProjectData?.data || updatedProjectData?.data){
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
                    singleProjectIsError &&  <div style={{color: "white"}}>{singleProjectError?.message}</div>
                }
                <div className="new">
                    <div className="new__wrapper">
                        <h2 className="new__text">Добавить проект</h2>
                    </div>
                    <form onSubmit={onSubmitProduct} className="formik">
                        <div className="formik__group">
                            <h2 className="formik__text">Название</h2>
                            <input
                                className="formik__input"
                                value={title}
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Название проекта"/>
                            {
                                titleError && <p className="formik__error">*{titleError}</p>
                            }
                        </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Краткое описание</h2>
                            <textarea
                                className="formik__input formik__input-textarea"
                                value={shortDesc}
                                onChange={(e) => setShortDesc(e.target.value)}
                                placeholder="Краткое описание проекта" name="" id="" cols="30"
                                rows="10">
                            </textarea>
                            {
                                shortDescError && <p className="formik__error">*{shortDescError}</p>
                            }
                        </div>
                        <UploadImages text="Экстерьер фото" photos={exteriorPhotos} deletePhoto={deleteExteriorPhoto} uploadPhoto={uploadExteriorPhoto} photosError={exteriorPhotosError} selectMainPhoto={selectExteriorMainPhoto}/>
                        <UploadImages text="Интерьер фото" photos={interiorPhotos} deletePhoto={deleteInteriorPhoto} uploadPhoto={uploadInteriorPhoto} photosError={interiorPhotosError} selectMainPhoto={selectInteriorMainPhoto}/>
                        <UploadImages text="Дизайн фото" photos={designPhotos} deletePhoto={deleteDesignPhoto} uploadPhoto={uploadDesignPhoto} selectMainPhoto={selectDesignMainPhoto}/>
                        <FormGroup
                            text={"Архитектор или дизайнер проекта"}
                            option={"Выберите архитектора"}
                            setData={setArchitect}
                            data={architects}
                            item={architect}
                            dataError={architectError}
                            type={"architect"}
                        />
                        <FormGroup
                            text={"Категории проекта"}
                            option={"Выберите категорию"}
                            setData={setCategory}
                            data={categories}
                            item={category}
                            dataError={categoryError}
                            type={"category"}
                        />
                        <FormGroup
                            text={"Комнаты проекта"}
                            option={"Выберите количество комнат"}
                            setData={setRoom}
                            data={rooms}
                            item={room}
                            dataError={roomError}
                            type={"room"}
                        />
                        <FormGroup
                            text={"Площадь проекта"}
                            option={"Выберите площадь"}
                            setData={setSquare}
                            data={squares}
                            item={square}
                            dataError={squareError}
                            type={"square"}
                        />
                        <button className={addedProjectLoading || updateLoading ? "button formik__button-disabled" : "button formik__button"} type="submit" disabled={addedProjectLoading || updateLoading}>добавить</button>
                        {
                            addedProjectLoading || updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                        }
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewProject;