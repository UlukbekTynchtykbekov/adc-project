import React from 'react';
import correct from "../../static/img/icon-correct-24.png";
import {Link} from "react-router-dom";

const Success = () => {
    return (
        <section className="verification">
            <div className="container">
                <div className="verification__wrapper">
                        <div className="verification__intro">
                            <img className="verification__img" src={correct} alt=""/>
                            <div className="verification__info">
                                <h2 className="verification__title">Сброс пароля</h2>
                                <p className="verification__subtitle">Вы успешно сбросили пароль</p>
                            </div>
                            <Link to="/login">
                                <button className="button verification__btn">
                                    Log In
                                </button>
                            </Link>
                        </div>
                </div>
            </div>
        </section>
    );
};

export default Success;