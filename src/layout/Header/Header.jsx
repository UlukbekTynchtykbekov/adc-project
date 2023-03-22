import React from 'react';
import Logo from "../../static/img/logo.png"
import "./Header.scss"
import {Outlet, Link} from "react-router-dom";
import useParallax from "../../CustomHooks/parallaxHook";
import Search from "../../static/img/search-line (1).svg"
import Like from "../../static/img/heart-line.svg"
import User from "../../static/img/user-fill.svg"
import Dashboard from "../../static/img/layout-grid-fill.svg"

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
                            <li className="menu__link">
                                <Link className="menu__title" to="/contacts">КОНТАКТЫ</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="panel">
                        <ul className="panel__items">
                            <li className="panel__item">
                                <img className="panel__search" src={Search} alt=""/>
                            </li>
                            <li className="panel__item">
                                <Link className="panel__navigation" to="">
                                    <img className="panel__like" src={Like} alt=""/>
                                </Link>
                            </li>
                            <li className="panel__item">
                                <Link className="panel__navigation" to="">
                                    <img className="panel__dashboard" src={Dashboard} alt=""/>
                                </Link>
                            </li>
                            <li className="panel__item">
                                <Link className="panel__navigation" to="/login">
                                    <div className="panel__user-wrapper">
                                        <img className="panel__user" src={User} alt=""/>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
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