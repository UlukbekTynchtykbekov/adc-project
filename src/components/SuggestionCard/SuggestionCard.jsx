import React from 'react';
import SuggestionCardItems from "./SuggestionCardItems";
import "./suggestion.scss"

const SuggestionCard = ({data, isLoading, isError, error}) => {
    console.log(data)

    if (isLoading) {
        return <div style={{color: "white"}}>Loading...</div>;
    }

    if (isError) {
        return <div style={{color: "white"}}>Error</div>;
    }

    if (data.length === 0){
        return <div style={{color: "white"}}>No project</div>;
    }

    return (
        <div className="bottom">
            <h5 className="bottom__mainTitle">МЫ ПРЕДЛАГАЕМ</h5>
            <div className="bottom__row">
                {
                    data.map((item, index) => (
                        <SuggestionCardItems key={item._id} item={item} index={index}/>
                    ))
                }
            </div>
        </div>
    );
};

export default SuggestionCard;