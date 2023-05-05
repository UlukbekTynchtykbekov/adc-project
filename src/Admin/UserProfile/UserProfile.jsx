import React, {useEffect, useState} from 'react';
import Avatar from "../../static/img/avatar.jpeg";
import {Link, useParams} from "react-router-dom";
import Helmet from "../../layout/Helmet";
import {useUpdateUserRole, useUserData} from "../../CustomHooks/useUsersData";
import {toast, ToastContainer} from "react-toastify";

const UserProfile = () => {

    const [date, setDate] = useState("");
    const {id} = useParams()
    const {data: userData, isLoading: userLoading, isError: userError, error: userErrorMessage, refetch} = useUserData(id);
    const {mutate: updateUserRole, data: updateRoleData} = useUpdateUserRole();

    const handleChangeRoleUser = (id) => {
        updateUserRole({id, role: "USER"})
    }

    const handleChangeRoleAdmin = (id) => {
        updateUserRole({id, role: "ADMIN"})
    }

    useEffect(() => {
        if (userData?.data) {
            const dateString = userData?.data.createdAt;
            const dateParts = dateString.split("T");
            const date = dateParts[0];
            setDate(date)
        }

        if (updateRoleData?.data){
            toast.success('Вы успешно изменили свой профиль', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            refetch()
        }
    }, [updateRoleData?.data])

    return (
        <Helmet title="My Profile">
            <section className="account">
                <div className="container">
                    {userLoading && <div>Loading...</div>}
                    {userError && <div>{userErrorMessage?.message}</div>}
                    {userData?.data &&
                        <div className="account__profile">
                            <div className="account__status">
                                <div className="account__avatar">
                                    <img className="account__img" src={Avatar} alt=""/>
                                </div>
                                {
                                    userData?.data.role === "ADMIN" ? <button className="button account__btn" onClick={() => handleChangeRoleUser(userData?.data._id)}>Выбрать как пользователь</button>
                                        : <button className="button account__btn" onClick={() => handleChangeRoleAdmin(userData?.data._id)}>Выбрать как админ</button>
                                }
                            </div>
                            <div className="account__info">
                                <div className="account__item">
                                    <h2 className="account__title">Full Name:</h2>
                                    <p className="account__subtitle">{userData?.data.firstName} {userData?.data.lastName}</p>
                                </div>
                                <div className="account__item">
                                    <h2 className="account__title">Email:</h2>
                                    <p className="account__subtitle">{userData?.data.email}</p>
                                </div>
                                <div className="account__item">
                                    <h2 className="account__title">Joined on:</h2>
                                    <p className="account__subtitle">{date}</p>
                                </div>
                                <div className="account__item">
                                    <h2 className="account__title">Role:</h2>
                                    <p className="account__subtitle">{userData?.data.role}</p>
                                </div>
                            </div>
                        </div>
                    }
                    {!userLoading && !userData?.data && <div>нет данных</div>}
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </div>
            </section>
        </Helmet>
    );
};

export default UserProfile;