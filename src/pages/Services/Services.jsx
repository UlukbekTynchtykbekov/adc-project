import React from 'react';
import Accordion from "../../components/Accordion";
import Helmet from "../../layout/Helmet";
import '../../styles/services.scss'

const dataCollections = [
    {
        question: "Архитектура C 3D  Визуализацией",
        answer: "Строительство дома обычно связано с решением целого ряда проблем. К бюрократическим и финансовым вопросам обязательно присоединяется необходимость выбора проекта. Выбрать готовый или доработанный стандартный вариант или сделать свой, индивидуальный? Как же совместить реальность с мечтой об идеальном доме? Мы вам поможем."
    },
    {
        question: "Реализация Проекта",
        answer: "Мы все знаем, что одним из наиболее важных и ответственных этапов реализации проекта является его финальный этап. Это время, когда результат работы, каким бы он ни был, представляется вам."
    },
    {
        question: "Декорирование",
        answer: "подбор мебели и оборудования, отделочных материалов и аксессуаров, светильников, живописи и скульптуры, других деталей интерьера, связанный с периодическими поездками Исполнителя по магазинам, офисам поставщиков, выставкам и т.п., совместно с Заказчиком и самостоятельно."
    },
    {
        question: "Дизайн Интерьера И Эктерьера",
        answer: "Подготовим для вас дизайн проект под ключ и поможем выгодно подобрать отделочные материалы. Дизайн интерьера и экстерьера любого масштаба, осталось сообщить менеджеру стиль и бюджет! Полный спектр услуг. Ландшафтный дизайн."
    },
    {
        question: "Комплектация Проектов",
        answer: "Комплектация дизайн-проекта — этап, на котором мы от имени клиента заказываем, обеспечиваем доставку и контролируем монтаж отделочных материалов и предметов интерьера согласно проекту на основе спецификаций, в которых содержатся:\n"
    },
]

const Services = () => {
    return (
        <Helmet title="Services">
            <section className="services">
                <div className="container">
                    <div className="services__top">
                        <h4 className="services__title">НАШИ УСЛУГИ</h4>
                        <h3 className="services__suggestion">ПОЛУЧИТЕ  БЕСПЛАТНУЮ <br/>
                            КОНСУЛЬТАЦИЯ
                        </h3>
                    </div>
                    <Accordion data={dataCollections}/>
                    <div className="bottom">
                        <h5 className="bottom__mainTitle">МЫ ПРЕДЛАГАЕМ</h5>
                        <div className="bottom__row">
                            <div className="bottom__column">
                                <div className="bottom__card">
                                    <h1 className="bottom__number">1</h1>
                                    <div className="bottom__info">
                                        <h4 className="bottom__title">Дизайн коммерческих
                                            пространств</h4>
                                        <p className="bottom__subtitle">Разработка дизайна мест
                                            общественного пользования жилых комлексов и бизнес -центров</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom__column">
                                <div className="bottom__card">
                                    <h1 className="bottom__number">2</h1>
                                    <div className="bottom__info">
                                        <h4 className="bottom__title">Архитектурные   проекты</h4>
                                        <p className="bottom__subtitle">Создаем индивидуальные архитектурные
                                            проекты чертежи начиная от частных домов заканчивая промышленных объектов</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom__column">
                                <div className="bottom__card">
                                    <h1 className="bottom__number">3</h1>
                                    <div className="bottom__info">
                                        <h4 className="bottom__title">Отделочные работы</h4>
                                        <p className="bottom__subtitle">Руками профессиональных мастеров мы воплотим в жизнь все то, что спроектировали</p>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default Services;