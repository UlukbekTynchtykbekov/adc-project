import React, {useEffect} from 'react';
import Helmet from "../../layout/Helmet";
import  construction1 from '../../static/img/construction1.png';
import  construction2 from '../../static/img/construction2.png';
import  construction3 from '../../static/img/construction3.png';
import  construction4 from '../../static/img/construction4.png';
import  ellipse from '../../static/img/Ellipse 8.svg';
import Aos  from 'aos';
import 'aos/dist/aos.css'
import '../../styles/construction.scss';

const Construction = () => {

    useEffect(() =>{
        Aos.init({});
    },[])
    return (
        <Helmet title="Construction">
            <section className="construction">
                <div className="container">
                    <h4 className="construction__title">ЧТО ВЫ ПОЛУЧИТЕ РАБОТАЯ С НАМИ</h4>
                    <div className="envelope">
                        <div data-aos="zoom-in-right" data-aos-duration="1500" className="col-6 envelope__column">
                            <img className="envelope__image" src={construction1} alt=""/>
                        </div>
                        <div data-aos="zoom-in-left" data-aos-duration="1500" data-aos-delay="500" className="col-6 envelope__column">
                            <div className="envelope__wrapper">
                                <div className="envelope__ellipse">
                                    <img className="envelope__icon" src={ellipse} alt=""/>
                                    <span className="envelope__number">1</span>
                                </div>
                                <p className="envelope__subtitle">Выполнение разметки жилого дома с выносом разбивочных осей <br/>
                                    Копка траншей для выполнения фундамента <br/>
                                    Бетонирование монолитного цоколя и т.д
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="envelope">
                        <div data-aos="zoom-in-right" data-aos-duration="1500" className="col-6 envelope__column">
                            <img className="envelope__image" src={construction2} alt=""/>
                        </div>
                        <div data-aos="zoom-in-left" data-aos-delay="500" data-aos-duration="1500" className="col-6 envelope__column">
                            <div className="envelope__wrapper">
                                <div className="envelope__ellipse">
                                    <img className="envelope__icon" src={ellipse} alt=""/>
                                    <span className="envelope__number">2</span>
                                </div>
                                <h2 className="envelope__title">Подберем материалы
                                    со 10% скидкой</h2>
                                <p className="envelope__subtitle">Бетонирование монолитного цоколя и т.д
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="envelope">
                        <div data-aos="zoom-in-right" data-aos-duration="1500" className="col-6 envelope__column">
                            <img className="envelope__image" src={construction3} alt=""/>
                        </div>
                        <div data-aos="zoom-in-left" data-aos-delay="500" data-aos-duration="1500" className="col-6 envelope__column">
                            <div className="envelope__wrapper">
                                <div className="envelope__ellipse">
                                    <img className="envelope__icon" src={ellipse} alt=""/>
                                    <span className="envelope__number">3</span>
                                </div>
                                <h2 className="envelope__title">Беремся за дело</h2>
                                <p className="envelope__subtitle">Наша компания ADC  является одним из лидеров дизайн <br/>
                                    архитектуры в отрасли строительства. Сегодня компания <br/>
                                    ADC реализует проекты жилой и коммерческой <br/>
                                    недвижимости не только здесь но и за пределами нашей <br/>
                                    страны, отличающихся высоким качеством, стильной <br/>
                                    архитектурой, современным дизайном.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="envelope">
                        <div data-aos="zoom-in-right" data-aos-duration="1500" className="col-6 envelope__column">
                            <img className="envelope__image" src={construction4} alt=""/>
                        </div>
                        <div data-aos="zoom-in-left" data-aos-delay="500" data-aos-duration="1500" className="col-6 envelope__column">
                            <div className="envelope__wrapper">
                                <div className="envelope__ellipse">
                                    <img className="envelope__icon" src={ellipse} alt=""/>
                                    <span className="envelope__number">4</span>
                                </div>
                                <h2 className="envelope__title">
                                    В итоге реализуем ваш
                                    проект
                                </h2>
                                <p className="envelope__subtitle">
                                    Наша компания ADC  является одним из лидеров дизайн <br/>
                                    архитектуры в отрасли строительства. Сегодня компания <br/>
                                    ADC реализует проекты жилой и коммерческой <br/>
                                    недвижимости не только здесь но и за пределами нашей <br/>
                                    страны, отличающихся высоким качеством, стильной <br/>
                                    архитектурой, современным дизайном.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default Construction;