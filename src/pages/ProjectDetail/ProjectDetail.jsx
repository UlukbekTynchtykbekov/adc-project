import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import {useParams} from "react-router-dom";
import {useProjectData} from "../../CustomHooks/useProjectsData";
import ShowAllPhotos from "../../components/ShowAllPhotos";
import ProjectDetailCard from "../../components/ProjectDetailCard";
import ProjectDetailBottom from "../../components/ProjectDetailBottom";
import Reviews from "../../components/Reviews";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";

const ProjectDetail = () => {
    const {projectId} = useParams();
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [selected, setSelected] = useState("экстерьер");
    const {data, isLoading, isError, error} = useProjectData(projectId);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Error status={error?.status} page={error?.message} />;
    }

    if (!data?.data) {
        return <EmptyItems />;
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