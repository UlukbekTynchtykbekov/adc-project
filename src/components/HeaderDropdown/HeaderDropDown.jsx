import React from 'react';
import "./header-dropdown.scss"
import {Link} from "react-router-dom";

const HeaderDropDown = ({user, onClickLogout}) => {
    return (
        <div className="dropdown header__dropdown">
            <div className="dropdown__content">
                <Link to="/profile">
                    <div className="dropdown__item header__item">
                        <span className="header__icon"><ion-icon name="person-circle-outline"></ion-icon></span>
                        <p>Profile</p>
                    </div>
                </Link>
                {
                    user.role === "ADMIN" && <Link to="/admin/company">
                        <div className="dropdown__item header__item">
                            <span className="header__icon">
                                <ion-icon name="list-outline"></ion-icon>
                            </span>
                            <p>Panel</p>
                        </div>
                    </Link>
                }
                <div onClick={onClickLogout} className="dropdown__item header__item">
                    <span className="header__icon">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                    <p>
                        Logout
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeaderDropDown;