import React from 'react';
import Helmet from "../../layout/Helmet";
import Common from "../../components/Common";
import bgImage from "../../static/img/interiorbg.png";
import useParallax from "../../CustomHooks/parallaxHook";
import Card from "../../components/Card";
import ShortDesc from "../../components/ShortDesc";
import '../../styles/interior.scss'

const Interior = () => {
    const {isVisible, bgParallaxStyle} = useParallax()
    const house = {
        title: "ВЫ МОЖЕТЕ НАЙТИ ВЕСЬ НА ПРОЕКТ",
        subtitle: "ИНТЕРЬЕР",
        shortTitle: "Дизайн экстерьра",
        shortDesc: "Дом должен выделяться и быть особенным не только изнутри, но и снаружи. Мы сделаем так, чтобы он приковывал к себе внимание"
    }

    return (
        <Helmet title="Interior">
            <Common house={house} bgImage={bgImage} isVisible={isVisible} bgParallaxStyle={bgParallaxStyle}/>
            <section className="short-desc" style={bgParallaxStyle}>
                <div className="container">
                    <ShortDesc house={house}/>
                    <Card />
                </div>
            </section>
        </Helmet>
    );
};

export default Interior;