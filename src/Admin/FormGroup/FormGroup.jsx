import React from 'react';

const FormGroup = ({text, option, setData, data, item, dataError, type}) => {

    return (
        <div className="formik__group">
            <h2 className="formik__text">{text}</h2>
            <select
                className="select"
                size="1"
                onChange={setData}
                name={type}
            >
                <option className="select__option" value="">{option}</option>
                {
                    type === "projectId" ?
                        data.map(el => (
                        type === "projectId" && <option key={el._id} className="select__option" value={el._id} selected={el._id === item}>{el.name}</option>
                    )) :
                            data?.data.map(el => (
                            type === "architectId" && <option key={el._id} className="select__option" value={el._id} selected={el._id === item}>{el.firstname}</option>
                            || type === "categoryId" && <option key={el._id} className="select__option" value={el._id} selected={el._id === item}>{el.name}</option>
                            || type === "roomId" && <option key={el._id} className="select__option" value={el._id} selected={el._id === item}>{el.quantity}</option>
                            || type === "squareId" && <option key={el._id} className="select__option" value={el._id} selected={el._id === item}>{el.square}</option>
                        ))
                }
            </select>
            {
                dataError && <p className="formik__error">*{dataError}</p>
            }
        </div>
    );
};

export default FormGroup;