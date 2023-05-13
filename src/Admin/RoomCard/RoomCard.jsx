import React, {useMemo} from 'react';
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import {Link} from "react-router-dom";
import {useDeleteRoom} from "../../CustomHooks/useRoomData";
import { showSuccessNotification, showErrorNotification } from "../../CustomHooks/useToast"

const RoomCard = ({el, idx}) => {
    const {data: projects} = useProjectsData();
    const {mutate: deleteRoom, isLoading: deletedDataIsLoading} = useDeleteRoom(showSuccessNotification, showErrorNotification)

    const handleDelete = (id) => {
        deleteRoom(id)
    }

    const sortedAndFilteredProjects = useMemo(() => {
        let filteredProducts = [];

        if (projects?.data) {
            filteredProducts = projects?.data.filter((project) =>
                +project.room.quantity === +el.quantity
            );
        }

        return filteredProducts;
    }, [projects?.data]);

    return (
        <tr className="table__list">
            <td className="table__item">{idx + 1}</td>
            <td className="table__item">
                {el.quantity} комната
            </td>
            <td className="table__item">{sortedAndFilteredProjects?.length} </td>
            <td className="table__item">
                <Link to={`/admin/rooms/${el._id}`}>
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

export default RoomCard;