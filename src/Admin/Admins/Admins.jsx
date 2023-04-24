import React, {useMemo, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import {Link} from "react-router-dom";
import Avatar from "../../static/img/avatar.jpeg";
import {ToastContainer} from "react-toastify";
import {useUsersData} from "../../CustomHooks/useUsersData";
import AdminsCard from "../AdminsCard/AdminsCard";

const Admins = () => {
    const [searchAdmins, setSearchAdmins] = useState("");
    const {data:admins, isLoading:adminsLoading,isError:adminsIsError,error:adminsError} = useUsersData()
    const filteredUsers = useMemo(()=>{
        let onlyAdmins = [];
        let searchAdmin= [];
        if (admins?.data){
            onlyAdmins = admins?.data.filter(user =>{
                return user.role=== "ADMIN"
            })
            searchAdmin = onlyAdmins.filter((user) =>
                user.firstName.toLowerCase().includes(searchAdmins.toLowerCase())
            );
        }
        return searchAdmin;
    },[admins?.data, searchAdmins])
    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div className="product">
                    <div className="table product__table">
                        <div className="table__header">
                            <h1 className="table__title">Администраторы</h1>
                            <div className="table__filter">
                                <Search searchItem={searchAdmins} setSearchItem={setSearchAdmins}/>
                                <Link to="/admin/categories/new">
                                    <button className="button product__add-btn">
                                        Добавить
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="table__body">
                            {adminsLoading && <div>loading...</div>}
                            {adminsIsError && <div>{adminsError?.message}</div>}
                            {filteredUsers.length > 0 && <table className="table__main">
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
                                        <AdminsCard key={user._id} user={user} index={index}/>
                                    )
                                )}
                                </tbody>
                            </table>}
                            {!adminsLoading && filteredUsers.length === 0 && <div>нет данных</div>}
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

export default Admins;