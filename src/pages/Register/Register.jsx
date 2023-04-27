import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import Helmet from "../../layout/Helmet";
import {useAddUsersData} from "../../CustomHooks/useUsersData";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useSelector} from "react-redux";

const schema = yup.object({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(2),
    email: yup.string().required().email(),
    password: yup.string().required().min(5),

}).required();

const Register = () => {
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const {} = useSelector(state => state)

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const {mutate:addUser, data:addedUserData, isLoading} = useAddUsersData();

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword){
            setConfirmPasswordError("Parol ne sovpadaet")
        }else {
            setConfirmPasswordError("")
            delete data["confirmPassword"]
            addUser(data)
        }
    };

    if (isAuthenticated){
        return <Navigate to="/login"/>
    }

    return (
        <Helmet title="Register">
            <section className="login">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)} className="form login__form">
                        <div className="login__main">
                            <h3 className="login__description">Регистрация</h3>
                        </div>
                        <div className="field login__field">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                autoComplete="off"
                                {...register("firstName")}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">Имя</span>
                            </label>
                        </div>
                            <p>{errors.firstName?.message}</p>
                        <div className="field login__field">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autoComplete="off"
                                {...register("lastName")}
                            />
                            <label htmlFor="lastName" className="label-wrapper">
                                <span className="label-text">Фамилия</span>
                            </label>
                        </div>
                            <p>{errors.lastName?.message}</p>
                        <div className="field login__field">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                autoComplete="off"
                                required
                                {...register("email")}
                            />
                            <label htmlFor="email" className="label-wrapper">
                                <span className="label-text">электронная почта</span>
                            </label>
                        </div>
                            <p>{errors.email?.message}</p>
                        <div className="field login__field">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="off"
                                {...register("password")}
                            />
                            <label htmlFor="password" className="label-wrapper">
                                <span className="label-text">пароль</span>
                            </label>
                        </div>
                            <p>{errors.password?.message}</p>
                        <div className="field login__field">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                autoComplete="off"
                                {...register("confirmPassword")}
                            />
                            <label htmlFor="confirmPassword" className="label-wrapper">
                                <span className="label-text">подтвердите пароль</span>
                            </label>
                        </div>
                        {
                            confirmPasswordError && <div className="login__message login__error">
                                <p className="login__message-title">{confirmPasswordError}!</p>
                            </div>
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