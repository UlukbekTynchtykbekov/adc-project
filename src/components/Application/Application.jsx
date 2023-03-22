import React, { useState } from 'react';
import "./application.scss"


const Application = () => {
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
        <form onSubmit={handleSubmit} className="form">
            <div className="field">
                <input
                    type="text"
                    id="firstName"
                    autoComplete="off"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="firstName" className="label-wrapper">
                    <span className="label-text">ваша имя и фамилия</span>
                </label>
            </div>
           <div className="input__row">
              <div className="field__first">
                  <div className="field">
                      <input
                          type="text"
                          id="phone"
                          autoComplete="off"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                      />
                      <label htmlFor="email" className="label-wrapper">
                          <span className="label-text">ваш телефон</span>
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
                           value={requestType}
                           onChange={(e) => setRequestType(e.target.value)}
                       />
                       <label htmlFor="requestType" className="label-check">
                           <span className="label-texts">Архитектура</span>
                       </label>
                   </div>
                   <div className="checkbox__check">
                       <input
                           type="checkbox"
                           id="requestType2"
                           value={requestType}
                           onChange={(e) => setRequestType(e.target.value)}
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
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                        />
                        <label htmlFor="requestType3" className="label-check">
                            <span className="label-texts">Реализация проектов</span>
                        </label>
                    </div>
                    <div className="checkbox__check">
                        <input
                            type="checkbox"
                            id="requestType4"
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
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
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                        />
                        <label htmlFor="requestType5" className="label-check">
                            <span className="label-texts">дизайн интерьра</span>
                        </label>
                    </div>
                    <div className="checkbox__check">
                        <input
                            type="checkbox"
                            id="requestType6"
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                        />
                        <label htmlFor="requestType6" className="label-check">
                            <span className="label-texts">дизайн экстерера</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="field">
                <p className="label-disable">(необизательно)</p>
                <input
                    type="text"
                    id="request"
                    autoComplete="off"
                    required
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                />
                <label htmlFor="request" className="label-wrapper">
                    <span className="label-text">ваш запрос</span>
                </label>
            </div>
            <button className="checkbox__btn" type="submit">Отправить</button>
        </form>
    );
};
export default Application;