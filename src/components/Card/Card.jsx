import React from 'react';
import project1 from "../../static/img/project1.svg"
import project2 from "../../static/img/project2.svg"
import project3 from "../../static/img/project3.svg"
import project4 from "../../static/img/project4.svg"
import project5 from "../../static/img/project5.svg"
import project6 from "../../static/img/project6.svg"
import "./card.scss"

const Card = () => {
    return (
        <div className="card">
            <div className="row">
                <div className="col-4 card__column">
                    <div className="card__inner">
                        <img className="card__image" src={project1} alt=""/>
                        <div className="card__info">
                            <h3 className="card__title">Альбатрос</h3>
                            <p className="card__subtitle">Lorem ipsum dolor sit amet</p>
                            <button className="button card__btn">подробнее</button>
                        </div>
                    </div>
                </div>
                <div className="col-4 card__column">
                    <div className="card__inner">
                        <img className="card__image" src={project2} alt=""/>
                        <div className="card__info">
                            <h3 className="card__title">Любинка</h3>
                            <p className="card__subtitle">Lorem ipsum dolor sit amet</p>
                            <button className="button card__btn">подробнее</button>
                        </div>
                    </div>
                </div>
                <div className="col-4 card__column">
                    <div className="card__inner">
                        <img className="card__image" src={project3} alt=""/>
                        <div className="card__info">
                            <h3 className="card__title">Сен-Тропс</h3>
                            <p className="card__subtitle">Lorem ipsum dolor sit amet</p>
                            <button className="button card__btn">подробнее</button>
                        </div>
                    </div>
                </div>
                <div className="col-4 card__column">
                    <div className="card__inner">
                        <img className="card__image" src={project4} alt=""/>
                        <div className="card__info">
                            <h3 className="card__title">Сан-Сити</h3>
                            <p className="card__subtitle">Lorem ipsum dolor sit amet</p>
                            <button className="button card__btn">подробнее</button>
                        </div>
                    </div>
                </div>
                <div className="col-4 card__column">
                    <div className="card__inner">
                        <img className="card__image" src={project5} alt=""/>
                        <div className="card__info">
                            <h3 className="card__title">Барминко</h3>
                            <p className="card__subtitle">Lorem ipsum dolor sit amet</p>
                            <button className="button card__btn">подробнее</button>
                        </div>
                    </div>
                </div>
                <div className="col-4 card__column">
                    <div className="card__inner">
                        <img className="card__image" src={project6} alt=""/>
                        <div className="card__info">
                            <h3 className="card__title">Пушкино</h3>
                            <p className="card__subtitle">Lorem ipsum dolor sit amet</p>
                            <button className="button card__btn">подробнее</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;