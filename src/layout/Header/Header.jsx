import React, {useEffect, useState} from 'react';
import Logo from "../../static/img/logo.png"
import "./Header.scss"
import {Outlet, Link} from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0);

    const ParallaxStyle = {
        top: `${-scrollPosition * 0.5}px`,
    };

    useEffect(() => {
        function handleScroll() {
            setScrollPosition(window.scrollY);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
      <header className="header" style={ParallaxStyle}>
          <div className="container">
             <div className="header-in">
                 <div className="logo">
                     <img className="logo__img" src={Logo} alt=""/>
                 </div>
                 <nav className={`menu ${isOpen && "open"}`}>
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
                     </ul>
                     <button className="menu__btn">
                         <Link className="btn_link" to="/contacts">КОНТАКТЫ</Link>
                     </button>
                 </nav>
                 <div className={`nav-toggle ${isOpen && "open"}`} onClick={()=> setIsOpen(!isOpen)
                 }>
                     <div className="bar">

                     </div>
                 </div>
             </div>
          </div>
          <Outlet />
      </header>
    );
};

export default Header;