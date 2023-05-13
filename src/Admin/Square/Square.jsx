import React, {useMemo, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {Link} from "react-router-dom";
import {useSquareData} from "../../CustomHooks/useSquareData";
import SquareCard from "../SquareCard/SquareCard";
import Dropdown from "../../components/Dropdown";
import "./square.scss"
import Loader from "../../components/Loader/Loader";

const Square = () => {
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState("");
    const {data: squareData, isLoading: squareDataLoading, isError, error} = useSquareData();

    const sortedAndFilteredSquare = useMemo(() => {
        let sortedProducts = [];
        let squareOptions = []

        if (squareData?.data) {
            for (const obj of squareData?.data) {
                const square = obj.square;
                squareOptions.push(square)
                setOptions(squareOptions)
            }
             if(selected === ''){
                 sortedProducts = squareData?.data
             }else{
                 sortedProducts = squareData?.data.filter(product => +product.square === +selected);
             }
        }

        return sortedProducts;
    }, [squareData?.data, selected]);

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                <div className="product">
                    <div className="table product__table">
                        <div className="table__header">
                            <h1 className="table__title">Квадраты</h1>
                            <div className="table__filter">
                                <Dropdown options={options} selected={selected} setSelected={setSelected}/>
                                <Link to="/admin/square/new">
                                    <button className="button product__add-btn">
                                        Добавить
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="table__body">
                            {squareDataLoading &&  <Loader />}
                            {isError && <div>{error?.message}</div>}
                            {
                                sortedAndFilteredSquare.length > 0 && <table className="table__main">
                                    <thead className="table__head">
                                    <tr className="table__category-list">
                                        <th className="table__category-name">Номер</th>
                                        <th className="table__category-name">Квадраты</th>
                                        <th className="table__category-name">Проекты</th>
                                        <th className="table__category-name">Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table__field">
                                    {
                                        sortedAndFilteredSquare.map((el, idx) => (
                                            <SquareCard key={el._id} el={el} idx={idx}/>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            }
                            {
                                !squareDataLoading && !isError && sortedAndFilteredSquare.length === 0 &&  <div>Нет данных</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Square;