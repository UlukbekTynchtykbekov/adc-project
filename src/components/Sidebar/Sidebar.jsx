import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../static/img/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../features/authenticatedSlice";
import './sidebar.scss'
import User from "../../Admin/User";

const Sidebar = () => {

    const { data } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onClickLogout = () => {
        window.localStorage.removeItem("token")
        dispatch(authActions.logout())
    }

    return (
        <div className="sidebar">
            <div className="navigation sidebar__navigation">
                <div className="sidebar__bar">
                    <div className="logo sidebar__logo">
                        <Link to="/">
                            <img className="logo__img sidebar__logo-img" src={Logo} alt=""/>
                        </Link>
                    </div>
                    <ul className="nav">
                        <li className="nav__list">
                            <Link to="/admin/company" className="nav__link">
                            <span className="nav__icon">
                                <ion-icon name="business-outline"></ion-icon>
                            </span>
                                <p className="nav__item">
                                    О компании
                                </p>
                            </Link>
                        </li>
                        <li className="nav__list">
                            <Link to="/admin/projects" className="nav__link">
                             <span className="nav__icon">
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                                <p className="nav__item">
                                    Проекты
                                </p>
                            </Link>
                        </li>
                        <li className="nav__list">
                            <Link to="/admin/project-info" className="nav__link">
                             <span className="nav__icon">
                                <ion-icon name="information-circle-outline"></ion-icon>
                            </span>
                                <p className="nav__item">
                                    Информация о проекте
                                </p>
                            </Link>
                        </li>
                        <li className="nav__list">
                            <Link to="/admin/categories" className="nav__link">
                            <span className="nav__icon">
                                <ion-icon name="list-outline"></ion-icon>
                            </span>
                                <p className="nav__item">
                                    Категории
                                </p>
                            </Link>
                        </li>
                        <li className="nav__list">
                            <Link to="/admin/architect" className="nav__link">
                        <span className="nav__icon">
                                <ion-icon name="pencil-outline"></ion-icon>
                            </span>
                                <p className="nav__item">
                                    Архитекторы и дизайнеры
                                </p>
                            </Link>
                        </li>
                        <li className="nav__list">
                            <Link to="/admin/square" className="nav__link">
                        <span className="nav__icon">
                                <ion-icon name="cube-outline"></ion-icon>
                            </span>
                                <p className="nav__item">
                                    Квадраты
                                </p>
                            </Link>
                        </li>
                        <li className="nav__list">
                            <Link to="/admin/rooms" className="nav__link">
                            <span className="nav__icon">
                                <ion-icon name="storefront-outline"></ion-icon>
                            </span>
                                <p className="nav__item">
                                    Количество Комнаты
                                </p>
                            </Link>
                        </li>
                        <li className="nav__list">
                            <Link className="nav__link">
                            <span className="nav__icon">
                                <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                            </span>
                                <p className="nav__item">
                                    Комментарии
                                </p>
                            </Link>
                        </li>
                        <li className="nav__list">
                            <Link to="/admin/users" className="nav__link">
                            <span className="nav__icon">
                                 <ion-icon name="people-circle-outline"></ion-icon>
                            </span>
                                <p className="nav__item">
                                    Пользователи
                                </p>
                            </Link>
                        </li>
                        <li className="nav__list">
                            <Link className="nav__link" to="/admin/admins">
                            <span className="nav__icon">
                                <ion-icon name="people-outline"></ion-icon>
                            </span>
                                <p className="nav__item">
                                    Админы
                                </p>
                            </Link>
                        </li>
                        <li>
                            <div className="profile">
                                <div className="profile__content">
                                    <div className="profile__name">{data.firstName} {data.lastName}</div>
                                    <div className="profile__job">{data.role}</div>
                                </div>
                                <span onClick={() => onClickLogout()} className="profile__icon">
                                    <ion-icon name="log-out-outline"></ion-icon>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;