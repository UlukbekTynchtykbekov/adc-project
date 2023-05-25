import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import ArchitectCard from "../ArchitectCard/ArchitectCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import Dropdown from "../../components/Dropdown";
import {useArchitectData} from "../../CustomHooks/useArchitectData";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";
import {useSelector} from "react-redux";
import './architect.scss'

const Architect = () => {
    const options = ["все", "сначала старше", "сначала моложе"]
    const [searchItem, setSearchItem] = useState("");
    const [selected, setSelected] = useState("все");
    const {openSidebar} = useSelector(state => state.sidebar);
    const elementRefs = useRef(null);

    const { data: architectData, isLoading: architectDataLoading, isError, error} = useArchitectData();

    const compareDates = (person1, person2) => {
        const date1 = new Date(person1.dateOfBirth);
        const date2 = new Date(person2.dateOfBirth);
        return date1.getTime() - date2.getTime();
    };

    const sortedAndFilteredPeople = useMemo(() => {
        let filteredPeople = [];
        let sortedPeople = [];

        if (architectData?.data) {
            filteredPeople = architectData?.data.filter((person) =>
                person.firstname.toLowerCase().includes(searchItem.toLowerCase())
            );

            sortedPeople = selected === "сначала старше"
                ? filteredPeople.sort(compareDates)
                : filteredPeople.sort((person1, person2) => compareDates(person2, person1));
        }

        return sortedPeople;
    }, [architectData?.data, searchItem, selected]);

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
                            <h1 className="table__title">Архитекторы и дизайнеры</h1>
                            <div className="table__filter">
                                <Search searchItem={searchItem} setSearchItem={setSearchItem}/>
                                <Dropdown options={options}
                                          selected={selected}
                                          setSelected={setSelected} />
                                <Link to="/admin/architect/new" className="button product__add-btn">
                                    Добавить
                                </Link>
                            </div>
                        </div>
                        <div className="table__body">
                            {architectDataLoading && <Loader />}
                            {isError && <Error status={error?.status} page={error?.message}/>}
                            {
                                sortedAndFilteredPeople.length > 0  && <table className="table__main">
                                    <thead className="table__head">
                                    <tr className="table__category-list">
                                        <th className="table__category-name">Номер</th>
                                        <th className="table__category-name">Изображение</th>
                                        <th className="table__category-name">Дата рождения</th>
                                        <th className="table__category-name">Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table__field">
                                    {
                                        sortedAndFilteredPeople.map((el, idx) => (
                                            <ArchitectCard key={el._id} el={el} idx={idx}/>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            }
                            {
                                !architectDataLoading && !isError && sortedAndFilteredPeople.length === 0 && <EmptyItems />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Architect;