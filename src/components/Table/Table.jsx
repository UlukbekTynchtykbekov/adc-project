import React, {useState} from 'react';
import TableCard from "./TableCard";
import {useFavoriteProjects} from "../../CustomHooks/useProjectFavorite";
import './table.scss'
import Dropdown from "../Dropdown/Dropdown";
import Search from "../Search/Search";

const Table = () => {

    const options = ["дизайн", "архитектура"]
    const [searchItem, setSearchItem] = useState("")
    const [selected, setSelected] = useState("")
    const {data: favoriteProjectsData, isLoading, isError} = useFavoriteProjects();

    if (isLoading) {
        return <div style={{color: "white"}}>Loading...</div>;
    }

    if (isError) {
        return <div style={{color: "white"}}>Error</div>;
    }

    if (!favoriteProjectsData) {
        return <div style={{color: "white"}}>No project</div>;
    }

    const favoriteData = favoriteProjectsData?.data.filter(el => {
        if (selected === "дизайн") {
            return el?.project.category.name === "design" && el?.project.name.toLowerCase().includes(searchItem.toLowerCase().trim())
        } else if (selected === "архитектура") {
            return el?.project.category.name === "architecture" && el?.project.name.toLowerCase().includes(searchItem.toLowerCase().trim())
        } else {
            return el?.project.name.toLowerCase().includes(searchItem.toLowerCase().trim())
        }
    })

    return (
        <div className="table">
            <div className="table__header">
                <h1 className="table__title">Любимые проекты</h1>
                <div className="table__filter">
                    <Search searchItem={searchItem} setSearchItem={setSearchItem}/>
                    <Dropdown options={options} selected={selected} setSelected={setSelected}/>
                </div>
            </div>
            <div className="table__body">
                <table className="table__main">
                    <thead className="table__head">
                    <tr className="table__category-list">
                        <th className="table__category-name">Номер</th>
                        <th className="table__category-name">Изображение</th>
                        <th className="table__category-name">Комната</th>
                        <th className="table__category-name">Площадь</th>
                        <th className="table__category-name">Действие</th>
                    </tr>
                    </thead>
                    <tbody className="table__field">
                    {
                        favoriteData.map((el, idx) => (
                            <TableCard key={el._id} el={el} idx={idx}/>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;