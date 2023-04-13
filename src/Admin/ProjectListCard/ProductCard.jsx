import React from 'react';

const ProductCard = ({el}) => {
    return (
        <tr className="table__list">
            <td className="table__item">1</td>
            <td className="table__item">
                <img src={el.exterior[0].url} className="table__img"
                     alt="tableImage"/>
                {el.name}
            </td>
            <td className="table__item">{el.room.quantity} комната </td>
            <td className="table__item">
                <button className="table__button product__table-btn">
                                            <span className="table__img product__table-img">
                                                <ion-icon name="create-outline"></ion-icon>
                                            </span>
                    редактировать
                </button>
                <button className="table__button product__table-btn">
                                           <span className="table__img product__table-img">
                                                <ion-icon name="trash-outline"></ion-icon>
                                            </span>
                    удалить
                </button>
            </td>
        </tr>
    );
};

export default ProductCard;