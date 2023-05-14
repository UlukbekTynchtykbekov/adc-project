import React, {useEffect, useState} from 'react';
import Helmet from "../../layout/Helmet";
import ProjectRating from "../../components/ProjectRating";
import {Navigate, useParams} from "react-router-dom";
import {useProjectInfo} from "../../CustomHooks/useProjectInfo";
import {useAcceptReviewData, useDeleteReviewData, useProjectData, useProjectsData} from "../../CustomHooks/useProjectsData";
import {useAllReviewData} from "../../CustomHooks/useReviewData";
import {reviewActions} from "../../features/reviewSlice";
import {useDispatch} from "react-redux";
import { showSuccessNotification, showErrorNotification } from "../../CustomHooks/useToast"
import Loader from "../../components/Loader/Loader";
import Error from "../../components/ErrorComponent/Error";
import EmptyItems from "../../components/EmtyItems/EmptyItems";
import "./product-reviews.scss"

const ProductReviews = () => {
    const [projectInfo, setProjectInfo] = useState([])
    const [navigate, setNavigate] = useState(false)
    const [accepted, setAccepted] = useState(false);
    const [acceptedReviews, setAcceptedReviews] = useState([]);
    const [unAcceptedReviews, setUnAcceptedReviews] = useState([]);
    const [deletedId, setDeletedId] = useState("")

    const dispatch = useDispatch()
    const {id} = useParams()

    const {data: projectData, isLoading, isError, error} = useProjectData(id);

    const {refetch} = useProjectsData();
    const {data: projectInfoData} = useProjectInfo();
    const {
        data: reviewData,
        isLoading: reviewLoading,
        isError: reviewIsError,
        error: reviewError
    } = useAllReviewData(id);

    const {mutate: fetchAcceptReview, isSuccess: acceptSuccess} = useAcceptReviewData( showSuccessNotification, showErrorNotification)
    const {mutate: fetchDeleteReview, isSuccess: deletedSuccess} = useDeleteReviewData( showSuccessNotification, showErrorNotification)

    const handleAcceptData = (reviewId) => {
        setDeletedId(reviewId)
        fetchAcceptReview({projectId: id, reviewId})
    }

    const handleDeleteData = (reviewId) => {
        setDeletedId(reviewId)
        fetchDeleteReview({projectId: id, reviewId})
    }

    if (deletedSuccess || acceptSuccess){
        dispatch(reviewActions.deleteUnacceptedComments(deletedId))
    }

    const handleBack = () => {
        setNavigate(true)
    }

    useEffect(() => {
        if (projectInfoData?.data && projectData?.data) {
            const singleProjectInfo = projectInfoData?.data.filter(el => {
                return el.project._id === id
            })
            setProjectInfo(singleProjectInfo)
        }

        if (reviewData?.data) {
            const getReviews = reviewData?.data.filter(el => {
                return el.accepted === true
            })
            setAcceptedReviews(getReviews)
        }

        if (reviewData?.data) {
            const getReviews = reviewData?.data.filter(el => {
                return el.accepted === false
            })
            setUnAcceptedReviews(getReviews)
        }

    }, [projectInfoData?.data, projectData?.data, reviewData?.data, accepted, id]);

    if (navigate === true) {
        refetch()
        return <Navigate to="/admin/comments"/>
    }

    return (
        <Helmet title="Product Reviews">
            <section className="comments">
                <div className="container">
                    <div className="comments__wrapper">
                        {
                            isLoading &&  <Loader />
                        }
                        {
                            isError && <Error status={error?.status} page={error?.message}/>
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
                                                <p className={accepted ? "comments__tab-link" : "comments__tab-link active"}>Непрочитанные{`(${unAcceptedReviews.length})`}</p>
                                            </li>
                                            <li className="comments__tab-item" onClick={() => setAccepted(true)}>
                                                <p className={accepted ? "comments__tab-link active" : "comments__tab-link"}>Прочитанные{`(${acceptedReviews.length})`}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    {
                                        reviewLoading && <div className="comments__result">
                                            <Loader />
                                        </div>
                                    }
                                    {
                                        reviewIsError && <div className="comments__result">
                                            <Error status={reviewError?.status} page={reviewError?.message}/>
                                        </div>
                                    }
                                    <div className="comments__comment">
                                        <div className="comments__comment-items">
                                            {
                                                accepted ? acceptedReviews.length > 0 && acceptedReviews.map(el => (
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
                                                                <p className="comments__comment-text"
                                                                   key={el._id}>{el.comment}</p>
                                                            ))
                                                        }
                                                        <div className="comments__comment-buttons">
                                                            <button onClick={() => handleDeleteData(el._id)}
                                                                    className="button comments__delete-btn">
                                                                Удалить
                                                            </button>
                                                            {
                                                                !accepted &&
                                                                <button onClick={() => handleAcceptData(el._id)}
                                                                        className="button comments__btn">
                                                                    Принимать
                                                                </button>
                                                            }
                                                        </div>
                                                    </div>
                                                )) :
                                                    unAcceptedReviews.length > 0 && unAcceptedReviews.map(el => (
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
                                                                    <p className="comments__comment-text"
                                                                       key={el._id}>{el.comment}</p>
                                                                ))
                                                            }
                                                            <div className="comments__comment-buttons">
                                                                <button onClick={() => handleDeleteData(el._id)}
                                                                        className="button comments__delete-btn">
                                                                    Удалить
                                                                </button>
                                                                {
                                                                    !accepted &&
                                                                    <button onClick={() => handleAcceptData(el._id)}
                                                                            className="button comments__btn">
                                                                        Принимать
                                                                    </button>
                                                                }
                                                            </div>
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                    {
                                        accepted ? !reviewLoading && !reviewIsError && acceptedReviews.length === 0 &&
                                            <div className="comments__result">
                                                <EmptyItems />
                                            </div> :
                                            !reviewLoading && !reviewIsError &&  unAcceptedReviews.length === 0 &&
                                            <div className="comments__result">
                                                <EmptyItems />
                                            </div>
                                    }
                                </div>
                            </div>
                        }
                        {
                            !isLoading && !isError && !projectData?.data && <EmptyItems />
                        }
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default ProductReviews;