import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import {useAddSquare, useSingleSquareData, useUpdateSquare} from "../../CustomHooks/useSquareData";

const NewSquare = () => {

    const [square, setSquare] = useState(0);
    const [squareError, setSquareError] = useState("");
    const {id: squareId} = useParams();

    const {mutate: addSquare, data: addedSquareData, isLoading: addSquareLoading} = useAddSquare();
    const {data: squaresData, isLoading: squaresLoading, isError: squaresIsError, error: squaresError} = useSingleSquareData(squareId);
    const {mutate: updateSquare, data:updatedSquareData, isLoading: updateLoading} = useUpdateSquare()
    const onSubmitProduct = (e) => {
        e.preventDefault();
        if (square < 10){
            setSquareError("Количество квадратов должно быть больше 10м2")
        }

        const newSquare = {
            square
        }

        if (squareId){
            updateSquare({squareId, ...newSquare})
        }else{
            addSquare(newSquare)
        }
    }

    useEffect(() => {
        if (squaresData?.data){
            setSquare(squaresData?.data.square);
        }
    }, [squaresData?.data])

    if(addedSquareData?.data || updatedSquareData?.data){
        return <Navigate to="/admin/square"/>
    }

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                {
                    squaresLoading &&  <div style={{color: "white"}}>Loading...</div>
                }

                {
                    squaresIsError &&  <div style={{color: "white"}}>{squaresError?.message}</div>
                }
                <div className="new">
                    <div className="new__wrapper">
                        <h2 className="new__text">Добавить квадрат</h2>
                    </div>
                    <form className="formik" onSubmit={onSubmitProduct}>
                        <div className="formik__group">
                            <h2 className="formik__text">Квадрат</h2>
                            <input
                                className="formik__input"
                                type="number"
                                value={square}
                                placeholder="Количество квадратов"
                                onChange={(e) => setSquare(e.target.value)}
                            />
                            {
                                squareError && <p className="formik__error">*{squareError}</p>
                            }
                        </div>
                        <button className={ addSquareLoading || updateLoading ? "button formik__button-disabled" : "button formik__button"} type="submit" disabled={addSquareLoading || updateLoading}>добавить</button>
                        {
                            addSquareLoading || updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                        }
                        {
                            addedSquareData?.response.data || updatedSquareData?.response.data ? <div>
                                <p className="formik__error">Квадрат проекта уже существует или вы должны правильно заполнить все данные</p>
                            </div> : null
                        }
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewSquare;