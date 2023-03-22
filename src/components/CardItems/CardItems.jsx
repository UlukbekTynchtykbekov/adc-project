import React from 'react';
import CartImage from "../CartImage";

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
                        <button className="button card__btn">подробнее</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardItems;