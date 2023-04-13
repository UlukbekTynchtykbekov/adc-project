import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import "./new-project.scss"

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
                        <h2 className="formik__text">Название</h2>
                        <input className="input-grey-rounded" type="text" placeholder="Search"/>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewProject;