import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import Helmet from "../../layout/Helmet";
import {useAddUsersData} from "../../CustomHooks/useUsersData";
import {useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const {} = useSelector(state => state)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const {mutate:addUser, data:addedUserData, isLoading} = useAddUsersData();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            addUser(formData)
        }
    };

    const validateForm = (data) => {
        const errors = {};
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (data.firstName.trim().length < 2) {
            errors.firstName = "Имя должно быть больше 2"
        }
        if (data.lastName.trim().length < 2) {
            errors.lastName = "Фамилия должно быть больше 2"
        }
        if (!data.email) {
            errors.email = 'Электронная почта обязательна';
        }else if (!re.test(String(data.email).toLowerCase())) {
            errors.email = 'Электронная почта недействительна';
        }
        if (!data.password) {
            errors.password = 'Необходим пароль';
        } else if (data.password.length < 5) {
            errors.password = 'Пароль должен быть не менее 5 символов';
        }
        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Пароль не совпадает';
        }

        return errors
    };

    if (isAuthenticated){
        return <Navigate to="/login"/>
    }

    return (
        <Helmet title="Register">
            <section className="login">
                <div className="container">
                    <form onSubmit={onSubmit} className="form login__form">
                        <div className="login__main">
                            <h3 className="login__description">Регистрация</h3>
                        </div>
                        <div className="field login__field">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                autoComplete="off"
                                onChange={handleInputChange}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">Имя</span>
                            </label>
                        </div>
                        {
                            formErrors.firstName && <p className="error">*{formErrors.firstName}</p>
                        }
                        <div className="field login__field">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autoComplete="off"
                                onChange={handleInputChange}
                            />
                            <label htmlFor="lastName" className="label-wrapper">
                                <span className="label-text">Фамилия</span>
                            </label>
                        </div>
                        {
                            formErrors.lastName && <p className="error">*{formErrors.lastName}</p>
                        }
                        <div className="field login__field">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                autoComplete="off"
                                onChange={handleInputChange}
                            />
                            <label htmlFor="email" className="label-wrapper">
                                <span className="label-text">электронная почта</span>
                            </label>
                        </div>
                        {
                            formErrors.email && <p className="error">*{formErrors.email}</p>
                        }
                        <div className="field login__field">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="off"
                                onChange={handleInputChange}
                            />
                            <label htmlFor="password" className="label-wrapper">
                                <span className="label-text">пароль</span>
                            </label>
                        </div>
                        {
                            formErrors.password && <p className="error">*{formErrors.password}</p>
                        }
                        <div className="field login__field">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                autoComplete="off"
                                onChange={handleInputChange}
                            />
                            <label htmlFor="confirmPassword" className="label-wrapper">
                                <span className="label-text">подтвердите пароль</span>
                            </label>
                        </div>
                        {
                            formErrors.confirmPassword && <p className="error">*{formErrors.confirmPassword}</p>
                        }
                        {
                            addedUserData?.data && <div className="login__message">
                                <p className="login__message-title">{addedUserData?.data}!</p>
                            </div>
                        }
                        {
                            addedUserData?.response?.data && <div className="login__message login__error">
                                <p className="login__message-title">{addedUserData?.response?.data}</p>
                            </div>
                        }
                        <div className="checkbox__items">
                            <button className="checkbox__btn" type="submit" disabled={isLoading}>Отправить</button>
                            {
                                isLoading ? <span className="hour-glass checkbox__hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                            }
                        </div>
                        <div className="form__under-text">
                            У вас есть аккаунта?<Link className="form__link" to='/login'>Войдите</Link>
                        </div>
                    </form>
                </div>
            </section>
        </Helmet>
    );
};

export default Register;