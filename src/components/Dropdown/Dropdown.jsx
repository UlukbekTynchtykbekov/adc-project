import React, {useState} from 'react';
import ArrowDown from '../../static/img/arrow-down-s-fill.svg'
import './dropdown.scss'

const Dropdown = ({setSelected, options, selected}) => {

    const [active, setActive] = useState(false)

    return (
        <div className="dropdown">
            <button onClick={() => setActive(!active)} className="dropdown__btn">
                {
                    selected ? selected : "Выберите"
                }
                <img src={ArrowDown} alt="ArrowDown"/>
            </button>
            {
                active && (
                    <div className="dropdown__content">
                        {
                            options.map((option, idx) =>(
                                <div onClick={(e) => {
                                    setSelected(option)
                                    setActive(false)
                                }
                                } key={idx} className="dropdown__item">
                                    {option}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Dropdown;