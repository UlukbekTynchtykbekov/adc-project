import React from 'react';
import "./shortDesc.scss"

const ShortDesc = ({house}) => {
    return (
        <div className="wrapper">
            <h4 className="wrapper__title">
                {house.shortTitle}
            </h4>
            <p className="wrapper__subtitle">
                {house.shortDesc}
            </p>
        </div>
    );
};

export default ShortDesc;