import React, {useEffect, useRef, useState} from 'react';
import Helmet from "../../layout/Helmet";
import Common from "../../components/Common";
import '../../styles/interior.scss'
import bgImage from "../../static/img/interiorbg.png";
import useParallax from "../../CustomHooks/parallaxHook";

const Interior = () => {
    const {handleScroll, scrollRef, isVisible, bgParallaxStyle} = useParallax()
    const house = {
        title: "ВЫ МОЖЕТЕ НАЙТИ ВЕСЬ НА ПРОЕКТ",
        subtitle: "300 МЕТР КВ"
    }

    return (
        <Helmet title="Interior">
            <Common house={house} bgImage={bgImage} />
            <section className="short-desc">
                <div className="container">
                    <div className="short-desc__wrapper">
                        <h4 className="short-desc__title">
                            Дизайн коммерческих пространств
                        </h4>
                        <p className="short-desc__subtitle">Разработка дизайна мест
                            общественного пользования жилых комлексов и бизнес -центров.
                        </p>
                        <p className="short-desc__subtitle">
                            Грамотно продуманный дизайн интерьера способен изменить качество вашей жизни в лучшую сторону
                        </p>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default Interior;