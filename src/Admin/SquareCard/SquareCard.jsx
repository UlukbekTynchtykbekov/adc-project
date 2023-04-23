import React, {useMemo} from 'react';
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {useDeleteSquare} from "../../CustomHooks/useSquareData";

const SquareCard = ({el, idx}) => {
    const {data: projects} = useProjectsData();
    const {mutate: deleteSquare, data: deletedData, isLoading: deletedDataIsLoading} = useDeleteSquare()

    const handleDelete = (id) => {
        deleteSquare(id)
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

    const sortedAndFilteredProjects = useMemo(() => {
        let filteredProducts = [];

        if (projects?.data) {
            filteredProducts = projects?.data.filter((project) =>
                +project.square.square === +el.square
            );
        }

        return filteredProducts;
    }, [projects?.data]);

    return (
        <tr className="table__list">
            <td className="table__item">{idx + 1}</td>
            <td className="table__item">
                {el.square} м2
            </td>
            <td className="table__item">{sortedAndFilteredProjects?.length} </td>
            <td className="table__item">
                <Link to={`/admin/square/${el._id}`}>
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

export default SquareCard;