import React from 'react';
import CartImage from "../CartImage";
import {Link} from "react-router-dom";

const CardItems = ({project, imageType}) => {

    return (
        <>
            <div key={project.id} className="col-4 card__column">
                <div className="card__inner">
                    {
                        imageType === "exterior" ? <CartImage image={project.exterior}/> : <CartImage image={project.interior}/>
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
        </>
    );
};

export default CardItems;