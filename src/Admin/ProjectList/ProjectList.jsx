import React, {useMemo, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import Dropdown from "../../components/Dropdown";
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import ProductCard from "../ProjectListCard/ProductCard";
import './project-list.scss'

const ProjectList = () => {
    const options = ["все", "дизайн", "архитектура"]
    const [searchItem, setSearchItem] = useState("");
    const [selected, setSelected] = useState("");

    const {data: productData, isLoading: productDataLoading, isError: productDataIsError, error: productDataError} = useProjectsData();

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
                            {productDataLoading && <div>Loading....</div>}
                            {productDataIsError && <div>{productDataError?.message}</div>}
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
                                !productDataLoading && sortedAndFilteredProducts.length === 0 &&  <div>Нет данных</div>
                            }
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

export default ProjectList;