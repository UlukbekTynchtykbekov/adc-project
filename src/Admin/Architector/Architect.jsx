import React, {useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import ArchitectCard from "../ArchitectCard/ArchitectCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import Dropdown from "../../components/Dropdown";
import {useArchitectData} from "../../CustomHooks/useArchitectData";
import './architect.scss'

const Architect = () => {
    const options = ["все", "сначала старше", "сначала моложе"]
    const [searchItem, setSearchItem] = useState("");
    const [selected, setSelected] = useState("все");

    const { data: architectData, isLoading: architectDataLoading} = useArchitectData();

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

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div className="product">
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
                            {architectDataLoading && <div>Loading....</div>}
                            {architectData?.message && <div>{architectData?.message}</div>}
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
                                !architectDataLoading && !architectData?.message && sortedAndFilteredPeople.length === 0 &&  <div>Нет данных</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Architect;