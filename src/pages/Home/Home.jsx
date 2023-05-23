import React from 'react';
import Helmet from "../../layout/Helmet";
import BgVideo from "../../static/assets/adc-video.mp4"
import {Link} from "react-router-dom";
import "../../styles/home.scss"

const Home = () => {
    return (
        <Helmet title="Home">
            <section className="hero">
                <video className="hero__video" src={BgVideo} autoPlay loop muted></video>
                <div className="hero__over-play"></div>
                <div className="container">
                    <div className="hero__description">
                        <div className="main-title">
                            <span className="main-title__title-hero">
                                ADC
                            </span>
                            <h1 className="main-title__desc-hero">реализует вашу мечту</h1></div>
                    </div>
                    <div className="hero__items">
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