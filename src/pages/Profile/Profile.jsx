import React from 'react';
import Avatar from "../../static/img/avatar.jpeg"
import Helmet from "../../layout/Helmet";
import {useDispatch, useSelector} from "react-redux";
import "./profile.scss"
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {authActions} from "../../features/authenticatedSlice";

const Profile = () => {

    const dispatch = useDispatch();
    const {data: authMe} = useSelector(state => state.auth);

    const dateString = authMe.createdAt;
    const dateParts = dateString.split("T");
    const date = dateParts[0];

    const onClickLogout = () => {
        window.localStorage.removeItem("token")
        dispatch(authActions.logout())
    }

    return (
        <Helmet title="My Profile">
            <section className="account">
                <div className="container">
                    <div className="account__profile">
                        <div className="account__status">
                            <div className="account__avatar">
                                <img className="account__img" src={Avatar} alt=""/>
                            </div>
                            <Link to="/me/update">
                                <button className="button account__btn">Редактировать</button>
                            </Link>
                        </div>
                        <div className="account__info">
                            <div className="account__item">
                                <h2 className="account__title">Full Name:</h2>
                                <p className="account__subtitle">{authMe?.firstName} {authMe?.lastName}</p>
                            </div>
                            <div className="account__item">
                                <h2 className="account__title">Email:</h2>
                                <p className="account__subtitle">{authMe?.email}</p>
                            </div>
                            <div className="account__item">
                                <h2 className="account__title">Joined on:</h2>
                                <p className="account__subtitle">{date}</p>
                            </div>
                            <div className="account__buttons">
                                <Link to="/me/update/password">
                                    <button className="button account__change-btn">
                                        Изменить пароль
                                    </button>
                                </Link>
                                <button className="button account__change-btn" onClick={onClickLogout}>
                                    Выйти
                                </button>
                            </div>
                        </div>
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </div>
            </section>
        </Helmet>
    );
};

export default Profile;