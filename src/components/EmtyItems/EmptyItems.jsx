import React from 'react';
import "./empty-items.scss"

const EmptyItems = ({changeColor}) => {
    return (
        <div className="empty">
            <div className="empty__wrapper">
                <span className={changeColor ? "empty__circle color" : "empty__circle"}>
                    <ion-icon name="alert-circle-outline"></ion-icon>
                </span>
                <h3 className={changeColor ? "empty__text color" : "empty__text"}>Нет данных</h3>
            </div>
        </div>
    );
};

export default EmptyItems;