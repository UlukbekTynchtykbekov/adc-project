import React, {useEffect, useMemo, useRef, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import {useUsersData} from "../../CustomHooks/useUsersData";
import AdminsCard from "../AdminsCard/AdminsCard";
import Loader from "../../components/Loader/Loader";
import {useSelector} from "react-redux";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";

const Admins = () => {
    const [searchAdmins, setSearchAdmins] = useState("");
    const {data: admins, isLoading: adminsLoading, isError, error} = useUsersData();
    const {data: authMe} = useSelector(state => state.auth);


    const {openSidebar} = useSelector(state => state.sidebar);
    const elementRefs = useRef(null);

    const filteredUsers = useMemo(() => {
        let onlyAdmins = [];
        let searchAdmin = [];
        let sortedAdmin = [];
        if (admins?.data) {
            onlyAdmins = admins?.data.filter(user => {
                return user.role === "ADMIN"
            })
            sortedAdmin = onlyAdmins.sort((a, b) => {
                if (a.firstName === authMe.firstName) {
                    return -1;
                } else if (b.firstName === authMe.firstName) {
                    return 1;
                } else {
                    return 0;
                }
            });
            searchAdmin = sortedAdmin.filter((user) =>
                user.firstName.toLowerCase().includes(searchAdmins.toLowerCase())
            );
        }
        return searchAdmin;
    }, [admins?.data, searchAdmins, authMe.firstName])

      useEffect(() => {
        if (elementRefs.current) {
            elementRefs.current.classList.toggle('close', openSidebar);
        }
    }, [openSidebar])
    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div ref={elementRefs} className="product">
                    <div className="table product__table">
                        <div className="table__header">
                            <h1 className="table__title">Администраторы</h1>
                            <div className="table__filter">
                                <Search searchItem={searchAdmins} setSearchItem={setSearchAdmins}/>
                            </div>
                        </div>
                        <div className="table__body">
                            {adminsLoading && <Loader />}
                            {isError && <Error status={error?.status} page={error?.message}/>}
                            {filteredUsers.length > 0 && <table className="table__main">
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
                                {filteredUsers.map((user, index) => (
                                        <AdminsCard key={user._id} user={user} index={index}/>
                                    )
                                )}
                                </tbody>
                            </table>
                            }
                            {!adminsLoading && !isError && filteredUsers.length === 0 && <EmptyItems />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Admins;