import React from 'react';
import "./commonabout.scss"
import ArrowIcon from "../../Ui/ArrowIcon/ArrowIcon";
const CommonAbout = ({house, bgParallaxStyle, isVisible, handleScroll}) => {
    return (
        <section className="hero">
                <div className="container">
                    <div style={bgParallaxStyle} className="commons__wrapper">
                        <div className="commons__inner">
                            <h2 className="commons__title">{house.title}</h2>
                            <p className="commons__subtitle">{house.subtitle}</p>
                        </div>
                    </div>
                    {
                        <ArrowIcon isVisible={isVisible} handleScroll={handleScroll}/>

                    }
                </div>
        </section>
    );
};

export default CommonAbout;