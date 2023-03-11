import React from 'react';
import Logo from "../../static/img/logo.png"
import "./Header.scss"
import {Outlet, Link} from "react-router-dom";
import useParallax from "../../CustomHooks/parallaxHook";

const Header = ({isOpen, setIsOpen}) => {
    const {bgParallaxStyle} = useParallax()

    return (
        <header className="header" style={isOpen ? {transform: "none"} : bgParallaxStyle}>
            <div className="container">
                <div className="navigation">
                    <div className="logo">
                        <img className="logo__img" src={Logo} alt=""/>
                    </div>
                    <nav onClick={() => setIsOpen(false)} className={`menu ${isOpen && "open"}`}>
                        <ul className="menu__item">
                            <li className="menu__link">
                                <Link className="menu__title" to="/projects">ПРОЕКТЫ</Link>
                            </li>
                            <li className="menu__link">
                                <Link className="menu__title" to="/services">УСЛУГИ</Link>
                            </li>
                            <li className="menu__link">
                                <Link className="menu__title" to="/consultation">КОНСУЛЬТАЦИЯ</Link>
                            </li>
                            <li className="menu__link">
                                <Link className="menu__title" to="/about">О НАС</Link>
                            </li>
                            <li className="menu__button button">
                                <Link className="menu__btn" to="/contacts">КОНТАКТЫ</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={`nav-toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                        <div className="bar">

                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
        </header>
    );
};

export default Header;