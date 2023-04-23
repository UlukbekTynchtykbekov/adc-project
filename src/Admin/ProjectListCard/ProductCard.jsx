import React from 'react';
import {Link} from "react-router-dom";
import {useDeleteProject} from "../../CustomHooks/useProjectsData";
import {toast} from "react-toastify";

const ProductCard = ({el, idx}) => {

    const {mutate: deleteItem, data: deletedData, isLoading: deletedDataIsLoading} = useDeleteProject()

    const handleDelete = (id) => {
        deleteItem(id)
    }

    if(deletedData?.data){
        toast.success('Data deleted successfully', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <tr className="table__list">
            <td className="table__item">{idx+1}</td>
            <td className="table__item">
                <img src={el.exterior[0].url} className="table__img"
                     alt="tableImage"/>
                {el.name}
            </td>
            <td className="table__item">{el.room.quantity} комната </td>
            <td className="table__item">
                <Link to={`/admin/projects/${el._id}`}>
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

export default ProductCard;