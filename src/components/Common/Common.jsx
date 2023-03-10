import React from 'react';
import icon from "../../static/img/scrolldown 1.svg"
import "./common.scss"

const Common = ({house, bgImage, bgParallaxStyle, isVisible, handleScroll}) => {
    return (
        <setion className="common">
            <img className="common__background" src={bgImage} alt="architecture-bg"/>
            <div className="container">
                <div style={bgParallaxStyle} className="common__wrapper">
                    <div className="common__inner">
                        <h2 className="common__title">{house.title}</h2>
                        <p className="common__subtitle">{house.subtitle}</p>
                    </div>
                </div>
                <div onClick={handleScroll} className={isVisible ? "common__arrow" : "hide-on-scroll"}>
                    <img className="arrow-icon" src={icon} alt="arrow-down-s-line.svg"/>
                </div>
            </div>
        </setion>
    );
};

export default Common;