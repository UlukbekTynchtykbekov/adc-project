import React from 'react';
import "./card.scss"
import CardItems from "../CardItems";
import {useProjectsData} from "../../CustomHooks/useProjectsData";

const Card = ({ room, category, imageType }) => {

    const {isLoading, data, isError} = useProjectsData();

    if (isLoading) {
        return <div style={{color: "white"}}>Loading...</div>;
    }

    if (isError) {
        return <div style={{color: "white"}}>Error</div>;
    }

    if (!data){
        return <div style={{color: "white"}}>No project</div>;
    }

    const architectureProjects = data?.data.filter(project => {
        if (room === "ВСЕ") {
            console.log(project.category.name.toLowerCase() === category.toLowerCase())
            return project.category.name.toLowerCase() === category.toLowerCase()
        } else {
            return project.category.name.toLowerCase() === category && project.room.quantity === +room
        }
    });

    return (
        <div className="card">
            <div className="row">
                {
                    architectureProjects.map(project => (
                        <CardItems key={project._id} project={project} imageType={imageType}/>
                    ))
                }
            </div>
        </div>
    );
};

export default Card;