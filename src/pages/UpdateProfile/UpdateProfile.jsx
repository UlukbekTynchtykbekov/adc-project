import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import {useUpdateUser} from "../../CustomHooks/useAuth";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {showSuccessNotification, showErrorNotification} from "../../CustomHooks/useToast";
import "../../styles/update-profile.scss"

const UpdateProfile = () => {
    const {data: authMe} = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        firstName: authMe?.firstName,
        lastName: authMe?.firstName,
    });
    const [formErrors, setFormErrors] = useState({});
    const {mutate: updateUser, isLoading: updateLoading, isSuccess} = useUpdateUser(showSuccessNotification, showErrorNotification);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            updateUser(formData)
        }
    }

    const validateForm = (data) => {
        const errors = {};

        if (data.firstName.trim().length < 3 && data.firstName.trim().length < 50) {
            errors.firstName = "Имя должно быть больше 3 букв и меньше 50 букв";
        }

        if (data.lastName.trim().length < 3 && data.lastName.trim().length < 50) {
            errors.lastName = "Фамилия должно быть больше 3 букв и меньше 50 букв";
        }

        return errors;
    };

    if (isSuccess) {
        return <Navigate to="/profile"/>
    }

    return (
        <Helmet title="Update Profile">
            <section className="login">
                <div className="container">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="login__main">
                            <h3 className="login__description">Редактировать профиль</h3>
                        </div>
                        <div className="field login__field">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                autoComplete="off"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">Имя</span>
                            </label>
                        </div>
                        {
                            formErrors.firstName && <p className="error">*{formErrors.firstName}</p>
                        }
                        <div className="field">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autoComplete="off"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="lastName" className="label-wrapper">
                                <span className="label-text">Фамилия</span>
                            </label>
                        </div>
                        {
                            formErrors.lastName && <p className="error">*{formErrors.lastName}</p>
                        }
                        <div className="checkbox__items">
                            <button className="checkbox__btn"
                                    type="submit"
                                    disabled={updateLoading}>
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Helmet>
    );
};

export default UpdateProfile;