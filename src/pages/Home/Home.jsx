import React from 'react';
import Helmet from "../../layout/Helmet";
import "../../styles/home.scss"
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <Helmet title="Home">
            <section className="hero">
                <div className="hero__container">
                    <div className="hero__items">
                        <div className="hero__item">
                            <Link to="/architect" className="hero__link">
                                <h3 className="hero__category">A&nbsp;Р&nbsp;Х&nbsp;И&nbsp;Т&nbsp;Е&nbsp;К&nbsp;Т&nbsp;У&nbsp;Р&nbsp;А</h3>
                            </Link>
                        </div>
                        <div className="hero__item">
                            <Link to="/design" className="hero__link">
                                <h3 className="hero__category">Д&nbsp;И&nbsp;З&nbsp;А&nbsp;Й&nbsp;Н</h3>
                            </Link>
                        </div>
                        <div className="hero__item">
                            <Link to="/construction" className="hero__link">
                                <h3 className="hero__category">С&nbsp;Т&nbsp;Р&nbsp;О&nbsp;Й&nbsp;К&nbsp;А</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default Home;