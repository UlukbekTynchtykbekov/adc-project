import React, {useEffect, useState} from 'react';
import {useProjectInfo} from "../../CustomHooks/useProjectInfo";
import Ruler from "../../static/img/pencil-ruler-2-fill.svg";
import House from "../../static/img/home-2-line.svg";
import "./project-detail-bottom.scss"

const ProjectDetailBottom = ({el}) => {
    const [projectInfo, setProjectInfo] = useState([])

    const {data} = useProjectInfo()
    const {
        _id,
        square,
        architect,
    } = el

    useEffect(() => {
        if (data?.data){
            const project = data?.data?.filter(el => {
                return el.project._id === _id
            });
            setProjectInfo(project)
        }
    },[])

    return (
        <div className="detail__bottom">
            <div className="description">
                {
                    projectInfo?.length === 0 ? "" :
                        projectInfo?.map(el => (
                            <div key={el._id} className="description__desc">
                                <h2 className="description__title">
                                    Описание
                                </h2>
                                <p className="description__subtitle">
                                    {
                                        el.description
                                    }
                                </p>
                            </div>
                        ))
                }
                <div className="description__info">
                    <div className="designed">
                        <img className="designed__img" src={Ruler} alt=""/>
                        <div className="designed__info">
                            <h4 className="designed__title">Designed by</h4>
                            <p className="">{architect?.firstname} & {architect?.lastname}</p>
                        </div>
                    </div>
                    <div className="designed">
                        <img className="designed__img" src={House} alt=""/>
                        <div className="designed__info">
                            <h4 className="designed__title">Square of</h4>
                            <p className="">{square?.square}m<sup>2</sup></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="architect">
                    <h2 className="architect__main">About designer</h2>
                <div className="architect__shape">
                    <img className="architect__image"
                         src={architect?.images[0].url} alt=""/>
                </div>
                <h3 className="architect__name">{architect.firstname} {architect.lastname}</h3>
                <h3 className="architect__title">Designer</h3>
            </div>
        </div>
    );
};

export default ProjectDetailBottom;