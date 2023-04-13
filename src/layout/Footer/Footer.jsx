import React, {useState} from 'react';
import "./Footer.scss"
import Like from "../../static/img/heart-line.svg";
import {Link} from "react-router-dom";

const Footer = () => {
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({message});
        setMessage('');
    };
    return (
        <footer className="footer">
            <div className="container">
                <div>
                    <h4 className="form__description">ADC</h4>
                    <p className="form__description">architecture  design  construction</p>
                </div>
                <div>
                    <p className="form__description">Бишкек, Абдрахманова,
                        170/1 бизнес-центр «Ордо», 7 этаж
                    </p>
                </div>
                <div>
                    <Link className="panel__navigation" to="">
                        <img className="panel__like" src={Like} alt=""/>
                    </Link>
                    <Link className="panel__navigation" to="">
                        <img className="panel__like" src={Like} alt=""/>
                    </Link>
                    <Link className="panel__navigation" to="">
                        <img className="panel__like" src={Like} alt=""/>
                    </Link>
                    <Link className="panel__navigation" to="">
                        <img className="panel__like" src={Like} alt=""/>
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <h4 className="form__description">ОСТАВИТЬ ОТЗЫВ</h4>
                    <p className="form__description">Мы  вам  ответим в  любое время</p>
                    <input
                        type="tel"
                        placeholder="Ваш номер"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </footer>
    );
};

export default Footer;