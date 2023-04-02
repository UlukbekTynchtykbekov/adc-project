import React from 'react';
import Delete from "../../static/img/delete.svg";
import {useDeleteFavoriteProject} from "../../CustomHooks/useProjectFavorite";

const TableCard = ({el, idx}) => {

    const {mutate: removeFavoriteProject, isLoading: removeLoading} = useDeleteFavoriteProject()

    const deleteFavoriteProject = (id) => {
        removeFavoriteProject(id)
    }

    return (
        <tr className="table__list">
            <td className="table__item">{idx + 1}</td>
            <td className="table__item">
                <img className="table__img" src= {`https://adc-mern-stack.herokuapp.com/${el?.project?.exterior[0].path}`} alt="tableImage"/>
                {
                    el?.project?.name
                }
            </td>
            <td className="table__item">{el?.project?.room?.quantity} комната
            </td>
            <td className="table__item">{el?.project?.square?.square}м<sup className="table__sup">2</sup></td>
            <td className="table__item">
                <button className="table__button" onClick={() => deleteFavoriteProject(el.project._id)}>
                    <img className="table__delete-icon" src={Delete} alt="Delete"/>
                </button>
            </td>
        </tr>
    );
};

export default TableCard;