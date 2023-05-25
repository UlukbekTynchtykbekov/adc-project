import React, {useEffect, useMemo, useRef, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import Dropdown from "../../components/Dropdown";
import {Link} from "react-router-dom";
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import ProductCard from "../ProjectListCard/ProductCard";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";
import {useSelector} from "react-redux";
import './project-list.scss'

const ProjectList = () => {
    const options = ["все", "дизайн", "архитектура"]
    const [searchItem, setSearchItem] = useState("");
    const [selected, setSelected] = useState("");
    const {openSidebar} = useSelector(state => state.sidebar);
    const elementRefs = useRef(null);

    const {data: productData, isLoading: productDataLoading, isError, error} = useProjectsData();

    const sortedAndFilteredProducts = useMemo(() => {
        let filteredProducts = [];
        let sortedProducts = [];

        if (productData?.data) {
            filteredProducts = productData?.data.filter((product) =>
                product.name.toLowerCase().includes(searchItem.toLowerCase())
            );

            if (selected === "архитектура"){
                sortedProducts = filteredProducts.filter(product => product.category.name === "architecture");
            }else if (selected === "дизайн"){
                sortedProducts = filteredProducts.filter(product => product.category.name === "design")
            }else {
                sortedProducts = filteredProducts
            }
        }

        return sortedProducts;
    }, [productData?.data, searchItem, selected]);

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
                            {productDataLoading &&  <Loader />}
                            {isError && <Error status={error?.status} page={error?.message}/>}
                            {
                                sortedAndFilteredProducts.length > 0 && <table className="table__main">
                                    <thead className="table__head">
                                    <tr className="table__category-list">
                                        <th className="table__category-name">Номер</th>
                                        <th className="table__category-name">Изображение</th>
                                        <th className="table__category-name">Комната</th>
                                        <th className="table__category-name">Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table__field">
                                    {
                                        sortedAndFilteredProducts.map((el, idx) => (
                                            <ProductCard key={el._id} el={el} idx={idx}/>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            }
                            {
                                !productDataLoading && !isError && sortedAndFilteredProducts.length === 0 && <EmptyItems />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectList;