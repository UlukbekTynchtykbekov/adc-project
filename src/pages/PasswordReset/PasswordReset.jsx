import React, {useEffect, useState} from 'react';
import Helmet from "../../layout/Helmet";
import {Navigate, useParams} from "react-router-dom";
import {useResetData, useResetPasswordData} from "../../CustomHooks/useForgotPassword";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";

const PasswordReset = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        param: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams()

    const {data, isLoading} = useResetPasswordData({param});
    const {mutate: postNewPassword, data: resetPasswordData, isLoading: resetPasswordLoading, isError: resetPasswordIsError, error, isSuccess} = useResetData()

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            postNewPassword({...formData, param: param})
        }
    };

    const validateForm = (data) => {
        const errors = {};

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

    useEffect(() => {
        if (data?.data) {
            setValidUrl(true)
        } else {
            setValidUrl(false)
        }
    }, [data]);

    if (isSuccess){
        return <Navigate to={`/${param.id}/${param.token}/success`}/>
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Helmet title="Reset Password">
            <section className="login">
                <div className="container">
                    {
                        validUrl ? <form onSubmit={onSubmit} className="form login__form">
                            <div className="login__main">
                                <h3 className="login__description">Добавить новый пароль</h3>
                            </div>
                            <div className="field login__field">
                                <input
                                    type="text"
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
                                    type="text"
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
                                resetPasswordData?.data && <div className="login__message">
                                    <p className="login__message-title">{resetPasswordData?.data}</p>
                                </div>
                            }
                            {
                                resetPasswordIsError && <div className="login__message login__error">
                                    <p className="login__message-title">{error?.message}</p>
                                </div>
                            }
                            <div className="checkbox__items">
                                <button className="checkbox__btn" type="submit" disabled={resetPasswordLoading}>Отправить</button>
                                    {
                                        resetPasswordLoading ? <span className="hour-glass checkbox__hour-glass">
                                    <ion-icon name="hourglass-outline"></ion-icon>
                                </span> : null
                                    }
                            </div>
                        </form> : <Error page="Invalid Link" changeColor={true} />
                    }
                </div>
            </section>
        </Helmet>
    );
};

export default PasswordReset;