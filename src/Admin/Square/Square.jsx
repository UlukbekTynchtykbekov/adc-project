import React, {useMemo, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {useSquareData} from "../../CustomHooks/useSquareData";
import SquareCard from "../SquareCard/SquareCard";
import Dropdown from "../../components/Dropdown";
import "./square.scss"

const Square = () => {
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState("");

    const {data: squareData, isLoading: squareDataLoading, isError: squareDataIsError, error: squareDataError} = useSquareData();

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
                            {squareDataLoading && <div>Loading....</div>}
                            {squareDataIsError && <div>{squareDataError?.message}</div>}
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
                                !squareDataLoading && sortedAndFilteredSquare.length === 0 &&  <div>Нет данных</div>
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

export default Square;