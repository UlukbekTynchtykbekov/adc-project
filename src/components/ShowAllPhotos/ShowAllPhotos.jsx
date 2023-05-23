import React from 'react';
import Helmet from "../../layout/Helmet";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation"
import {EffectCoverflow, Pagination, Navigation} from "swiper";
import "./showAllPhotos.scss"

const ShowAllPhotos = ({el, setShowAllPhotos, selected}) => {

    return (
        <Helmet title="Show-All-Photos">
            <section className="showPhotos">
                <div className="container">
                    <div className="showPhotos__header">
                        <h2 className="showPhotos__title">Images of *{el?.name}*</h2>
                        <div onClick={() => setShowAllPhotos(false)} className="close">
                            <button className="close__btn">
                                    <span className="close__icon">
                                        <ion-icon name="close-outline"></ion-icon>
                                    </span>
                                <span className="close__title">
                                    Закрыть
                                </span>
                            </button>
                        </div>
                    </div>
                    <Swiper
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2,
                        }}
                        pagination={{el: ".swiper-pagination", clickable: true}}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                            clickable: true
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        className="swiper_container"
                    >
                        {
                            selected === "экстерьер" ?
                                el?.exterior?.length > 0 && el?.exterior.map((photo, idx) => (
                                    <SwiperSlide key={idx}>
                                        <img className="showPhotos__img"
                                             src={photo.url}
                                             alt=""/>
                                    </SwiperSlide>
                                )) : el?.interior?.length > 0 && el?.interior.map((photo, idx) => (
                                <SwiperSlide key={idx}>
                                    <img className="showPhotos__img"
                                         src={photo.url}
                                         alt=""/>
                                </SwiperSlide>
                            ))
                        }
                        <div className="slider-controller">
                            <div className="swiper-button-prev slider-arrow">
                                <ion-icon name="arrow-back-outline"></ion-icon>
                            </div>
                            <div className="swiper-button-next slider-arrow">
                                <ion-icon name="arrow-forward-outline"></ion-icon>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </Swiper>
                </div>
            </section>
        </Helmet>
    );
};

export default ShowAllPhotos;