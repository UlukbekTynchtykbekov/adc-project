import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Search/Search";
import {useCategoriesData} from "../../CustomHooks/useCategoriesData";
import CategoryCard from "../CatgeoryCard/CategoryCard";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";
import "./categories.scss"
import {useSelector} from "react-redux";

const Categories = () => {
    const [searchItem, setSearchItem] = useState("");
    const [alreadyHave, setAlreadyHave] = useState(false);

    const {openSidebar} = useSelector(state => state.sidebar);
    const elementRefs = useRef(null);

    const {data: categoriesData, isLoading: categoriesDataLoading, isError, error} = useCategoriesData();

    const sortedAndFilteredProducts = useMemo(() => {
        let filteredProducts = [];

        if (categoriesData?.data) {
            filteredProducts = categoriesData?.data.filter((category) =>
                category.name.toLowerCase().includes(searchItem.toLowerCase())
            );
        }

        const designExists = categoriesData?.data.some(obj => obj.name === "design");
        const architectureExists = categoriesData?.data.some(obj => obj.name === "architecture");

        if (designExists && architectureExists) {
            setAlreadyHave(true)
        } else {
            setAlreadyHave(false)
        }

        return filteredProducts;
    }, [categoriesData?.data, searchItem]);

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
                            <h1 className="table__title">Категории</h1>
                            <div className="table__filter">
                                <Search searchItem={searchItem} setSearchItem={setSearchItem}/>
                                <Link to="/admin/categories/new">
                                   <button className={alreadyHave ? "button product__non-add" : "button product__add-btn"} disabled={alreadyHave}>
                                       Добавить
                                   </button>
                                </Link>
                            </div>
                        </div>
                        <div className="table__body">
                            {categoriesDataLoading &&  <Loader />}
                            {isError && <Error status={error?.status} page={error?.message}/>}
                            {
                                sortedAndFilteredProducts.length > 0 && <table className="table__main">
                                    <thead className="table__head">
                                    <tr className="table__category-list">
                                        <th className="table__category-name">Номер</th>
                                        <th className="table__category-name">Категория</th>
                                        <th className="table__category-name">Проекты</th>
                                        <th className="table__category-name">Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table__field">
                                    {
                                        sortedAndFilteredProducts.map((el, idx) => (
                                            <CategoryCard key={el._id} el={el} idx={idx} alreadyHave={alreadyHave}/>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            }
                            {
                                !categoriesDataLoading && !isError && sortedAndFilteredProducts.length === 0 && <EmptyItems />
                            }
                        </div>
                        {
                            alreadyHave && <div className="product__already-have">
                                <p className="product__error">*Вы не можете добавить и отредактировать
                                    другую категорию, потому что <br/> ваши проекты относятся только к этим двум категориям</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;