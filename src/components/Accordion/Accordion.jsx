import React, {useState} from 'react';
import vector1 from "../../static/img/Vector 1.svg"
import vector2 from "../../static/img/Vector 2.svg"
import "./accordion.scss"

const Accordion = ({data, isLoading, error, isError}) => {
    const [activeAccordion, setActiveAccordion] = useState(-1)

    const toggleAccordion = (index) => {
        setActiveAccordion(index)
    }

    if (isLoading) {
        return <div style={{color: "white"}}>Loading...</div>;
    }

    if (isError) {
        return <div style={{color: "white"}}>Error</div>;
    }

    if (!data){
        return <div style={{color: "white"}}>No project</div>;
    }

    return (
        <div className="accordions">
            <div className="accordions__faq">
                {
                    data.map((item, index) => (
                        <div className="accordions__wrapper" key={item._id} onClick={ activeAccordion === index ? () => toggleAccordion(-1) : () => toggleAccordion(index)}>
                            <div className="accordions__heading">
                                <h1 className={activeAccordion === index ? "accordions__question active" : "accordions__question"}>{item.title}</h1>
                                {
                                    activeAccordion === index ? (
                                        <>
                                            <span className="accordions__arrow">
                                    <img className="accordions__img image" src={vector1} alt=""/>
                                </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="accordions__arrow">
                                    <img className="accordions__img image" src={vector2} alt=""/>
                                </span>
                                        </>
                                    )
                                }
                            </div>
                            <div className="accordions__items">
                                <p className={activeAccordion === index ? "accordions__subtitle active" : "accordions__subtitle"}>{item.desc}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Accordion;