import React from 'react';
import Helmet from "../../layout/Helmet";
import {Link} from "react-router-dom";
import "../../styles/design.scss"
const Design = () => {
    return (
        <Helmet title="Design">
            <section className="design">
                <div className="container">
                    <div className="design__row">
                        <div className="design__column">
                            <Link to="/projects/exterior" className="design__title">ЭКСТЕРЬЕР</Link>
                        </div>
                        <div className="design__column">
                            <Link to="/projects/interior" className="design__title">ИНТЕРЬЕР</Link>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default Design;