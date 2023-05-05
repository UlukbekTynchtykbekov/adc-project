import React, {useEffect, useState} from 'react';
import Helmet from "../../layout/Helmet";
import {Navigate, useParams} from "react-router-dom";
import {useResetData, useResetPasswordData} from "../../CustomHooks/useForgotPassword";

const PasswordReset = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");

    const param = useParams()

    const {data, isLoading} = useResetPasswordData({param});
    const {mutate: postNewPassword, data: resetPasswordData, isLoading: resetPasswordLoading} = useResetData()

    console.log(resetPasswordData)

    useEffect(() => {
        if (data?.data) {
            setValidUrl(true)
        } else {
            setValidUrl(false)
        }
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPassword = {
            password
        }
        if (newPassword.password === confirmPassword) {
            postNewPassword({... param, ...newPassword})
        } else {
            setError("пароль не совпадает")
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (resetPasswordData?.data){
        return <Navigate to={`/${param.id}/${param.token}/success`}/>
    }

    return (
        <Helmet title="Reset Password">
            <section className="login">
                <div className="container">
                    {
                        validUrl ? <form onSubmit={handleSubmit} className="form login__form">
                            <div className="login__main">
                                <h3 className="login__description">Добавить новый пароль</h3>
                            </div>
                            <div className="field login__field">
                                <input
                                    type="text"
                                    name="password"
                                    id="password"
                                    autoComplete="off"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="password" className="label-wrapper">
                                    <span className="label-text">пароль</span>
                                </label>
                            </div>
                            <div className="field login__field">
                                <input
                                    type="text"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    autoComplete="off"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <label htmlFor="confirmPassword" className="label-wrapper">
                                    <span className="label-text">подтвердите пароль</span>
                                </label>
                            </div>
                            {
                                error && <div className="login__message  login__error">
                                    <p className="login__message-title">{error}</p>
                                </div>
                            }
                            {
                                resetPasswordData?.data && <div className="login__message">
                                    <p className="login__message-title">{resetPasswordData?.data}</p>
                                </div>
                            }
                            {
                                resetPasswordData?.response?.data?.message && <div className="login__message login__error">
                                    <p className="login__message-title">{resetPasswordData?.response?.data?.message}</p>
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
                        </form> : <h1>404 Not Found</h1>
                    }
                </div>
            </section>
        </Helmet>
    );
};

export default PasswordReset;