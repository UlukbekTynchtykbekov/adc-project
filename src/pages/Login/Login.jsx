import React from 'react';
import Helmet from "../../layout/Helmet";
import {useAddLoginData, useLoginMe} from "../../CustomHooks/useAuth";
import {Link, Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import "../../styles/login.scss"
import {useSelector} from "react-redux";

const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
}).required();

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const {mutate: addLogin, data, isLoading, isError, error} = useAddLoginData();

    const onSubmit = (user) => {
        addLogin(user)
    };

    if (isLoading) {
        return <div style={{color: "white"}}>Loading....</div>
    }

    if (isError) {
        return <div>
            {error?.response.data}
        </div>
    }

    if (data?.data){
        window.localStorage.setItem("token", data?.data)
    }

    if (isAuthenticated){
        return <Navigate to="/"/>
    }

    return (
        <Helmet title="Login">
            <section className="login">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)} className="form login__form">
                        <div className="login__main">
                            <h3 className="login__description">Логин</h3>
                        </div>
                        <div className="field login__field">
                            <input
                                type="email"
                                id="email"
                                autoComplete="on"
                                {...register("email")}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">электронная почта</span>
                            </label>
                        </div>
                        <p>{errors.email?.message}</p>
                        <div className="field login__field">
                            <input
                                type="password"
                                id="password"
                                autoComplete="on"
                                {...register("password")}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">пароль</span>
                            </label>
                        </div>
                        <p>{errors.password?.message}</p>
                        <button className="checkbox__btn" type="submit">Отправить</button>
                        <div className="form__under-text">
                            У вас еще нет аккаунта?<Link className="form__link" to='/register'>Зарегистрироваться
                            сейчас</Link>
                        </div>
                    </form>
                </div>
            </section>
        </Helmet>
    );
};

export default Login;