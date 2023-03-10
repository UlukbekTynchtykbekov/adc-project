import React from 'react';
import "../../styles/projects.scss"
import ProjectsTop from "../../components/ProjectsTop";
import Helmet from "../../layout/Helmet";
import {Link} from "react-router-dom";

const Projects = () => {
    return (
        <Helmet title="Projects">
            <ProjectsTop />
            <section className="design">
                <div className="container">
                    <div className="design__row">
                        <div className="design__column">
                            <Link to="/exterior" className="design__title">ЭКСТЕРЬЕР</Link>
                        </div>
                        <div className="design__column">
                            <Link to="/projects/interior" className="design__title">ИНТЕРЬЕР</Link>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default Projects;