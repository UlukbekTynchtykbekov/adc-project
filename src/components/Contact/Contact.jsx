import React from 'react';
import mail from "../../static/img/mail.svg"
import phones from "../../static/img/phone.svg"
import location from "../../static/img/location.svg"
import time from "../../static/img/time.svg"
import Maps from "../Maps";
import {useCompanyData} from "../../CustomHooks/useCompanyData";
import Loader from "../Loader/Loader";
import Error from "../ErrorComponent/Error";
import EmptyItems from "../EmtyItems/EmptyItems";
import "./contact.scss"

const Contact = () => {

    const {data: companyData, isLoading: companyLoading, isError, error} = useCompanyData();

    if (companyLoading){
        return <Loader changeColor={true}/>
    }

    if (isError){
        return <Error status={error?.status} page={error?.message} changeColor={true}/>
    }

    if (!companyData?.data){
        return <EmptyItems changeColor={true}/>
    }

    return (
        <div className="contact">
            {
                companyData?.data.map(el => (
                    <div className="contact__bar">
                        <div className="contact__menu">
                            <div className="menu__description">
                                <div className="contact__nav">
                                    <h5 className="nav__title">АРХИТЕКТУРА   ДИЗАЙН   СТРОИТЕЛЬСТВА</h5>
                                </div>
                                <div className="contact__des">
                                    <img className="contact__icon" src={mail} alt=""/>
                                    <a className="contact__text" href="mailto:ulukbektynctykbekov@gmail.com">
                                        {el.email}
                                    </a>
                                </div>
                                <div className="contact__des">
                                    <img className="contact__icon" src={phones} alt=""/>
                                    <a className="contact__text" href="tel:+996 999 295 604">
                                        +{el.phoneNumber}
                                    </a>
                                </div>
                                <div className="contact__des">
                                    <img className="contact__icon" src={location} alt=""/>
                                    <p className="contact__text">
                                        {el.state}, {el.city}, {el.street}
                                    </p>
                                </div>
                                {
                                    el.workSchedule && el.workSchedule.map(schedule => (
                                        <div key={schedule._id} className="contact__des">
                                            <img className="contact__icon" src={time} alt=""/>
                                            <p className="contact__text">
                                                {schedule.fromTime}-{schedule.toTime}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="descriptions">
                                <p className="descriptions__consultation">Для консультации
                                    +{el.suggestionPhoneNumber}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className="contact__bar">
                <Maps />
          </div>
        </div>
    );
};

export default Contact;