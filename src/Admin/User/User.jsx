import React, {useMemo, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Avatar from "../../static/img/avatar.jpeg";
import {useUsersData} from "../../CustomHooks/useUsersData";
import UserCard from "../UserCard/UserCard";

const User = () => {
    const [searchUser, setSearchUser] = useState("");
    const {data:users, isLoading:userLoading,isError:usersIsError,error:usersError} = useUsersData()
    const filteredUsers = useMemo(()=>{
        let onlyUsers = [];
        let searchUsers= [];
        if (users?.data){
            onlyUsers = users?.data.filter(user =>{
                return user.role=== "USER"
            })
            searchUsers = onlyUsers.filter((user) =>
                user.firstName.toLowerCase().includes(searchUser.toLowerCase())
            );
        }
        return searchUsers;
    },[users?.data, searchUser])
    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div className="product">
                    <div className="table product__table">
                        <div className="table__header">
                            <h1 className="table__title">Пользователи</h1>
                            <div className="table__filter">
                                <Search searchItem={searchUser} setSearchItem={setSearchUser}/>
                                <Link to="/admin/categories/new">
                                    <button className="button product__add-btn">
                                        Добавить
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="table__body">
                            {userLoading && <div>loading...</div>}
                            {usersIsError && <div>{usersError?.message}</div>}
                            {filteredUsers.length > 0 &&  <table className="table__main">
                                <thead className="table__head">
                                <tr className="table__category-list">
                                    <th className="table__category-name">Номер</th>
                                    <th className="table__category-name">Имя</th>
                                    <th className="table__category-name">Фамилия</th>
                                    <th className="table__category-name">Почта</th>
                                </tr>
                                </thead>
                                <tbody className="table__field">
                                {filteredUsers.map((user , index)=>(
                                        <UserCard key={user._id} user={user} index={index}/>
                                    )
                                )}
                                </tbody>
                            </table>}
                            {!userLoading && filteredUsers.length === 0 && <div>нет данных</div>}
                        </div>
                    </div>
                </div>
            </div>
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
        </section>
    );
};

export default User;