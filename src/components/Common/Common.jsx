import React from 'react';
import "./common.scss"
import ArrowIcon from "../../Ui/ArrowIcon/ArrowIcon";

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
                {
                    handleScroll ? <ArrowIcon isVisible={isVisible} handleScroll={handleScroll}/>
                        : null
                }
            </div>
        </setion>
    );
};

export default Common;