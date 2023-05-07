import React from 'react';
import "./suggestion.scss"

const SuggestionCardItems = ({item, index}) => {
    return (
        <div className="bottom__column">
            <div className="bottom__card">
                <h1 className="bottom__number">{index+1}</h1>
                <div className="bottom__info">
                    <h4 className="bottom__title">{item.title}</h4>
                    <p className="bottom__subtitle">{item.desc}</p>
                </div>
            </div>
        </div>
    );
};

export default SuggestionCardItems;