import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import {useParams} from "react-router-dom";
import {useProjectData} from "../../CustomHooks/useProjectData";
import "../../styles/project-detail.scss"
import ShowAllPhotos from "../../components/ShowAllPhotos";
import ProjectDetailCard from "../../components/ProjectDetailCard";

const ProjectDetail = () => {
    const {projectId} = useParams();
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    const {data, isLoading, isError} = useProjectData(projectId);
    console.log(data)

    if (isLoading) {
        return <div style={{color: "white"}}>Loading...</div>;
    }

    if (isError) {
        return <div style={{color: "white"}}>Error</div>;
    }

    if (!data) {
        return <div style={{color: "white"}}>No Information</div>;
    }

    if (showAllPhotos === true) {
        return (
            <ShowAllPhotos el={data?.data} setShowAllPhotos={setShowAllPhotos}/>
        )
    }

    return (
        <Helmet title="Project-Detail">
            <section className="detail">
                <div className="container">
                    {
                        <ProjectDetailCard el={data?.data} setShowAllPhotos={setShowAllPhotos}/>
                    }
                </div>
            </section>
        </Helmet>
    );
};

export default ProjectDetail;