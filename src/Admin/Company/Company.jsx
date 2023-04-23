import React from 'react';
import './company.scss'
import Sidebar from "../../components/Sidebar/Sidebar";
import mail from "../../static/img/mail.svg";
import phones from "../../static/img/phone.svg";
import location from "../../static/img/location.svg";
import time from "../../static/img/time.svg";
import Maps from "../../components/Maps";

const Company = ({ email, phone, address, workHours}) => {
    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div className="company">
                    <div className="table company__table">
                        <div className="table__header">
                            <h1 className="table__title">О компании</h1>
                        </div>
                        <div className="company__header">
                            <div className="company__card products">
                                <div className="company__card-item">
                                    <h4 className="company__card-title">
                                        Проекты
                                    </h4>
                                    <p className="company__card-subtitle">
                                        Всего проектов
                                    </p>
                                </div>
                                <div className="company__card-quantity">
                                    <p className="company__card-number">1123</p>
                                </div>
                            </div>
                            <div className="company__card users">
                                <div className="company__card-item">
                                    <h4 className="company__card-title">
                                        Проекты
                                    </h4>
                                    <p className="company__card-subtitle">
                                        Всего проектов
                                    </p>
                                </div>
                                <div className="company__card-quantity">
                                    <p className="company__card-number">1123</p>
                                </div>
                            </div>
                            <div className="company__card admins">
                                <div className="company__card-item">
                                    <h4 className="company__card-title">
                                        Проекты
                                    </h4>
                                    <p className="company__card-subtitle">
                                        Всего проектов
                                    </p>
                                </div>
                                <div className="company__card-quantity">
                                    <p className="company__card-number">1123</p>
                                </div>
                            </div>
                        </div>
                        <div className="contact">
                            <div className="contact__bar">
                                <div className="contact__menu">
                                    <div className="menu__description">
                                        <div className="contact__nav">
                                            <h5 className="nav__title">АРХИТЕКТУРА   ДИЗАЙН   СТРОИТЕЛЬСТВА</h5>
                                        </div>
                                        <div className="contact__des">
                                            <img className="contact__icon" src={mail} alt=""/>
                                            <a className="contact__text" href="mailto:ulukbektynctykbekov@gmail.com">
                                                adc/companykg.com {email}
                                            </a>
                                        </div>
                                        <div className="contact__des">
                                            <img className="contact__icon" src={phones} alt=""/>
                                            <a className="contact__text" href="tel:+996 999 295 604">
                                                +996 999 295 604 {phone}
                                            </a>
                                        </div>
                                        <div className="contact__des">
                                            <img className="contact__icon" src={location} alt=""/>
                                            <p className="contact__text">
                                                Бишкек, Абдрахманова,
                                                170/1 бизнес-центр «Ордо», 7 этаж
                                                {address}
                                            </p>
                                        </div>
                                        <div className="contact__des">
                                            <img className="contact__icon" src={time} alt=""/>
                                            <p className="contact__text">
                                                9:00-20:00 {workHours}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="descriptions">
                                        <p className="descriptions__consultation">Для консультации
                                            +996 (777) 50-50-50
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="contact__bar">
                                <Maps />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Company;