import React from 'react';
import {useProjectInfo} from "../../CustomHooks/useProjectInfo";
import Ruler from "../../static/img/pencil-ruler-2-fill.svg";
import House from "../../static/img/home-2-line.svg";
import "./project-detail-bottom.scss"

const ProjectDetailBottom = ({el}) => {

   const {data} = useProjectInfo()

    const {
       _id,
        square,
        design,
        architect,
    } = el

    console.log(architect.images)

    const project = data?.data?.filter(el => {
        return el.project._id === _id
    })

    return (
        <div className="detail__bottom">
            <div className="description">
                {
                    project?.length === 0 ? "" :
                    project?.map(el => (
                        <div className="description__desc">
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
                {
                    design ? <div className="detail__designs designs">
                        <img className="designs__img" src={`https://adc-mern-stack.herokuapp.com/${design[0]?.path}`} alt=""/>
                    </div> : null
                }
            </div>
            <div className="architect">
                <div className="architect__photo">
                    <img className="architect__img" src={`https://adc-mern-stack.herokuapp.com/${architect.images[0]?.path}`} alt="ddd"/>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailBottom;