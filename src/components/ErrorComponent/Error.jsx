import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./error.scss"

const Error = ({status, page, changeColor}) => {

    const [firstNumber, setFirstNumber] = useState('4');
    const [secondNumber, setSecondNumber] = useState('0');
    const [thirdNumber, setThirdNumber] = useState('4');

    useEffect(() => {
        if (status){
            let statusFirstNumber = status.toString().charAt(0);
            setFirstNumber(statusFirstNumber);

            let statusSecondNumber = status.toString().charAt(1);
            setSecondNumber(statusSecondNumber);

            let statusThirdNumber = status.toString().charAt(2);
            setThirdNumber(statusThirdNumber);
        }
    },[])

    return (
        <div className={changeColor ? "fail color" : "fail"}>
            <div className="fail__container">
                <h1 className={changeColor ? "fail__status color" : "fail__status"}>
                    <span className="fail__number" id="digit1">{firstNumber}</span>
                    <span className="fail__number" id="digit2">{secondNumber}</span>
                    <span className="fail__number" id="digit3">{thirdNumber}</span>
                </h1>
                <h3 className="fail__text">{page}</h3>
                <Link to="/">
                    <button className={changeColor ? "fail__button color" : "fail__button"} name="button">Return To Home</button>
                </Link>
            </div>
        </div>
    );
};

export default Error;