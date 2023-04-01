import React from 'react';
import Star from "../../static/img/star-fill.svg";
import Home from "../../static/img/home-2-line.svg";
import Pen from "../../static/img/edit-line.svg";
import Share from "../../static/img/share-line.svg";
import Grid from "../../static/img/grid-fill.svg";
import ProjectDetailBottom from "../ProjectDetailBottom";
import ShareComponent from "../ShareComponent";
import {useFavoriteData} from "../../CustomHooks/useFavoriteData";
import {
    useAddFavoriteProject,
    useDeleteFavoriteProject,
    useFavoriteProject
} from "../../CustomHooks/useProjectFavorite";
import "./project-detail-card.scss"

const ProjectDetailCard = ({el, setShowAllPhotos, designHouse, setDesignHouse, userId}) => {

    const {data: favoriteAddedProject} = useFavoriteProject(el._id)
    const {mutate: removeFavoriteProject, isLoading: removeLoading} = useDeleteFavoriteProject()
    const {data: favoriteData} = useFavoriteData(userId);
    const {mutate: addFavoriteProject} = useAddFavoriteProject();
    const saveFavoriteProject = (id) => {
        const favoriteProject = {
            projectId: id,
            favoriteId: favoriteData?.data?._id
        }
        addFavoriteProject(favoriteProject)
    }

    const deleteFavoriteProject = (id) => {
        removeFavoriteProject(id)
    }

    const {
        name, rating, room,
        exterior, interior, category,
    } = el

    return (
        <div className="detail__info">
            <div className="detail__sort">
                <h1 className="detail__name">{name}</h1>
                <select className="sort" defaultValue={designHouse} onChange={(e) => setDesignHouse(e.target.value)}>
                    <option className="sort__option" value="exterior">экстерьер</option>
                    <option className="sort__option" value="interior">интерьер</option>
                </select>
            </div>
            <div className="detail__header">
                <div className="detail__short-info">
                    <div className="rate">
                        <img className="rate__img" src={Star} alt="Star"/>
                        <span className="rate__title">
                                     {rating.rate}
                                </span>
                    </div>
                    <div className="room">
                        <img className="room__img" src={Home} alt="Star"/>
                        <span className="room__title">
                                     {room.quantity} комнаты
                                </span>
                    </div>
                    <div className="categories">
                        <img className="categories__img" src={Pen} alt="Star"/>
                        <span className="categories__title">
                                     {category.name}
                                </span>
                    </div>
                </div>
                <div className="buttons">
                    <div className="share">
                        <div className="share__share-btn">
                            <img className="share__img" src={Share} alt=""/>
                            <span className="share__title">
                                    поделиться
                                </span>
                        </div>
                        <ShareComponent/>
                    </div>
                    {
                        userId && favoriteData && (
                            <button className="save" onClick={favoriteAddedProject?.data ? () => deleteFavoriteProject(el._id) : () => saveFavoriteProject(el._id)} disabled={removeLoading}>
                                {
                                    favoriteAddedProject?.data ?
                                        <svg className="save__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
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
                                <span className="save__title">
                                    нравиться
                                </span>
                            </button>
                        )
                    }
                </div>
            </div>
            <div className="content">
                <div className="detail__images">
                    <div className="detail__column1">
                        {
                            designHouse === "exterior" ? exterior?.[0] && (
                                <div>
                                    <img className="grid--main-img"
                                         src={`https://adc-mern-stack.herokuapp.com/${exterior[0].path}`} alt=""/>
                                </div>
                            ) : interior?.[0] && (
                                <div>
                                    <img className="grid--main-img"
                                         src={`https://adc-mern-stack.herokuapp.com/${interior[0].path}`} alt=""/>
                                </div>
                            )
                        }
                    </div>
                    <div className="detail__column2">
                        {
                            designHouse === "exterior" ? exterior?.[1] && (
                                <img className="grid--image"
                                     src={`https://adc-mern-stack.herokuapp.com/${exterior[1].path}`} alt=""/>
                            ) : interior?.[1] && (
                                <img className="grid--image"
                                     src={`https://adc-mern-stack.herokuapp.com/${interior[1].path}`} alt=""/>
                            )
                        }
                        <div className="image-wrapper">
                            {
                                designHouse === "exterior" ? exterior?.[2] && (
                                    <img className="grid--image grid--image-2"
                                         src={`https://adc-mern-stack.herokuapp.com/${exterior[2].path}`} alt=""/>
                                ) : interior?.[2] && (
                                    <img className="grid--image grid--image-2"
                                         src={`https://adc-mern-stack.herokuapp.com/${interior[2].path}`} alt=""/>
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
            <ProjectDetailBottom el={el}/>
        </div>
    );
};

export default ProjectDetailCard;