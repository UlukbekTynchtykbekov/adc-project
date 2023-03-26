import React from 'react';
import Helmet from "../../layout/Helmet";
import CloseX from '../../static/img/close-line.svg'
import "./showAllPhotos.scss"

const ShowAllPhotos = ({el, setShowAllPhotos}) => {

    console.log(el)

    return (
        <Helmet title="Show-All-Photos">
            <section className="showPhotos">
                <div className="showPhotos__wrapper">
                    <h2 className="showPhotos__title">Photos of {el?.name}</h2>
                    <div onClick={() => setShowAllPhotos(false)} className="close">
                        <button className="close__btn">
                            <img className="close__img" src={CloseX} alt=""/>
                            <span className="close__title">
                                    Закрыть фотографии
                                </span>
                        </button>
                    </div>
                    {
                        el?.exterior?.length > 0 && el?.exterior.map(photo => (
                            <div className="showPhotos__photo">
                                <img className="showPhotos__img" src={`https://adc-mern-stack.herokuapp.com/${photo.path}`}
                                     alt=""/>
                            </div>
                        ))
                    }
                </div>
            </section>
        </Helmet>
    );
};

export default ShowAllPhotos;