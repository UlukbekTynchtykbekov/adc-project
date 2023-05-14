import React from 'react';
import  "./loader.scss"
const Loader = ({changeColor}) => {

    return (
        <div className="loader">
            <span className={changeColor ? "loader__spinner color" : "loader__spinner"}></span>
        </div>
    );
};

export default Loader;