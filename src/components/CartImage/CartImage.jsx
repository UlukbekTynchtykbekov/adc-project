import React from 'react';

const CartImage = ({image}) => {
    return (
        <img className="card__image" src={`https://adc-mern-stack.herokuapp.com/${image[2].path}`} alt=""/>
    );
};

export default CartImage;