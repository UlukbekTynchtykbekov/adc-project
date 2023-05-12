import React from 'react';
import {Link} from "react-router-dom";
import "./card.scss"

const CardItems = ({project, imageType}) => {

    return (
        <div className="col-4 card__column">
            <div className="card__inner">
                {
                    imageType === "exterior" ? <img className="card__image" src={project.exterior[0].url} alt=""/>
                        : <img className="card__image" src={project.interior[0].url} alt=""/>
                }
                <div className="card__info">
                    <h3 className="card__title">{project.name}</h3>
                    <p className="card__subtitle">{project.shortDesc}</p>
                    <Link to={`/projects/${project._id}`}>
                        <button className="button card__btn">подробнее</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CardItems;