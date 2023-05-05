import React, {useEffect, useState} from 'react';
import Rate from "../Rate";
import {useReviewData} from "../../CustomHooks/useReviewData";
import "./reviews.scss"
import {useAddReviewData} from "../../CustomHooks/useProjectsData";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Reviews = ({el}) => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [sentMessage, setSentMessage] = useState(false);
    const {data: authMe, isAuthenticated} = useSelector(state => state.auth);

    const saveOnSuccess = () => {
        toast.success('Data added successfully', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setSentMessage(true)
    }

    const saveOnError = () => {
        toast.error('Error adding data', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const {data: reviewData, isLoading, isError, error} = useReviewData(el._id)
    const {mutate: reviewMutation, data: reviewMutationData} = useAddReviewData(saveOnSuccess, saveOnError);

    const handleClick = (e, id) => {
        e.preventDefault()
        const review = {
            star: rating, comment, projectId: id
        }
        reviewMutation(review)
    }
    
    if (isLoading) {
        return <div style={{color: "white"}}>Loading...</div>;
    }

    if (isError) {
        return <div style={{color: "white"}}>{error?.message}</div>;
    }

    if (!reviewData?.data) {
        return <div style={{color: "white"}}>No Information</div>;
    }

    return (
        <section className="review">
            <div className="container">
                <div className="review__title">
                    <h6 className="reviews__tab">Review({reviewData?.data.length})</h6>
                </div>
                <div className="review__items">
                    <div className="review__wrapper">
                        <ul className="review__list">
                            {reviewData?.data.map(review => (<li key={review._id} className="review__item">
                                <h2 className="review__user">{review.postedBy.firstName} {review.postedBy.lastName}</h2>
                                <span className="review__statistic">{review.star} (rating)</span>
                                <p className="review__text">{review.comments[0].comment}
                                </p>
                            </li>))}
                        </ul>
                        {isAuthenticated ? sentMessage ? <div className="review__check">
                            <h3 className="review__check-title">Спасибо, что оставили отзыв!</h3>
                            <p className="review__check-message">
                                Ваш отзыв появится после того, как его проверит администратор!
                            </p>
                        </div> : <div className="review__form">
                            <h4 className="review__form-title">Оставьте свой отзыв</h4>
                            <form onSubmit={(e) => handleClick(e, el._id)} className="review__formik">
                                <div className="review__stars">
                                    <Rate rating={rating} onRating={(rate) => setRating(rate)}/>
                                </div>
                                <div className="review__group">
                                                        <textarea onChange={(e) => setComment(e.target.value)}
                                                                  rows={4}
                                                                  className="review__textarea"
                                                                  type="text"
                                                                  placeholder="Сообщение отзыва ..."
                                                                  required
                                                        />
                                    <button className="button review__btn" type="submit">Отправить</button>
                                </div>
                            </form>
                        </div> : <div className="review__check">
                            <p className="review__check-message">
                                Если вы хотите оставить свой отзыв, вы должны сначала <Link
                                className="review__check-link" to='/register'>зарегистрироваться
                            </Link>.
                            </p>
                        </div>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;