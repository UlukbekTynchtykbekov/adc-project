import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import {useAddPassword} from "../../CustomHooks/useForgotPassword";
import {showSuccessNotification, showErrorNotification} from "../../CustomHooks/useToast";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const {mutate: postEmail, data: postedEmail, isLoading: postingEmailLoading, isError, error} = useAddPassword(showSuccessNotification, showErrorNotification);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            postEmail(formData)
        }
    };

    const validateForm = (data) => {
        const errors = {};
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.email) {
            errors.email = 'Электронная почта обязательна';
        }else if (!re.test(String(data.email).toLowerCase())) {
            errors.email = 'Электронная почта недействительна';
        }

        return errors
    };

    return (
        <Helmet title="Forgot Password">
            <section className="login">
                <div className="container">
                    <form onSubmit={onSubmit}  className="form login__form">
                        <div className="login__main">
                            <h3 className="login__description">Забыли пароль</h3>
                        </div>
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
                        {
                            isError && <div className="login__message">
                                <p className="login__message-title">{error?.message}</p>
                            </div>
                        }
                        {
                            postedEmail?.data?.message && <div className="login__message">
                                <p className="login__message-title">{postedEmail?.data?.message}</p>
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