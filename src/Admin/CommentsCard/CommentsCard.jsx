import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const CommentsCard = ({el, idx}) => {
    const [ acceptedReview, setAcceptedReview] = useState([]);
    const [ unacceptedReview, setUnacceptedReview] = useState([]);

    useEffect(() => {

        let filteredAcceptedReview = el.reviews.filter((review) =>{
            return review.accepted === true
        });

        setAcceptedReview(filteredAcceptedReview)

        let filteredUnacceptedReview = el.reviews.filter((review) =>{
            return review.accepted === false
        });

        setUnacceptedReview(filteredUnacceptedReview)

    }, []);

    return (
        <tr className="table__list">
            <td className="table__item">{idx + 1}</td>
            <td className="table__item">
                <img src={el.exterior[0].url} className="table__img"
                     alt="tableImage"/>
                {el.name}
            </td>
            <td className="table__item">{unacceptedReview.length} комментарии</td>
            <td className="table__item">{acceptedReview.length} комментарии</td>
            <td className="table__item">
                <Link to={`/admin/comments/show/${el._id}`}>
                    <button className="table__button product__table-btn">
                        Показать
                    </button>
                </Link>
            </td>
        </tr>
    );
};

export default CommentsCard;