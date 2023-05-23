import React, {useEffect, useState} from 'react';
import {useFavoriteProject,} from "../../CustomHooks/useProjectsData";
import Dropdown from "../Dropdown";
import ProjectRating from "../ProjectRating";
import SharePage from "../ShareComponent";
import Home from "../../static/img/home-2-line.svg";
import Pen from "../../static/img/edit-line.svg";
import Share from "../../static/img/share-line.svg";
import Grid from "../../static/img/grid-fill.svg";
import { showSuccessNotification, showErrorNotification } from "../../CustomHooks/useToast"
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import "./project-detail-card.scss"

const ProjectDetailCard = ({el, setShowAllPhotos, setSelected, selected}) => {

    const [favoriteProject, setFavoriteProject] = useState(false)
    const [activeButton, setActiveButton] = useState(false);
    const options = ["экстерьер", "интерьер"]
    const navigate = useNavigate();

    const {
        _id, name, room,
        exterior, interior, category, totalRating
    } = el

    const {data: authMe, isAuthenticated} = useSelector(state => state.auth);
    const {mutate: fetchFavoriteProject, isLoading: fetchFavoriteLoading} = useFavoriteProject(showSuccessNotification, showErrorNotification);

    const saveFavoriteProject = (id) => {
        const favoriteProject = {
            projectId: id,
        }
        fetchFavoriteProject(favoriteProject)
    }

    const goLoginPage = () => {
        return navigate("/login")
    }

    useEffect(() => {
        if (authMe?.wishList){
            const checkedProject = authMe?.wishList.filter(el => {
                return el === _id
            });
            if (checkedProject.length > 0){
                setFavoriteProject(true)
            }else{
                setFavoriteProject(false)
            }
        }else{
            setFavoriteProject(false)
        }
    }, [authMe])

    return (
        <div className="detail__info">
            <div className="detail__sort">
                <h1 className="detail__name">{name}</h1>
                <Dropdown setSelected={setSelected} options={options} selected={selected}/>
            </div>
            <div className="detail__header">
                <div className="detail__information">
                    <div className="detail__rating">
                        <div className="detail__stars">
                            <ProjectRating rating={totalRating}/>
                        </div>
                        <div className="detail__rate">{
                            totalRating > 0 ? <p>{totalRating} (ratings)</p> : <p>0 (ratings)</p>
                        }
                        </div>
                    </div>
                    <div className="detail__short-info">
                        <div className="room">
                            <img className="room__img" src={Home} alt="Star"/>
                            <p className="room__title">
                                {room.quantity} комнаты
                            </p>
                        </div>
                        <div className="categories">
                            <img className="categories__img" src={Pen} alt="Star"/>
                            <span className="categories__title">
                                     {category.name}
                                </span>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <div className="share">
                        <div className="share__share-btn" onClick={() => setActiveButton(!activeButton)}>
                            <img className="share__img" src={Share} alt=""/>
                        </div>
                        <SharePage activeButton={activeButton} setActiveButton={setActiveButton}/>
                    </div>
                    <button className="save"
                            onClick={isAuthenticated ? () => saveFavoriteProject(_id) : () => goLoginPage()}
                            disabled={fetchFavoriteLoading}>
                        {
                            favoriteProject === true ?
                                <svg className="save__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                     width="24" height="24">
                                    <path fill="none" d="M0 0H24V24H0z"/>
                                    <path
                                        d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z"
                                        fill="rgba(230,6,6,1)"/>
                                </svg> :
                                <svg className="save__img"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0H24V24H0z"/>
                                    <path className="save__img-path"
                                          d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
                                          fill="black"/>
                                </svg>
                        }
                    </button>
                </div>
            </div>
            <div className="content">
                <div className="detail__images">
                    <div className="detail__column1">
                        {
                            selected === "экстерьер" ? exterior?.[0] && (
                                <div>
                                    <img className="grid--main-img"
                                         src={exterior[0].url} alt=""/>
                                </div>
                            ) : interior?.[0] && (
                                <div>
                                    <img className="grid--main-img"
                                         src={interior[0].url} alt=""/>
                                </div>
                            )
                        }
                    </div>
                    <div className="detail__column2">
                        {
                            selected === "экстерьер" ? exterior?.[1] && (
                                <img className="grid--image"
                                     src={exterior[1].url} alt=""/>
                            ) : interior?.[1] && (
                                <img className="grid--image"
                                     src={interior[1].url} alt=""/>
                            )
                        }
                        <div className="image-wrapper">
                            {
                                selected === "экстерьер" ? exterior?.[2] && (
                                    <img className="grid--image grid--image-2"
                                         src={exterior[2].url} alt=""/>
                                ) : interior?.[2] && (
                                    <img className="grid--image grid--image-2"
                                         src={interior[2].url} alt=""/>
                                )
                            }
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="content__button">
                    <img className="content__button-image" src={Grid} alt=""/>
                    <span className="content__button-title">
                                    Показать больше фотографий
                                </span>
                </button>
            </div>
        </div>
    );
};

export default ProjectDetailCard;