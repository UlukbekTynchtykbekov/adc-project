import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import {useParams} from "react-router-dom";
import {useProjectData} from "../../CustomHooks/useProjectData";
import ShowAllPhotos from "../../components/ShowAllPhotos";
import ProjectDetailCard from "../../components/ProjectDetailCard";
import ProjectDetailBottom from "../../components/ProjectDetailBottom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/project-detail.scss"
import Reviews from "../../components/Reviews";

const ProjectDetail = () => {
    const {projectId} = useParams();
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [selected, setSelected] = useState("экстерьер");
    const {data, isLoading, isError} = useProjectData(projectId);

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
            <ShowAllPhotos selected={selected} el={data?.data} setShowAllPhotos={setShowAllPhotos}/>
        )
    }

    return (
        <Helmet title="Project-Detail">
            <section className="detail">
                <div className="container">
                    <ProjectDetailCard selected={selected} setSelected={setSelected} el={data?.data}
                                       setShowAllPhotos={setShowAllPhotos}/>
                    <ProjectDetailBottom el={data?.data}/>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </section>
            <Reviews el={data?.data}/>
        </Helmet>
    );
};

export default ProjectDetail;