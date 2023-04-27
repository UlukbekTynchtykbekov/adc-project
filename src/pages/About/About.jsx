import React from 'react';
import Slider from "react-slick"
import "../../styles/about.scss"
import Helmet from "../../layout/Helmet";
import useParallax from "../../CustomHooks/useParallaxHook";
import Partner from "../../static/img/partners.png"
import Card1 from "../../static/img/construction1.png"
import Card2 from "../../static/img/construction2.png"
import ArrowIcon from "../../Ui/ArrowIcon/ArrowIcon";
import handleScroll from "aos/src/js/helpers/handleScroll";



const About = () => {
    const {isVisible, bgParallaxStyle} = useParallax()
    const house = {
        title: "РЕАЛИЗАТОРЫ  ВАШИХ \n"   +
            "ЖЕЛАНИЙ  ОТ  НАЧАЛО  \n" +
            "ДО КОНЦА",
        subtitle: "ARCHITECTURE + DESIGN + CONSTRUCTION",
        shortDesc: "Можно сколько угодно рассказывать про дизайн, но лучше посмотреть на что мы способны. Каждая работа выполняется индивидуально, поэтому посмотрев наши работы. Вы можете созвониться с нами, для того чтобы обсудить свой уникальный заказ\n"
    };
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Helmet title="About">
            <section className="about">
                <div className="container">
                    <div style={bgParallaxStyle} className="common__wrapper about__wrapper">
                        <div className="common__inner">
                            <h2 className="common__title about__title">{house.title}</h2>
                            <p className="common__subtitle about__subtitle">{house.subtitle}</p>
                        </div>
                    </div>
                    {
                        handleScroll ? <ArrowIcon isVisible={isVisible} handleScroll={handleScroll}/>
                            : null
                    }
                </div>
            </section>
            <section className="short-desc about-desc" style={bgParallaxStyle}>
                <div className="container">
                    <div className="partner-wrapper">
                        <img className="partner-wrapper__image" src={Partner} alt=""/>
                        <p className="partner-wrapper__subtitle">
                            {house.shortDesc}
                        </p>
                    </div>
                </div>
            </section>
            <section className="sliders" style={bgParallaxStyle}>
                <div className="container">
                    <Slider {...settings}>
                        <div>
                            <img src={Card1} alt="Before" />
                            <div className="caption">Before</div>
                        </div>
                        <div>
                            <img src={Card2} alt="After" />
                            <div className="caption">After</div>
                        </div>
                    </Slider>
                </div>
            </section>
        </Helmet>
    );
};

export default About;