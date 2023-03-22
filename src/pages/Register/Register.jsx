import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Helmet from "../../layout/Helmet";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [requestType, setRequestType] = useState('');
    const [request, setRequest] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Отправляем данные о заявке на сервер или обрабатываем локально
        // Сбрасываем значения полей формы
        setFirstName('');
        setPhone('');
        setEmail('');
        setRequestType('');
        setRequest('');
    };
    return (
        <Helmet title="Register">
            <section className="login">
                <div className="container">
                    <form onSubmit={handleSubmit} className="form login__form">
                        <div className="login__main">
                            <h3 className="login__description">Регистрация</h3>
                        </div>
                        <div className="field login__field">
                            <input
                                type="text"
                                id="firstName"
                                autoComplete="off"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">Имя</span>
                            </label>
                        </div>
                        <div className="field login__field">
                            <input
                                type="text"
                                id="firstName"
                                autoComplete="off"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">Фамилия</span>
                            </label>
                        </div>
                        <div className="field login__field">
                            <input
                                type="text"
                                id="firstName"
                                autoComplete="off"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">электронная почта</span>
                            </label>
                        </div>
                        <div className="field login__field">
                            <input
                                type="text"
                                id="firstName"
                                autoComplete="off"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">пароль</span>
                            </label>
                        </div>
                        <div className="field login__field">
                            <input
                                type="text"
                                id="firstName"
                                autoComplete="off"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">подтвердите пароль</span>
                            </label>
                        </div>
                        <button className="checkbox__btn" type="submit">Отправить</button>
                        <div className="form__under-text">
                            У вас есть аккаунта?<Link className="form__link" to='/register'>Войдите</Link>
                        </div>
                    </form>
                </div>
            </section>
        </Helmet>
    );
};

export default Register;