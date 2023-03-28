import React, {useState} from 'react';
import Common from "../../components/Common";
import Helmet from "../../layout/Helmet";
import Card from "../../components/Card";
import bgImage from "../../static/img/architecture-bg.png"
import useParallax from "../../CustomHooks/useParallaxHook";
import "../../styles/architecture.scss";
import {useProjectsData} from "../../CustomHooks/useProjectsData";

const Architecture = () => {
    const [room, setRoom] = useState("ВСЕ");
    const {handleScroll, scrollRef, isVisible, bgParallaxStyle} = useParallax();

    const {isLoading, data, isError} = useProjectsData()

    const architectureProjects = data?.data.filter(project => {
        if (room === "ВСЕ") {
            return project.category.name === "architecture"
        } else {
            return project.category.name === "architecture" && project.room.quantity === +room
        }
    });

    const house = {
        title: "ДВУХ ЭТАЖНЫЙ ДОМ СОВРЕМЕННОГО СТИЛЯ",
        subtitle: "300 МЕТР КВ"
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
                    <Card data={data} projects={architectureProjects} isLoading={isLoading} isError={isError} imageType="exterior"/>
                </div>
            </div>
        </Helmet>
    );
};

export default Architecture;