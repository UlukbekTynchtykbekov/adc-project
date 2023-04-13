import React, {useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import Dropdown from "../../components/Dropdown";
import ProductList from "../ProjectListCard/ProductList";
import './project-list.scss'
import {Link} from "react-router-dom";

const ProjectList = () => {
    const options = ["дизайн", "архитектура"]
    const [searchItem, setSearchItem] = useState("");
    const [selected, setSelected] = useState("");

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div className="product">
                    <div className="table product__table">
                        <div className="table__header">
                            <h1 className="table__title">Проекты</h1>
                            <div className="table__filter">
                                <Search searchItem={searchItem} setSearchItem={setSearchItem}/>
                                <Dropdown options={options} selected={selected} setSelected={setSelected}/>
                                <Link to="/admin/projects/new" className="button product__add-btn">
                                    Добавить
                                </Link>
                            </div>
                        </div>
                        <div className="table__body">
                            <table className="table__main">
                                <thead className="table__head">
                                <tr className="table__category-list">
                                    <th className="table__category-name">Номер</th>
                                    <th className="table__category-name">Изображение</th>
                                    <th className="table__category-name">Комната</th>
                                    <th className="table__category-name">Действия</th>
                                </tr>
                                </thead>
                                <tbody className="table__field">
                                <ProductList selected={selected} searchItem={searchItem} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectList;