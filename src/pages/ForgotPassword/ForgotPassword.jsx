import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import {useAddPassword} from "../../CustomHooks/useForgotPassword";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const {mutate: postEmail, data: postedEmail, isLoading: postingEmailLoading} = useAddPassword()


    const handleEmailChange = (event) => {
        const newEmail = event.target.value;

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (emailRegex.test(newEmail) && newEmail.trim().length > 0){
            setEmail(newEmail);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const emailObj = {
            email
        }
        postEmail(emailObj)
    }

    return (
        <Helmet title="Forgot Password">
            <section className="login">
                <div className="container">
                    <form onSubmit={handleSubmit}  className="form login__form">
                        <div className="login__main">
                            <h3 className="login__description">Забыли пароль</h3>
                        </div>
                        <div className="field login__field">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                autoComplete="off"
                                required
                                onChange={(e) => handleEmailChange(e)}
                            />
                            <label htmlFor="email" className="label-wrapper">
                                <span className="label-text">электронная почта</span>
                            </label>
                        </div>
                        {
                            postedEmail?.data?.message && <div className="login__message">
                                <p className="login__message-title">{postedEmail?.data?.message}</p>
                            </div>
                        }
                        {
                            postedEmail?.response?.data?.message && <div className="login__message login__error">
                                <p className="login__message-title">{postedEmail?.response?.data?.message}</p>
                            </div>
                        }
                        <div className="checkbox__items">
                            <button className="checkbox__btn" type="submit" disabled={postingEmailLoading}>Отправить</button>
                            {
                                postingEmailLoading ? <span className="hour-glass checkbox__hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                            }
                        </div>
                    </form>
                </div>
            </section>
        </Helmet>
    );
};

export default ForgotPassword;