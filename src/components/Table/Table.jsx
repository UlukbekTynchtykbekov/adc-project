import React, {useMemo, useState} from 'react';
import TableCard from "./TableCard";
import {useFavoriteProjects} from "../../CustomHooks/useProjectFavorite";
import Dropdown from "../Dropdown/Dropdown";
import Search from "../Search/Search";
import {useFavoriteData} from "../../CustomHooks/useFavoriteData";
import Loader from "../Loader/Loader";
import Error from "../ErrorComponent/Error";
import EmptyItems from "../EmtyItems/EmptyItems";
import './table.scss'

const Table = () => {
    const options = ["дизайн", "архитектура"]
    const [searchItem, setSearchItem] = useState("");
    const [selected, setSelected] = useState("");
    const {data: favoriteData} = useFavoriteData();
    const favoriteId = favoriteData?.data._id;
    const {data: favoriteProjectsData, isLoading, isError, error} = useFavoriteProjects(favoriteId);

    const sortedAndFilteredProducts = useMemo(() => {
        let filteredProducts = [];
        let sortedProducts = [];

        if (favoriteProjectsData?.data) {
            filteredProducts = favoriteProjectsData?.data.filter((product) =>
                product.project.name.toLowerCase().includes(searchItem.toLowerCase())
            );

            if (selected === "архитектура"){
                sortedProducts = filteredProducts.filter(product => product.project.category.name === "architecture");
            }else if (selected === "дизайн"){
                sortedProducts = filteredProducts.filter(product => product.project.category.name === "design")
            }else {
                sortedProducts = filteredProducts
            }
        }

        return sortedProducts;
    }, [favoriteProjectsData?.data, searchItem, selected]);

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
                {isLoading && <Loader />}
                {isError && <Error status={error?.status} page={error?.message} />}
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
                    {
                        sortedAndFilteredProducts.length > 0 && <tbody className="table__field">
                        {
                            sortedAndFilteredProducts.map((el, idx) => (
                                <TableCard key={el._id} el={el} idx={idx} favoriteId={favoriteId}/>
                            ))
                        }
                        </tbody>
                    }
                </table>
                {
                    !isLoading && !isError && sortedAndFilteredProducts.length === 0 &&  <EmptyItems />
                }
            </div>
        </div>
    );
};

export default Table;