import React, {useEffect, useRef, useState} from 'react';
import bgImage from "../../static/img/architecture-bg.png"
import icon from "../../static/img/scrolldown 1.svg"
import "./common.scss"

const Common = ({handleScroll}) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const bgParallaxStyle = {
        bottom: `${scrollPosition * 0.5}px`,
    };

    useEffect(() => {
        function handleScroll() {
            setScrollPosition(window.scrollY);
            if (window.scrollY > 0) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <setion className="common">
            <img className="common__background" src={bgImage} alt="architecture-bg"/>
            <div className="container">
                <div style={bgParallaxStyle} className="common__wrapper">
                    <div className="common__inner">
                        <h2 className="common__title">ДВУХ ЭТАЖНЫЙ ДОМ СОВРЕМЕННОГО СТИЛЯ</h2>
                        <p className="common__subtitle">300 МЕТР КВ</p>
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