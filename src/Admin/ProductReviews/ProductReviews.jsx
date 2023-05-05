import React, {useEffect, useState} from 'react';
import Helmet from "../../layout/Helmet";
import "./product-reviews.scss"
import ProjectRating from "../../components/ProjectRating";
import  {useNavigate, useParams} from "react-router-dom";
import {useProjectData} from "../../CustomHooks/useProjectData";
import {useProjectInfo} from "../../CustomHooks/useProjectInfo";
import { ToastContainer} from "react-toastify";
import {useAcceptReviewData, useDeleteReviewData} from "../../CustomHooks/useProjectsData";
import {useAllReviewData} from "../../CustomHooks/useReviewData";

const ProductReviews = () => {
    const [projectInfo, setProjectInfo] = useState([])
    const [accepted, setAccepted] = useState(false);
    const [reviews, setReviews] = useState([]);

    const navigate = useNavigate()

    const {id} = useParams()
    const {data: projectData, isLoading, isError, error} = useProjectData(id);
    const {data: projectInfoData} = useProjectInfo();
    const {
        data: reviewData,
        isLoading: reviewLoading,
        isError: reviewIsError,
        error: reviewError
    } = useAllReviewData(id);
    const {mutate: fetchAcceptReview} = useAcceptReviewData()
    const {mutate: fetchDeleteReview} = useDeleteReviewData()

    const handleAcceptData = (reviewId) => {
        fetchAcceptReview({projectId: id, reviewId})
    }

    const handleDeleteData = (reviewId) => {
        fetchDeleteReview({projectId: id, reviewId})
    }

    const handleBack = () => {
        navigate("/admin/comments")
    }

    useEffect(() => {
        if (projectInfoData?.data && projectData?.data) {
            const singleProjectInfo = projectInfoData?.data.filter(el => {
                return el.project._id === id
            })
            setProjectInfo(singleProjectInfo)
        }

        if (reviewData?.data){
            const getReviews = reviewData?.data.filter(el => {
                return el.accepted === accepted
            })
            setReviews(getReviews)
        }

    }, [projectInfoData?.data, projectData?.data, reviewData?.data, accepted, id])

    return (
        <Helmet title="Product Reviews">
            <section className="comments">
                <div className="container">
                    <div className="comments__wrapper">
                        {
                            isLoading && <div>Loading...</div>
                        }
                        {
                            isError && <div>{error?.message}</div>
                        }
                        {
                            projectData?.data && <div className="comments__intro">
                            <div className="comments__back">
                                <span onClick={() => handleBack()} className="comments__icon">
                                    <ion-icon name="arrow-back-outline"></ion-icon>
                                </span>
                            </div>
                                <h1 className="comments__title">КОММЕНТАРИИ</h1>
                                <div className="shell">
                                    <div className="shell__image">
                                        <img className="shell__img" src={projectData?.data.exterior[0].url} alt=""/>
                                    </div>
                                    <div className="shell__detail">
                                        <h2 className="shell__title">{projectData?.data.name}</h2>
                                        <div className="shell__rating">
                                            <div className="shell__stars">
                                                <ProjectRating
                                                    rating={projectData?.data.totalRating ? projectData?.data.totalRating : 0}/>
                                            </div>
                                            <p className="shell__reviews">{projectData?.data.reviews.length} Reviews</p>
                                        </div>
                                        {
                                            projectInfo.length > 0 ? projectInfo.map(el => (
                                                <p className="shell__description" key={el._id}>{el.description}</p>
                                            )) : null
                                        }
                                    </div>
                                </div>
                                <div className="comments__reviews">
                                    <div className="comments__tabs">
                                        <ul className="comments__tab-items">
                                            <li className="comments__tab-item" onClick={() => setAccepted(false)}>
                                                <p className={accepted ? "comments__tab-link" : "comments__tab-link active"}>Непрочитанные(10)</p>
                                            </li>
                                            <li className="comments__tab-item" onClick={() => setAccepted(true)}>
                                                <p className={accepted ?  "comments__tab-link active" : "comments__tab-link"}>Прочитанные(10)</p>
                                            </li>
                                        </ul>
                                    </div>
                                    {
                                        reviewLoading && <div>Loading...</div>
                                    }
                                    {
                                        reviewIsError && <div>{reviewError?.message}</div>
                                    }
                                    <div className="comments__comment">
                                        <div className="comments__comment-items">
                                            {
                                                reviews.length > 0 && reviews.map(el => (
                                                    <div className="comments__comment-item" key={el._id}>
                                                        <div className="comments__user">
                                                            <div className="comments__user-profile">
                                                                <h3 className="comments__user-name">{el.postedBy.firstName}</h3>
                                                                <p className="comments__user-email">{el.postedBy.lastName}</p>
                                                            </div>
                                                            <div className="comments__user-stars">
                                                                <ProjectRating rating={el.star}/>
                                                            </div>
                                                        </div>
                                                        {
                                                            el.comments.map(el => (
                                                                <p className="comments__comment-text" key={el._id}>{el.comment}</p>
                                                            ))
                                                        }
                                                        <div className="comments__comment-buttons">
                                                            <button onClick={() => handleDeleteData(el._id)} className="button comments__delete-btn">
                                                                Удалить
                                                            </button>
                                                            {
                                                                !accepted && <button onClick={() => handleAcceptData(el._id)} className="button comments__btn">
                                                                    Принимать
                                                                </button>
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            {
                                                !reviewLoading && reviews.length === 0 && <div>Net Dannyh</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            !isLoading && !projectData?.data && <div>NO DATA</div>
                        }
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </div>
            </section>
        </Helmet>
    );
};

export default ProductReviews;