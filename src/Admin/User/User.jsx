import React, {useEffect, useMemo, useRef, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import {useUsersData} from "../../CustomHooks/useUsersData";
import UserCard from "../UserCard/UserCard";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";
import {useSelector} from "react-redux";

const User = () => {
    const [searchUser, setSearchUser] = useState("");
    const {openSidebar} = useSelector(state => state.sidebar);
    const elementRefs = useRef(null);

    const {data: users, isLoading: userLoading, isError, error} = useUsersData()
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
    },[users?.data, searchUser]);

    useEffect(() => {
        if (elementRefs.current) {
            elementRefs.current.classList.toggle('close', openSidebar);
        }
    }, [openSidebar]);

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div ref={elementRefs} className="product">
                    <div className="table product__table">
                        <div className="table__header">
                            <h1 className="table__title">Пользователи</h1>
                            <div className="table__filter">
                                <Search searchItem={searchUser} setSearchItem={setSearchUser}/>
                            </div>
                        </div>
                        <div className="table__body">
                            {userLoading &&  <Loader />}
                            {isError && <Error status={error?.status} page={error?.message}/>}
                            {filteredUsers.length > 0 &&  <table className="table__main">
                                <thead className="table__head">
                                <tr className="table__category-list">
                                    <th className="table__category-name">Номер</th>
                                    <th className="table__category-name">Имя</th>
                                    <th className="table__category-name">Фамилия</th>
                                    <th className="table__category-name">Почта</th>
                                    <th className="table__category-name">Подробность</th>
                                </tr>
                                </thead>
                                <tbody className="table__field">
                                {filteredUsers.map((user , index)=>(
                                        <UserCard key={user._id} user={user} index={index}/>
                                    )
                                )}
                                </tbody>
                            </table>}
                            {!userLoading && !isError && filteredUsers.length === 0 && <EmptyItems />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default User;