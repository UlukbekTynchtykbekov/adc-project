import React from 'react';
import icon from "../../static/img/scrolldown 1.svg";

const ArrowIcon = ({handleScroll, isVisible}) => {
    return (
        <div onClick={handleScroll} className={isVisible ? "common__arrow" : "hide-on-scroll"}>
            <img className="arrow-icon" src={icon} alt="arrow-down-s-line.svg"/>
        </div>
    );
};

export default ArrowIcon;