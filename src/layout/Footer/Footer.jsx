import React, {useState} from 'react';
import "./Footer.scss"
import {Link} from "react-router-dom";

const Footer = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className="footer__info">
                        <div className="footer-nav">
                            <h4 className="footer__title">ADC</h4>
                            <p className="footer__info__desc">architecture  design  construction</p>
                            <p className="footer__info__add">Бишкек, Абдрахманова,<br/>
                                170/1 бизнес-центр «Ордо», 7 этаж
                            </p>
                            <div className="footer-nav__list list-reset">
                                <Link className="footer-nav__item" to="">
                                    <span className="footer__icon">
                                        <ion-icon name="logo-instagram"></ion-icon>
                                    </span>
                                </Link>
                                <Link className="footer-nav__item" to="">
                                   <span className="footer__icon">
                                        <ion-icon name="logo-whatsapp"></ion-icon>
                                    </span>
                                </Link>
                                <Link className="footer-nav__item" to="">
                                    <span className="footer__icon">
                                        <ion-icon name="logo-facebook"></ion-icon>
                                    </span>
                                </Link>
                                <Link className="footer-nav__item" to="">
                                    <span className="footer__icon">
                                       <ion-icon name="mail-outline"></ion-icon>
                                    </span>
                                </Link>
                            </div>
                            <Link className="footer__info__policy" to="/">Политика конфидициальности</Link>
                        </div>
                        <div className="footer-contact">
                            <h3 className="footer-contact__title">CONTACT</h3>
                            <Link className="footer-contact__mail" to="mailto:adc/companykg.com">adc/companykg.com</Link>
                            <Link className="footer-contact__phone" to="tel:+996999295604">+996 999 295 604</Link>
                        </div>
                    </div>
                    <form className="footer__form" onSubmit={handleSubmit}>
                        <h4 className="footer__form__title">ОСТАВИТЬ ОТЗЫВ</h4>
                        <p className="footer__form__description">Мы  вам  ответим в  любое время</p>
                        <input
                            className="footer__form__input"
                            type="tel"
                            placeholder="Ваш номер"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="footer__form__btn" type="submit">Отправить</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;