import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import {useAddProjectInfo, useProjectInfoData, useUpdateProjectInfo} from "../../CustomHooks/useProjectInfo";
import FormGroup from "../FormGroup/FormGroup";
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import "./new-project-info.scss"
import projectInfo from "../ProjectInfo";

const NewProjectInfo = () => {
    const [product, setProduct] = useState("");
    const [productError, setProductError] = useState("");
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([])
    const {id: projectInfoId} = useParams();

    const { data:projects } = useProjectsData();

    const {mutate: addProjectInfo, data: addedProjectInfoData, isLoading: addProjectInfoLoading} = useAddProjectInfo();
    const {data: projectInfoData, isLoading: projectInfoLoading, isError: projectInfoIsError, error: projectInfoError} = useProjectInfoData(projectInfoId);
    const {mutate: updateProjectInfo, data:updatedProjectInfoData, isLoading: updateLoading} = useUpdateProjectInfo();

    const onSubmitProduct = (e) => {
        e.preventDefault();
        if (product.length === 0){
            setProductError("Обязательное поле")
        }

        if ( title.trim().length === 0){
            setTitleError("Обязательное поле")
        }

        if (description.trim().length === 0){
            setDescriptionError("Обязательное поле")
        }

        const newProductInfo = {
            projectId: product,
            title,
            description
        }

        if (projectInfoId){
            updateProjectInfo({projectInfoId, ...newProductInfo})
        }else{
            addProjectInfo(newProductInfo)
        }
    }

    useEffect(() => {
        if (projects && projectInfoData?.data){
            const filteredProject = projects?.data.filter(project => project._id === projectInfoData?.data.project._id);
           setFilteredProjects(filteredProject)
        }else if (projects && !projectInfoData?.data){
            setFilteredProjects(projects?.data)
        }

        if (projectInfoData?.data){
            setProduct(projectInfoData?.data.project._id);
            setTitle(projectInfoData?.data.title);
            setDescription(projectInfoData?.data.description);
        }
    }, [projectInfoData?.data, projects])

    if (addedProjectInfoData?.data || updatedProjectInfoData?.data){
        return <Navigate to="/admin/project-info"/>
    }

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                {
                    projectInfoLoading &&  <div style={{color: "white"}}>Loading...</div>
                }

                {
                    projectInfoIsError &&  <div style={{color: "white"}}>{projectInfoError?.message}</div>
                }
                <div className="new">
                    <div className="new__wrapper">
                        <h2 className="new__text">Добавить категорию</h2>
                    </div>
                    <form className="formik" onSubmit={onSubmitProduct}>
                        <FormGroup
                            text={"Проект"}
                            option={"Выберите проект"}
                            setData={setProduct}
                            data={filteredProjects}
                            item={product}
                            dataError={productError}
                            type={"product"}
                        />
                        <div className="formik__group">
                            <h2 className="formik__text">Категория</h2>
                            <input
                                className="formik__input"
                                type="text"
                                value={title}
                                placeholder="Категория проекта"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {
                                titleError && <p className="formik__error">*{titleError}</p>
                            }
                        </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Описание</h2>
                            <textarea
                                className="formik__input formik__input-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Описание проекта" name="" id="" cols="30"
                                rows="10">
                            </textarea>
                            {
                                descriptionError && <p className="formik__error">*{descriptionError}</p>
                            }
                        </div>
                        <button className={ addProjectInfoLoading || updateLoading ? "button formik__button-disabled" : "button formik__button"} type="submit" disabled={addProjectInfoLoading || updateLoading}>добавить</button>
                        {
                            addProjectInfoLoading || updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                        }
                        {
                            addedProjectInfoData?.response.data && <div>
                                <p className="formik__error">Информация о проекте уже существует или вы должны правильно заполнить все данные</p>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewProjectInfo;