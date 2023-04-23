import React from 'react';
import useParallax from "../../CustomHooks/useParallaxHook";
import Helmet from "../../layout/Helmet";
import Common from "../../components/Common";
import bgImage from "../../static/img/exteriorbg.png";
import ShortDesc from "../../components/ShortDesc";
import Card from "../../components/Card";

const Exterior = () => {
    const {isVisible, bgParallaxStyle} = useParallax()

    const house = {
        title: "ВЫ МОЖЕТЕ НАЙТИ ВЕСЬ НА ПРОЕКТ",
        category:"design",
        imageType: "exterior",
        subtitle: "ЭКСТЕРЬЕР",
        shortTitle: "Дизайн коммерческих пространств",
        shortDesc: "Разработка дизайна мест общественного пользования жилых комлексов и бизнес -центров. Грамотно продуманный дизайн интерьера способен изменить качество вашей жизни в лучшую сторону"
    }

    return (
        <Helmet title="Exterior">
            <Common house={house} bgImage={bgImage} isVisible={isVisible} bgParallaxStyle={bgParallaxStyle}/>
            <section className="short-desc" style={bgParallaxStyle}>
                <div className="container">
                    <ShortDesc house={house}/>
                    <Card room={"ВСЕ"} category={house.category} imageType={house.imageType}/>
                </div>
            </section>
        </Helmet>
    );
};

export default Exterior;