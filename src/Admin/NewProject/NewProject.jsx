import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import "./new-project.scss"
import Dropdown from "../../components/Dropdown";

const NewProject = () => {
    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div className="new">
                    <div className="new__wrapper">
                        <h2 className="new__text">Добавить проект</h2>
                    </div>
                    <form className="formik">
                       <div className="formik__group">
                           <h2 className="formik__text">Название</h2>
                           <input className="formik__input" type="text" placeholder="Название проекта"/>
                       </div>
                        <div className="formik__group">
                           <h2 className="formik__text">Краткое описание</h2>
                           <input className="formik__input" type="text" placeholder="Краткое описание проекта"/>
                       </div>
                        <div className="formik__group formik__group-photo">
                            <h2 className="formik__text">Экстерьер фото</h2>
                            <div className="formik__photo">
                                <label htmlFor="photo" className="formik__label formik__label-photo">
                                    <input id="photo" className="formik__input formik__input-hidden" type="file"/>
                                    <span className="formik__icon">
                                    <ion-icon name="cloud-upload-outline"></ion-icon>
                                    Upload
                                </span>
                                </label>
                            </div>
                       </div>
                        <div className="formik__group formik__group-photo">
                            <h2 className="formik__text">Интерьер фото</h2>
                            <div className="formik__photo">
                                <label htmlFor="photo" className="formik__label formik__label-photo">
                                    <input id="photo" className="formik__input formik__input-hidden" type="file"/>
                                    <span className="formik__icon">
                                    <ion-icon name="cloud-upload-outline"></ion-icon>
                                    Upload
                                </span>
                                </label>
                            </div>
                       </div>
                        <div className="formik__group formik__group-photo">
                            <h2 className="formik__text">Дизайн фото</h2>
                            <div className="formik__photo">
                                <label htmlFor="photo" className="formik__label formik__label-photo">
                                    <input id="photo" className="formik__input formik__input-hidden" type="file"/>
                                    <span className="formik__icon">
                                    <ion-icon name="cloud-upload-outline"></ion-icon>
                                    Upload
                                </span>
                                </label>
                            </div>
                       </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Архитектор или дизайнер проекта</h2>
                            <select className="select" size="1">
                                <option className="select__option" value="">Select an option</option>
                                <option className="select__option" value="1">First option</option>
                                <option className="select__option" value="2">Second option</option>
                                <option className="select__option" value="3">Third option</option>
                                <option className="select__option" value="4">Fourth option</option>
                                <option className="select__option" value="5">Fifth option</option>
                            </select>
                        </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Категории проекта</h2>
                            <select className="select" size="1">
                                <option className="select__option" value="">Select an option</option>
                                <option className="select__option" value="1">First option</option>
                                <option className="select__option" value="2">Second option</option>
                                <option className="select__option" value="3">Third option</option>
                                <option className="select__option" value="4">Fourth option</option>
                                <option className="select__option" value="5">Fifth option</option>
                            </select>
                        </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Комнаты проекта</h2>
                            <select className="select" size="1">
                                <option className="select__option" value="">Select an option</option>
                                <option className="select__option" value="1">First option</option>
                                <option className="select__option" value="2">Second option</option>
                                <option className="select__option" value="3">Third option</option>
                                <option className="select__option" value="4">Fourth option</option>
                                <option className="select__option" value="5">Fifth option</option>
                            </select>
                        </div>
                        <div className="formik__group">
                            <h2 className="formik__text">Площадь проекта</h2>
                            <select className="select" size="1">
                                <option className="select__option" value="">Select an option</option>
                                <option className="select__option" value="1">First option</option>
                                <option className="select__option" value="2">Second option</option>
                                <option className="select__option" value="3">Third option</option>
                                <option className="select__option" value="4">Fourth option</option>
                                <option className="select__option" value="5">Fifth option</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewProject;