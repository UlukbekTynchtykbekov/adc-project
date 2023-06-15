import React, {useEffect, useRef, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import {useAddProjectInfo, useProjectInfoData, useUpdateProjectInfo} from "../../CustomHooks/useProjectInfo";
import FormGroup from "../FormGroup/FormGroup";
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import { showSuccessNotification, showErrorNotification } from "../../CustomHooks/useToast"
import "./new-project-info.scss"
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import {useSelector} from "react-redux";

const NewProjectInfo = () => {

    const [formData, setFormData] = useState({
        projectId: '',
        title: '',
        description: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [filteredProjects, setFilteredProjects] = useState([])
    const {openSidebar} = useSelector(state => state.sidebar);
    const elementRefs = useRef(null);
    const {id: projectInfoId} = useParams();

    const { data: projects, isLoading } = useProjectsData();

    const {mutate: addProjectInfo, data: addedProjectInfoData, isLoading: addProjectInfoLoading, isError:addInfoIsError} = useAddProjectInfo(showSuccessNotification, showErrorNotification);
    const {data: projectInfoData, isLoading: projectInfoLoading, isError, error} = useProjectInfoData(projectInfoId);
    const {mutate: updateProjectInfo, data:updatedProjectInfoData, isLoading: updateLoading, isError : updateInfoIsError} = useUpdateProjectInfo(showSuccessNotification, showErrorNotification);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmitProduct = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            if (projectInfoId){
                updateProjectInfo({projectInfoId, ...formData})
            }else{
                addProjectInfo(formData)
            }
        }
    }

    const validateForm = (data) => {
        const errors = {};

        if (!data.projectId) {
            errors.projectId = "Обязательное поле";
        }

        if (!data.title.trim().length) {
            errors.title = "Обязательное поле";
        }

        if (!data.description.trim().length) {
            errors.description = "Обязательное поле";
        }

        return errors;
    };

    useEffect(() => {
        if (projects && projectInfoData?.data){
            const filteredProject = projects?.data.filter(project => project._id === projectInfoData?.data.project._id);
           setFilteredProjects(filteredProject)
        }else if (projects && !projectInfoData?.data){
            setFilteredProjects(projects?.data)
        }

        if (projectInfoData?.data){
            setFormData((prevState) => ({
                ...prevState,
                projectId: projectInfoData?.data.project._id,
                title: projectInfoData?.data.title,
                description: projectInfoData?.data.description
            }))
        }
        if (elementRefs.current) {
            elementRefs.current.classList.toggle('close', openSidebar);
        }
    }, [projectInfoData?.data, projects, openSidebar])

    if (addedProjectInfoData?.data || updatedProjectInfoData?.data){
        return <Navigate to="/admin/project-info"/>
    }

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                {
                    projectInfoLoading || isLoading ?  <Loader /> : null
                }

                {
                    isError &&   <Error status={error?.status} page={error?.message}/>
                }
                {
                    !projectInfoLoading && !isError && !isLoading && <div ref={elementRefs} className="new">
                        <div className="new__wrapper">
                            <h2 className="new__text">Добавить категорию</h2>
                        </div>
                        <form className="formik" onSubmit={onSubmitProduct}>
                            <FormGroup
                                text={"Проект"}
                                option={"Выберите проект"}
                                setData={handleInputChange}
                                data={filteredProjects}
                                item={formData.projectId}
                                dataError={formErrors.projectId}
                                type={"projectId"}
                            />
                            <div className="formik__group">
                                <h2 className="formik__text">Заголовок</h2>
                                <input
                                    className="formik__input"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    placeholder="Заголовок проекта"
                                    onChange={handleInputChange}
                                />
                                {
                                    formErrors.title && <p className="formik__error">*{formErrors.title}</p>
                                }
                            </div>
                            <div className="formik__group">
                                <h2 className="formik__text">Описание</h2>
                                <textarea
                                    className="formik__input formik__input-textarea"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Описание проекта"
                                    name="description"
                                    id=""
                                    cols="30"
                                    rows="10">
                            </textarea>
                                {
                                    formErrors.description && <p className="formik__error">*{formErrors.description}</p>
                                }
                            </div>
                            <button className={ addProjectInfoLoading || updateLoading ? "button formik__button-disabled" : "button formik__button"} type="submit" disabled={addProjectInfoLoading || updateLoading}>добавить</button>
                            {
                                addProjectInfoLoading || updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                            }
                            {
                                updateInfoIsError && <div>
                                    <p className="formik__error">Информация о проекте уже существует или вы должны правильно заполнить все данные</p>
                                </div>
                            }
                            {
                                addInfoIsError && <div>
                                    <p className="formik__error">Информация о проекте уже существует или вы должны правильно заполнить все данные</p>
                                </div>
                            }
                        </form>
                    </div>
                }
            </div>
        </section>
    );
};

export default NewProjectInfo;