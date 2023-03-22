import React from 'react';
import "./card.scss"
import CardItems from "../CardItems";

const Card = ({ projects, isError, isLoading, imageType}) => {

    if (isLoading) {
        return <div style={{color: "white"}}>Loading...</div>;
    }

    if (isError) {
        return <div style={{color: "white"}}>Error</div>;
    }

    if (projects.length === 0){
        return <div style={{color: "white"}}>No project</div>;
    }

    return (
        <div className="card">
            <div className="row">
                {
                    projects.map(project => (
                        <CardItems key={project._id} project={project} imageType={imageType}/>
                    ))
                }
            </div>
        </div>
    );
};

export default Card;