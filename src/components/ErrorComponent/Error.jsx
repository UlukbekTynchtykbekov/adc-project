import React from 'react';
import "./error.scss"

const Error = () => {
    return (
        <div className="fail">
            <div className="fail__container">
                <h1 className="fail__status">
                    <span className="fail__number" id="digit1">4</span>
                    <span className="fail__number" id="digit2">0</span>
                    <span className="fail__number" id="digit3">4</span>
                </h1>
                <h3 className="fail__text">PAGE NOT FOUND</h3>
                <button className="fail__button" name="button">Return To Home</button>
            </div>
        </div>
    );
};

export default Error;