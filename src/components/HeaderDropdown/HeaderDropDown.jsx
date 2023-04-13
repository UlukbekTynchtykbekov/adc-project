import React from 'react';
import "./header-dropdown.scss"
import {Link} from "react-router-dom";

const HeaderDropDown = ({user, onClickLogout}) => {
    return (
        <div className="dropdown header__dropdown">
            <div className="dropdown__content">
                <Link to="/profile">
                    <div className="dropdown__item header__item">
                        Profile
                    </div>
                </Link>
                {
                    user.role === "ADMIN" && <Link to="/admin/company">
                        <div className="dropdown__item header__item">
                            Dashboard
                        </div>
                    </Link>
                }
                <div onClick={onClickLogout} className="dropdown__item header__item">
                    Logout
                </div>
            </div>
        </div>
    );
};

export default HeaderDropDown;