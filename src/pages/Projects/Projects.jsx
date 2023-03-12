import React from 'react';
import ProjectsTop from "../../components/ProjectsTop";
import Helmet from "../../layout/Helmet";
import Design from "../Design";
import "../../styles/projects.scss"

const Projects = () => {
    return (
        <Helmet title="Projects">
            <ProjectsTop />
            <Design />
        </Helmet>
    );
};
export default Projects;