import React from 'react';
import Helmet from "../../layout/Helmet";
import CloseX from '../../static/img/close-line.svg'
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation"
import "./showAllPhotos.scss"
import {EffectCoverflow, Pagination, Navigation} from "swiper";
import slide_img1 from "../../static/img/construction1.png";
import slide_img2 from "../../static/img/construction2.png";
import slide_img3 from "../../static/img/construction3.png";
import slide_img4 from "../../static/img/construction4.png";

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
                            <SwiperSlide><img src={slide_img1} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={slide_img2} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={slide_img3} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={slide_img2} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={slide_img4} alt=""/></SwiperSlide>
                            <SwiperSlide><img src={slide_img1} alt=""/></SwiperSlide>
                            {/*{*/}
                            {/*    selected === "экстерьер" ?*/}
                            {/*        el?.exterior?.length > 0 && el?.exterior.map(photo => (*/}
                            {/*            <SwiperSlide>*/}
                            {/*                <div className="showPhotos__photo">*/}
                            {/*                    <img className="showPhotos__img"*/}
                            {/*                         src={`https://adc-mern-stack.herokuapp.com/${photo.path}`}*/}
                            {/*                         alt=""/>*/}
                            {/*                </div>*/}
                            {/*            </SwiperSlide>*/}
                            {/*        )) : el?.interior?.length > 0 && el?.interior.map(photo => (*/}
                            {/*        <SwiperSlide>*/}
                            {/*            <div className="showPhotos__photo">*/}
                            {/*                <img className="showPhotos__img"*/}
                            {/*                     src={`https://adc-mern-stack.herokuapp.com/${photo.path}`}*/}
                            {/*                     alt=""/>*/}
                            {/*            </div>*/}
                            {/*        </SwiperSlide>*/}
                            {/*    ))*/}
                            {/*}*/}
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