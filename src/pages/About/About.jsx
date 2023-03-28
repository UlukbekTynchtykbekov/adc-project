import React from 'react';
import "../../styles/about.scss"
import Card from "../../components/Card";
import Helmet from "../../layout/Helmet";
import useParallax from "../../CustomHooks/useParallaxHook";
import CommonAbout from "../../components/CommonAbout";
import Partners from "../../components/Partners";
import Partner from "../../static/img/partners.png"

const About = () => {
    const {isVisible, bgParallaxStyle} = useParallax()
    const house = {
        title: "Р Е А Л И З А Т О Р Ы \n  В А Ш И Х \n"   +
            "Ж Е Л А Н И Й  ОТ  Н А Ч А Л О  \n" +
            " \b Д О  К О Н Ц А \b",
        subtitle: "A R C H I T E C T U R E +  D E S I G N +  C O N S T R U C T I O N  ",
        shortDesc: "Можно сколько угодно рассказывать про дизайн, но лучше посмотреть на что мы способны. Каждая работа выполняется индивидуально, поэтому посмотрев наши работы. Вы можете созвониться с нами, для того чтобы обсудить свой уникальный заказ\n"
    }
    return (
        <Helmet title="Exterior">
            <CommonAbout house={house}  isVisible={isVisible} bgParallaxStyle={bgParallaxStyle}/>
            <section className="short-desc" style={bgParallaxStyle}>
                <div className="container">
                    <Partners Partner={Partner} house={house}/>
                    <Card />
                </div>
            </section>
        </Helmet>
    );
};

export default About;