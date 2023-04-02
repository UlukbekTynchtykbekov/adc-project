import React from 'react';
import SearchIcon from  "../../static/img/search-line.svg"
import "./search.scss"

const Search = ({ searchItem, setSearchItem }) => {
    return (
        <div className="search">
            <input value={searchItem} onChange={(e) => setSearchItem(e.target.value)} className="search__input" type="text"/>
            <button className="search__button">
                <img className="search__icon" src={SearchIcon} alt=""/>
            </button>
        </div>
    );
};

export default Search;