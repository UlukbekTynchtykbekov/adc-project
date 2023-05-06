import React from 'react';
import Helmet from "../../layout/Helmet";
import BgVideo from "../../static/assets/adc-video.mp4"
import "../../styles/home.scss"
import {Link} from "react-router-dom";
import useParallax from "../../CustomHooks/useParallaxHook";

const Home = () => {
    const {bgParallaxStyle} = useParallax();
    return (
        <Helmet title="Home">
            <section className="hero">
                <video className="hero__video" src={BgVideo} autoPlay loop muted></video>
                <div className="hero__over-play"></div>
                <div className="container">
                    <div className="hero__description" style={bgParallaxStyle}>
                        <div className="main-title">
                            <span className="main-title__title-hero">
                                ADC
                            </span>
                            <h1 className="main-title__desc-hero">реализует вашу мечту</h1></div>
                    </div>
                    <div className="hero__items" style={bgParallaxStyle}>
                        <div className="hero__item">
                            <Link to="/architecture" className="hero__link">
                                <h3 className="hero__category">AРХИТЕКТУРА</h3>
                            </Link>
                        </div>
                        <div className="hero__item">
                            <Link to="/design" className="hero__link">
                                <h3 className="hero__category">ДИЗАЙН</h3>
                            </Link>
                        </div>
                        <div className="hero__item">
                            <Link to="/construction" className="hero__link">
                                <h3 className="hero__category">СТРОЙКА</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default Home;