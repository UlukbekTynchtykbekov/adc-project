import React, {useState} from 'react';
import Common from "../../components/Common";
import Helmet from "../../layout/Helmet";
import Card from "../../components/Card";
import bgImage from "../../static/img/architecture-bg.png"
import useParallax from "../../CustomHooks/useParallaxHook";
import "../../styles/architecture.scss";

const Architecture = () => {
    const [room, setRoom] = useState("ВСЕ");
    const {handleScroll, scrollRef, isVisible, bgParallaxStyle} = useParallax();

    const house = {
        title: "ДВУХ ЭТАЖНЫЙ ДОМ СОВРЕМЕННОГО СТИЛЯ",
        subtitle: "300 МЕТР КВ",
        category:"architecture",
        imageType: "exterior",
    }

    return (
        <Helmet title="Architecture">
            <Common house={house} bgImage={bgImage} isVisible={isVisible} bgParallaxStyle={bgParallaxStyle}
                    handleScroll={handleScroll}/>
            <div className="architecture" style={bgParallaxStyle}>
                <div className="container">
                    <div ref={scrollRef} className="architecture__filter">
                        <ul className="architecture__list">
                            <li className="architecture__sort architecture__sort--all">
                                <p className="architecture__sort-item" onClick={() => setRoom("ВСЕ")}>ВСЕ</p>
                            </li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("1")}>1-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("2")}>2-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("3")}>3-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("4")}>4-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("5")}>5-ком</p></li>
                            <li className="architecture__sort"><p className="architecture__sort-item"
                                                                  onClick={() => setRoom("6")}>6-ком</p></li>
                        </ul>
                    </div>
                    <Card room={room} category={house.category} imageType={house.imageType}/>
                </div>
            </div>
        </Helmet>
    );
};

export default Architecture;