import React from 'react';
import {Link} from "react-router-dom";
import {useDeleteProjectInfo} from "../../CustomHooks/useProjectInfo";
import { showSuccessNotification, showErrorNotification } from "../../CustomHooks/useToast"

const ProjectInfoCard = ({el, idx}) => {

    const {mutate: deleteProjectInfo, isLoading: deletedDataIsLoading} = useDeleteProjectInfo(showSuccessNotification, showErrorNotification)

    const handleDelete = (id) => {
        deleteProjectInfo(id)
    }

    return (
        <tr className="table__list">
            <td className="table__item">{idx + 1}</td>
            <td className="table__item">
                <img src={el.project.exterior[0].url} className="table__img" alt="tableImage"/>
                {el.project.name}
            </td>
            <td className="table__item">{el.title} </td>
            <td className="table__item">
                <Link to={`/admin/project-info/${el._id}`}>
                    <button className="table__button product__table-btn">
                                            <span className="table__img product__table-img">
                                                <ion-icon name="create-outline"></ion-icon>
                                            </span>
                        редактировать
                    </button>
                </Link>
                <button onClick={() => handleDelete(el._id)} className="table__button product__table-btn" disabled={deletedDataIsLoading}>
                                           <span className="table__img product__table-img">
                                                <ion-icon name="trash-outline"></ion-icon>
                                            </span>
                    удалить
                </button>
            </td>
        </tr>
    );
};

export default ProjectInfoCard;