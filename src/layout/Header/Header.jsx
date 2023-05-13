import React, {useState} from 'react';
import Logo from "../../static/img/logo.png"
import {Outlet, Link, useNavigate, NavLink} from "react-router-dom";
import useParallax from "../../CustomHooks/useParallaxHook";
import Search from "../../static/img/search-line (1).svg"
import Like from "../../static/img/heart-line.svg"
import User from "../../static/img/user-fill.svg"
import {useFavoriteProjects} from "../../CustomHooks/useProjectFavorite";
import HeaderDropDown from "../../components/HeaderDropdown/HeaderDropDown";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../features/authenticatedSlice";
import "./Header.scss"
import {useFavoriteData} from "../../CustomHooks/useFavoriteData";


const Header = ({isOpen, setIsOpen}) => {

    const [headerDropdown, setHeaderDropdown] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {bgParallaxStyle} = useParallax();
    const {data: favoriteData} = useFavoriteData();
    const favoriteId = favoriteData?.data._id;
    const {data: favoriteProjectsData} = useFavoriteProjects(favoriteId);
    const {data: authMe, isAuthenticated} = useSelector(state => state.auth);

    const goLogin = () => {
        return navigate("/login")
    }

    const onClickLogout = () => {
        window.localStorage.removeItem("token")
        dispatch(authActions.logout())
    }

    return (
        <header className="header" style={isOpen ? {transform: "none"} : bgParallaxStyle}>
            <div className="container">
                <div className="navigation">
                    <div className="logo">
                        <Link to="/">
                            <img className="logo__img" src={Logo} alt=""/>
                        </Link>
                    </div>
                    <nav onClick={() => setIsOpen(false)} className={`menu ${isOpen && "open"}`}>
                        <ul className="menu__item">
                            <li className="menu__link">
                                <NavLink className="menu__title" to="/projects">ПРОЕКТЫ</NavLink>
                            </li>
                            <li className="menu__link">
                                <NavLink className="menu__title" to="/services">УСЛУГИ</NavLink>
                            </li>
                            <li className="menu__link">
                                <NavLink className="menu__title" to="/consultation">КОНСУЛЬТАЦИЯ</NavLink>
                            </li>
                            <li className="menu__link">
                                <NavLink className="menu__title" to="/about">О НАС</NavLink>
                            </li>
                            <li className="menu__link">
                                <NavLink className="menu__title" to="/contacts">КОНТАКТЫ</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="panel">
                        <ul className="panel__items">
                            <li className="panel__item">
                                <img className="panel__search" src={Search} alt=""/>
                            </li>
                            <li className="panel__item panel__like-item">
                                <Link className="panel__navigation" to={isAuthenticated ? "/favorite" : "/login"}>
                                    {
                                        favoriteProjectsData?.data && isAuthenticated ? <span
                                            className="panel__quantity">{favoriteProjectsData?.data.length}</span> : ""
                                    }
                                    <img className="panel__like" src={Like} alt=""/>
                                </Link>
                            </li>
                            <li className="panel__item user">
                                <div className={isAuthenticated ? "panel__user-roller" : ""}
                                     onClick={isAuthenticated ? () => setHeaderDropdown(!headerDropdown) : () => goLogin()}>
                                    <div className={isAuthenticated ? "panel__user-wrapper close" : "panel__user-wrapper"}>
                                        <img className="panel__user" src={User} alt=""/>
                                    </div>
                                    {
                                        isAuthenticated && (
                                            <div className="user__info">
                                                <p className="user__name">{authMe?.firstName.charAt(0)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        headerDropdown && <HeaderDropDown user={authMe} onClickLogout={onClickLogout}/>
                                    }
                                </div>
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