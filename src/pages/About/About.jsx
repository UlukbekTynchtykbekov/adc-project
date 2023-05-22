import React from 'react';
import Helmet from "../../layout/Helmet";
import useParallax from "../../CustomHooks/useParallaxHook";
import Partner from "../../static/img/partners.png"
import Img1 from "../../static/img/image 51.png"
import Img2 from "../../static/img/image 52.png"
import Img3 from "../../static/img/image 53.png"
import Img4 from "../../static/img/image 54.png"
import ArrowIcon from "../../Ui/ArrowIcon/ArrowIcon";
import handleScroll from "aos/src/js/helpers/handleScroll";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Keyboard, Pagination, Navigation} from "swiper";
import "../../styles/about.scss"

const About = () => {
    const {isVisible} = useParallax()
    const [swiper, setSwiper] = React.useState(null);

    const house = {
        title: "РЕАЛИЗАТОРЫ  ВАШИХ \n" +
            "ЖЕЛАНИЙ  ОТ  НАЧАЛО  \n" +
            "ДО КОНЦА",
        subtitle: "ARCHITECTURE + DESIGN + CONSTRUCTION",
        shortDesc: "Можно сколько угодно рассказывать про дизайн, но лучше посмотреть на что мы способны. Каждая работа выполняется индивидуально, поэтому посмотрев наши работы. Вы можете созвониться с нами, для того чтобы обсудить свой уникальный заказ\n"
    };

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (swiper) {
                if (event.key === 'ArrowLeft') {
                    swiper.slidePrev(2);
                } else if (event.key === 'ArrowRight') {
                    swiper.slideNext(2);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [swiper]);
    return (
        <Helmet title="About">
            <section className="about">
                <div className="container">
                    <div className="common__wrapper about__wrapper">
                        <div className="common__inner">
                            <h2 className="common__title about__title">{house.title}</h2>
                            <p className="common__subtitle about__subtitle">{house.subtitle}</p>
                        </div>
                    </div>
                    {
                        handleScroll ? <ArrowIcon isVisible={isVisible} handleScroll={handleScroll}/>
                            : null
                    }
                </div>
            </section>
            <section className="short-desc about-desc">
                <div className="container">
                    <div className="partner-wrapper">
                        <img className="partner-wrapper__image" src={Partner} alt=""/>
                        <p className="partner-wrapper__subtitle">
                            {house.shortDesc}
                        </p>
                    </div>
                </div>
            </section>
            <section className="about-slider">
                <div className="about-slider__slide">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={0}
                        slidesPerGroup={2}
                        onSwiper={setSwiper}
                        keyboard={{
                            enabled: true,
                        }}
                        pagination={{
                            enabled: true,
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Keyboard, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src={Img1} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Img2} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Img3} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Img4} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Img1} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Img2} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Img3} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Img4} alt=""/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Img1} alt=""/>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
            <section className="all-des">
                <div className="container">
                    <h4 className="all-des__title">Мы создатели удобства <br/> красоты и прочности</h4>
                    <p className="all-des__des">
                        Наша компания ADC является одним из лидеров дизайн архитектуры в отрасли <br/>
                        строительства. Сегодня компания ADC реализует проекты жилой и коммерческой <br/>
                        недвижимости не только здесь но и за пределами нашей страны, отличающихся <br/>
                        высоким качеством, стильной архитектурой, современным дизайном.
                    </p>
                    <div className="all-des__gallery">
                        <div className="all-des__gallery__item">
                            <img src={Img1} alt=""/>
                        </div>
                        <div className="all-des__gallery__item">
                            <img src={Img2} alt=""/>
                        </div>
                        <div className="all-des__gallery__item">
                            <img src={Img3} alt=""/>
                        </div>
                        <div className="all-des__gallery__item">
                            <img src={Img4} alt=""/>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default About;