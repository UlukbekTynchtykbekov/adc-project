import React, { useState } from 'react';
import {useSendMessage} from "../../CustomHooks/useTelegrammBot";
import { showSuccessNotification, showErrorNotification } from "../../CustomHooks/useToast"
import 'react-phone-number-input/style.css'
import "./application.scss"

const Application = () => {

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState("");
    const [categories, setCategories] = useState({});
    const [request, setRequest] = useState("");

    const { mutate: senMessage, isLoading } = useSendMessage(showSuccessNotification, showErrorNotification)
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCategories(prevState => ({
            ...prevState, [name]: checked
        }))
    }

    const keys = Object.keys(categories);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = "Name: " + name +  "\nPhone number: " + phoneNumber +  "\nEmail: " + email +  "\nCategories: " + JSON.stringify(keys) +  "\nRequest: " + request;
        senMessage(data);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="field">
                <input
                    type="text"
                    id="firstName"
                    autoComplete="off"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="firstName" className="label-wrapper">
                    <span className="label-text">ваша имя и фамилия</span>
                </label>
            </div>
           <div className="input__row">
              <div className="field__first">
                  <div className="field">
                      <input
                          type="tel"
                          id="phone"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <label htmlFor="phoneNumber" className="label-wrapper">
                          <span className="label-text">Номер телефона</span>
                      </label>
                  </div>
              </div>
               <div className="field__first">
                   <div className="field">
                       <input
                           type="email"
                           id="email"
                           autoComplete="off"
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                       />
                       <label htmlFor="email" className="label-wrapper">
                           <span className="label-text">Электронная почта</span>
                       </label>
                   </div>
               </div>
           </div>
            <div className="checkbox">
               <div>
                   <div className="checkbox__check">
                       <input
                           type="checkbox"
                           id="requestType"
                           name="architecture"
                           value={categories.architecture}
                           onChange={handleCheckboxChange}
                       />
                       <label htmlFor="requestType" className="label-check">
                           <span className="label-texts">Архитектура</span>
                       </label>
                   </div>
                   <div className="checkbox__check">
                       <input
                           type="checkbox"
                           name="equipment"
                           value={categories.equipment}
                           onChange={handleCheckboxChange}
                       />
                       <label htmlFor="requestType2" className="label-check">
                           <span className="label-texts">Комплектация проекта</span>
                       </label>
                   </div>
               </div>
                <div>
                    <div className="checkbox__check">
                        <input
                            type="checkbox"
                            id="requestType3"
                            name="realization"
                            value={categories.realization}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="requestType3" className="label-check">
                            <span className="label-texts">Реализация проектов</span>
                        </label>
                    </div>
                    <div className="checkbox__check">
                        <input
                            type="checkbox"
                            id="requestType4"
                            name="decoration"
                            value={categories.decoration}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="requestType4" className="label-check">
                            <span className="label-texts">декорирование</span>
                        </label>
                    </div>
                </div>
                <div>
                    <div className="checkbox__check">
                        <input
                            width="24"
                            height="24"
                            type="checkbox"
                            id="requestType5"
                            name="interior"
                            value={categories.interior}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="requestType5" className="label-check">
                            <span className="label-texts">дизайн интерьра</span>
                        </label>
                    </div>
                    <div className="checkbox__check">
                        <input
                            type="checkbox"
                            id="requestType6"
                            name="exterior"
                            value={categories.exterior}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="requestType6" className="label-check">
                            <span className="label-texts">дизайн экстерера</span>
                        </label>
                    </div>
                </div>
            </div>
            <p className="label-disable">(необизательно)</p>
            <div className="field field-request">
                <input
                    type="text"
                    id="request"
                    autoComplete="off"
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                />
                <label htmlFor="request" className="label-wrapper">
                    <span className="label-text">ваш запрос</span>
                </label>
            </div>
            <button className="checkbox__btn" type="submit" disabled={isLoading}>Отправить</button>
        </form>
    );
};
export default Application;