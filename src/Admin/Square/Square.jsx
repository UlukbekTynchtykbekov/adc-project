import React, {useEffect, useMemo, useRef, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {Link} from "react-router-dom";
import {useSquareData} from "../../CustomHooks/useSquareData";
import SquareCard from "../SquareCard/SquareCard";
import Dropdown from "../../components/Dropdown";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";
import "./square.scss"
import {useSelector} from "react-redux";

const Square = () => {
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState("");
    const {data: squareData, isLoading: squareDataLoading, isError, error} = useSquareData();

    const {openSidebar} = useSelector(state => state.sidebar);
    const elementRefs = useRef(null);

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
                            {isError && <Error status={error?.status} page={error?.message}/>}
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
                                !squareDataLoading && !isError && sortedAndFilteredSquare.length === 0 &&  <EmptyItems />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Square;