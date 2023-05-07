import React, {useEffect} from 'react';
import Aos from "aos";
import ellipse from "../../static/img/Ellipse 8.svg";
import 'aos/dist/aos.css'

const ConstructionCard = ({el, idx}) => {

    useEffect(() => {
        Aos.init({});
    }, [])

    return (
        <div className="envelope">
            <div data-aos="zoom-in-right" data-aos-duration="1500" className="col-6 envelope__column">
                <img className="envelope__image" src={el.images[0].url} alt=""/>
            </div>
            <div data-aos="zoom-in-left" data-aos-duration="1500" data-aos-delay="500"
                 className="col-6 envelope__column">
                <div className="envelope__wrapper">
                    <div className="envelope__ellipse">
                        <img className="envelope__icon" src={ellipse} alt=""/>
                        <span className="envelope__number">{idx + 1}</span>
                    </div>
                    <h2 className="envelope__title">{el.title}</h2>
                    <p className="envelope__subtitle">{
                        el.desc
                    }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConstructionCard;