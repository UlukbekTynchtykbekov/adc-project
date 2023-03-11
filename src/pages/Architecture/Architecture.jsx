import React, {useEffect, useRef, useState} from 'react';
import Common from "../../components/Common";
import Helmet from "../../layout/Helmet";
import Card from "../../components/Card";
import bgImage from "../../static/img/architecture-bg.png"
import useParallax from "../../CustomHooks/parallaxHook";
import "../../styles/architecture.scss";

const Architecture = () => {
    const {handleScroll, scrollRef, isVisible, bgParallaxStyle} = useParallax()

    const house = {
        title: "ДВУХ ЭТАЖНЫЙ ДОМ СОВРЕМЕННОГО СТИЛЯ",
        subtitle: "300 МЕТР КВ"
    }

    return (
        <Helmet title="Architecture">
           <Common house={house} bgImage={bgImage} isVisible={isVisible} bgParallaxStyle={bgParallaxStyle} handleScroll={handleScroll}/>
            <div className="architecture" style={bgParallaxStyle}>
                <div className="container">
                    <div ref={scrollRef} className="architecture__filter">
                        <ul className="architecture__list">
                            <li className="architecture__sort architecture__sort--all">
                                <p className="architecture__sort-item">ВСЕ</p>
                            </li>
                            <li className="architecture__sort"><p className="architecture__sort-item">1-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item">2-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item">3-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item">4-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item">5-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item">6-ком</p></li>
                        </ul>
                    </div>
                    <Card />
                </div>
            </div>
        </Helmet>
    );
};

export default Architecture;