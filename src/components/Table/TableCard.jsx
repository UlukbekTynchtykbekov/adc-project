import React from 'react';
import Delete from "../../static/img/delete.svg";
import { showSuccessNotification, showErrorNotification } from "../../CustomHooks/useToast"
import {useFavoriteProject} from "../../CustomHooks/useProjectsData";

const TableCard = ({el, idx}) => {

    const {mutate: fetchFavoriteProject, isLoading: removeLoading} = useFavoriteProject(showSuccessNotification, showErrorNotification)

    const deleteFavoriteProject = (id) => {
        fetchFavoriteProject({projectId: id})
    }

    return (
        <tr className="table__list">
            <td className="table__item">{idx + 1}</td>
            <td className="table__item">
                <img className="table__img" src= {el?.exterior[0].url} alt="tableImage"/>
                {
                    el?.name
                }
            </td>
            <td className="table__item">{el?.room?.quantity} комната
            </td>
            <td className="table__item">{el?.square?.square}м<sup className="table__sup">2</sup></td>
            <td className="table__item">
                <button className="table__button" onClick={() => deleteFavoriteProject(el._id)} disabled={removeLoading}>
                    <img className="table__delete-icon" src={Delete} alt="Delete"/>
                </button>
            </td>
        </tr>
    );
};

export default TableCard;