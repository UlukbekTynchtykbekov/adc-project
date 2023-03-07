import React from 'react';

const Helmet = (props) => {
    document.title = "ADC " + props.title;
    return <div>{props.children}</div>
};

export default Helmet;