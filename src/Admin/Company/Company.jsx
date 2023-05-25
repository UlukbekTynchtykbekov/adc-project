import React, {useEffect, useMemo, useRef} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {useCompanyData} from "../../CustomHooks/useCompanyData";
import {Link} from "react-router-dom";
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import {useUsersData} from "../../CustomHooks/useUsersData";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";
import './company.scss'
import {useSelector} from "react-redux";

const Company = () => {
    const {openSidebar} = useSelector(state => state.sidebar);
    const elementRefs = useRef(null);
    const {data: companyData, isLoading: companyLoading, isError} = useCompanyData();
    const {
        data: productData,
        isLoading: productDataLoading,
        isError: productIsError,
    } = useProjectsData();
    const {data: users, isLoading: userLoading, isError: usersIsError} = useUsersData()

    const filteredUsers = useMemo(() => {
        let onlyUsers = [];
        if (users?.data) {
            onlyUsers = users?.data.filter(user => {
                return user.role === "USER"
            })
        }

        return onlyUsers;
    }, [users?.data])

    const filteredAdmins = useMemo(() => {
        let onlyAdmins = [];
        if (users?.data) {
            onlyAdmins = users?.data.filter(user => {
                return user.role === "ADMIN"
            })
        }

        return onlyAdmins;
    }, [users?.data]);

      useEffect(() => {
        if (elementRefs.current) {
            elementRefs.current.classList.toggle('close', openSidebar);
        }
    }, [openSidebar])

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div ref={elementRefs} className="company">
                    <div className="table company__table">
                        <div className="table__header">
                            <h1 className="table__title">О компании</h1>
                        </div>
                        <>
                            {productDataLoading || userLoading || productDataLoading ?  <Loader /> : null}
                            {isError || productIsError || usersIsError ? <Error page="Not Found"/> : null}
                            {
                                companyData?.data && productData?.data && users?.data && <>
                                    <div className="company__header">
                                        <div className="company__card products">

                                            <div className="company__card-item">
                                                <h4 className="company__card-title">
                                                    Проекты
                                                </h4>
                                                <p className="company__card-subtitle">
                                                    Всего проектов
                                                </p>
                                            </div>
                                            <div className="company__card-quantity">
                                                {
                                                    <p className="company__card-number">{productData?.data ? productData?.data.length : 0}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="company__card users">
                                            <div className="company__card-item">
                                                <h4 className="company__card-title">
                                                    Пользователи
                                                </h4>
                                                <p className="company__card-subtitle">
                                                    Всего пользователей
                                                </p>
                                            </div>
                                            <div className="company__card-quantity">
                                                {
                                                    <p className="company__card-number">{filteredUsers?.length > 0 ? filteredUsers?.length : 0}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="company__card admins">
                                            <div className="company__card-item">
                                                <h4 className="company__card-title">
                                                    Админы
                                                </h4>
                                                <p className="company__card-subtitle">
                                                    Всего админов
                                                </p>
                                            </div>
                                            <div className="company__card-quantity">
                                                {
                                                    <p className="company__card-number">{filteredAdmins?.length > 0 ? filteredAdmins.length : 0}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {companyData?.data &&
                                        <div className="contact company__contact">
                                            {
                                                companyData?.data.map(el => (
                                                        <div key={el._id} className="contact__bar company__bar">
                                                            <div key={el._id} className="contact__menu company__menu">
                                                                <div className="menu__description">
                                                                    <div className="contact__nav">
                                                                        <h5 className="nav__title">КОМПАНИЯ {el.name}</h5>
                                                                    </div>
                                                                    <div className="contact__des company__des">
                                                                        <svg className="contact__icon company__icon" width="26"
                                                                             height="26"
                                                                             viewBox="0 0 26 26" fill="white"
                                                                             xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M21.5313 4.87524H4.46875C3.34692 4.87524 2.4375 5.78467 2.4375 6.90649V19.094C2.4375 20.2158 3.34692 21.1252 4.46875 21.1252H21.5313C22.6531 21.1252 23.5625 20.2158 23.5625 19.094V6.90649C23.5625 5.78467 22.6531 4.87524 21.5313 4.87524Z"
                                                                                stroke="black" strokeWidth="1.00189"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"/>
                                                                            <path
                                                                                d="M5.68848 8.12549L13.001 13.813L20.3135 8.12549"
                                                                                stroke="black" strokeWidth="1.00189"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"/>
                                                                        </svg>
                                                                        <a className="contact__text company__contact-text"
                                                                           href="mailto:ulukbektynctykbekov@gmail.com">
                                                                            {el.email}
                                                                        </a>
                                                                    </div>
                                                                    <div className="contact__des company__des">
                                                                        <svg className="contact__icon company__icon" width="21"
                                                                             height="21"
                                                                             viewBox="0 0 21 21" fill="white"
                                                                             xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M19.26 15.801C18.5467 15.0822 16.819 14.0333 15.9807 13.6106C14.8891 13.0608 14.7993 13.0158 13.9413 13.6533C13.369 14.0787 12.9885 14.4587 12.3187 14.3159C11.6489 14.173 10.1934 13.3676 8.919 12.0972C7.64457 10.8268 6.7924 9.3291 6.6491 8.66156C6.5058 7.99402 6.89213 7.61802 7.3135 7.04437C7.90736 6.23577 7.86244 6.10101 7.35483 5.00941C6.95906 4.16038 5.87959 2.44886 5.15815 1.73909C4.38639 0.97677 4.38639 1.11154 3.8891 1.31818C3.48426 1.48851 3.09586 1.69557 2.72877 1.93675C2.01002 2.41427 1.61112 2.81093 1.33215 3.40704C1.05319 4.00316 0.927855 5.40068 2.3685 8.01783C3.80914 10.635 4.81988 11.9732 6.9119 14.0594C9.00391 16.1455 10.6126 17.2672 12.9642 18.5861C15.8734 20.2155 16.9892 19.8979 17.5871 19.6194C18.185 19.3408 18.5835 18.9455 19.0619 18.2268C19.3037 17.8603 19.5112 17.4723 19.6818 17.0678C19.8889 16.5723 20.0237 16.5723 19.26 15.801Z"
                                                                                stroke="black" strokeWidth="1.00189"
                                                                                strokeMiterlimit="10"/>
                                                                        </svg>
                                                                        <a className="contact__text company__contact-text"
                                                                           href="tel:+996 999 295 604">
                                                                            +{el.phoneNumber}
                                                                        </a>
                                                                    </div>
                                                                    <div className="contact__des company__des">
                                                                        <svg className="contact__icon company__icon" width="29"
                                                                             height="29"
                                                                             viewBox="0 0 29 29" fill="white"
                                                                             xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M14.499 2.71875C9.99609 2.71875 6.34277 6.19592 6.34277 10.4785C6.34277 15.4063 11.7803 23.2153 13.7769 25.9125C13.8597 26.0264 13.9684 26.119 14.0939 26.1829C14.2194 26.2468 14.3582 26.2801 14.499 26.2801C14.6398 26.2801 14.7787 26.2468 14.9042 26.1829C15.0297 26.119 15.1383 26.0264 15.2212 25.9125C17.2178 23.2164 22.6553 15.4102 22.6553 10.4785C22.6553 6.19592 19.002 2.71875 14.499 2.71875Z"
                                                                                stroke="black" strokeWidth="1.00189"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"/>
                                                                            <path
                                                                                d="M14.502 13.598C16.0046 13.598 17.2228 12.3799 17.2228 10.8772C17.2228 9.37462 16.0046 8.15649 14.502 8.15649C12.9994 8.15649 11.7812 9.37462 11.7812 10.8772C11.7812 12.3799 12.9994 13.598 14.502 13.598Z"
                                                                                stroke="black" strokeWidth="1.00189"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"/>
                                                                        </svg>
                                                                        <p className="contact__text company__contact-text">
                                                                            {el.state}, {el.city}, {el.street}
                                                                        </p>
                                                                    </div>
                                                                    {
                                                                        el.workSchedule && el.workSchedule.map(schedule => (
                                                                            <div key={schedule._id}
                                                                                 className="contact__des company__des">
                                                                                <svg className="contact__icon company__icon"
                                                                                     width="33"
                                                                                     height="33" viewBox="0 0 33 33" fill="white"
                                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M16.5 4.12695C9.66797 4.12695 4.125 9.66992 4.125 16.502C4.125 23.334 9.66797 28.877 16.5 28.877C23.332 28.877 28.875 23.334 28.875 16.502C28.875 9.66992 23.332 4.12695 16.5 4.12695Z"
                                                                                        stroke="black" strokeWidth="1.00189"
                                                                                        strokeMiterlimit="10"/>
                                                                                    <path d="M16.5 8.24829V17.5309H22.6884"
                                                                                          stroke="black"
                                                                                          strokeWidth="1.00189"
                                                                                          strokeLinecap="round"
                                                                                          strokeLinejoin="round"/>
                                                                                </svg>
                                                                                <p className="contact__text company__contact-text">
                                                                                    {schedule.fromTime}-{schedule.toTime}
                                                                                </p>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className="descriptions company__description">
                                                                    <div
                                                                        className="descriptions__consultation company__contact-text">Для
                                                                        консультации
                                                                        <p>+{el.suggestionPhoneNumber}</p>
                                                                    </div>
                                                                    <div className="company__filter">
                                                                        <Link to={`/admin/company/${el._id}`}>
                                                                            <button className="button company__add-btn">
                                                                                Редактировать
                                                                            </button>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    }
                                    {!companyLoading && !isError && companyData?.data.length === 0 &&
                                        <EmptyItems />
                                    }
                                </>
                            }
                        </>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Company;