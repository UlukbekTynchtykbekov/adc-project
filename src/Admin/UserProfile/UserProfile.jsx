import React, {useEffect, useState} from 'react';
import Avatar from "../../static/img/avatar.jpeg";
import { useParams} from "react-router-dom";
import Helmet from "../../layout/Helmet";
import {useUpdateUserRole, useUserData} from "../../CustomHooks/useUsersData";
import { showSuccessNotification, showErrorNotification } from "../../CustomHooks/useToast"
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";

const UserProfile = () => {

    const [date, setDate] = useState("");
    const {id} = useParams()
    const {data: userData, isLoading: userLoading, isError, error, refetch} = useUserData(id);
    const {mutate: updateUserRole, data: updateRoleData} = useUpdateUserRole( showSuccessNotification, showErrorNotification );

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
            refetch()
        }
    }, [updateRoleData?.data, refetch, userData?.data])

    return (
        <Helmet title="My Profile">
            <section className="account">
                <div className="container">
                    {userLoading &&  <Loader />}
                    {isError && <Error status={error?.status} page={error?.message}/>}
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
                                    <h2 className="account__title">Полное имя:</h2>
                                    <p className="account__subtitle">{userData?.data.firstName} {userData?.data.lastName}</p>
                                </div>
                                <div className="account__item">
                                    <h2 className="account__title">Электронная почта:</h2>
                                    <p className="account__subtitle">{userData?.data.email}</p>
                                </div>
                                <div className="account__item">
                                    <h2 className="account__title">Присоединился:</h2>
                                    <p className="account__subtitle">{date}</p>
                                </div>
                                <div className="account__item">
                                    <h2 className="account__title">Роль:</h2>
                                    <p className="account__subtitle">{userData?.data.role}</p>
                                </div>
                            </div>
                        </div>
                    }
                    {!userLoading && !userData?.message && !userData?.data && <EmptyItems />}
                </div>
            </section>
        </Helmet>
    );
};

export default UserProfile;