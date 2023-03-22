import React from 'react';
import './partners.scss'
import Partner from "../../static/img/partners.png"

const Partners = ({house}) => {
    return (
        <div className="wrap">
            <img className="wrap__image" src={Partner} alt=""/>
            <p className="wrap__subtitle">
                {house.shortDesc}
            </p>
        </div>
    );
};

export default Partners;