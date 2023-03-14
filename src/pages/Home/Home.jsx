import React from 'react';
import Helmet from "../../layout/Helmet";
import "../../styles/home.scss"
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <Helmet title="Home">
            <section className="hero">
                <div className="container">
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