import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import {useParams} from "react-router-dom";
import {useProjectData} from "../../CustomHooks/useProjectsData";
import ShowAllPhotos from "../../components/ShowAllPhotos";
import ProjectDetailCard from "../../components/ProjectDetailCard";
import ProjectDetailBottom from "../../components/ProjectDetailBottom";
import Reviews from "../../components/Reviews";

const ProjectDetail = () => {
    const {projectId} = useParams();
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [selected, setSelected] = useState("экстерьер");
    const {data, isLoading, isError, error} = useProjectData(projectId);

    if (isLoading) {
        return <div style={{color: "white"}}>Loading...</div>;
    }

    if (isError) {
        return <div style={{color: "white"}}>{error?.message}</div>;
    }

    if (!data?.data) {
        return <div style={{color: "white"}}>No Information</div>;
    }

    if (showAllPhotos === true) {
        return (
            <ShowAllPhotos selected={selected} el={data?.data} setShowAllPhotos={setShowAllPhotos}/>
        )
    }

    return (
        <Helmet title="Project-Detail">
            <section className="detail">
                <div className="container">
                    <ProjectDetailCard
                        selected={selected}
                        setSelected={setSelected}
                        el={data?.data}
                        setShowAllPhotos={setShowAllPhotos}/>
                    <ProjectDetailBottom el={data?.data}/>
                </div>
            </section>
            <Reviews el={data?.data}/>
        </Helmet>
    );
};

export default ProjectDetail;