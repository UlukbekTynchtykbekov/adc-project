import React from 'react';
import {Link} from "react-router-dom";
import { showSuccessNotification, showErrorNotification} from  "../../CustomHooks/useToast"
import {useDeleteArchitect} from "../../CustomHooks/useArchitectData";

const ArchitectCard = ({el, idx}) => {

    const dateString = el.dateOfBirth;
    const dateParts = dateString.split("T");
    const date = dateParts[0];

    const {mutate: deleteArchitect, isLoading: deletedDataIsLoading} = useDeleteArchitect(showSuccessNotification, showErrorNotification)

    const handleDelete = (id) => {
        deleteArchitect(id)
    }

    return (
        <tr className="table__list">
            <td className="table__item">{idx+1}</td>
            <td className="table__item">
                <img src={el.images[0].url} className="table__img"
                     alt="tableImage"/>
                {el.firstname}
            </td>
            <td className="table__item">{date} </td>
            <td className="table__item">
                <Link to={`/admin/architect/${el._id}`}>
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

export default ArchitectCard;