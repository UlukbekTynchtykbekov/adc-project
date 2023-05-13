import React, {useMemo} from 'react';
import {Link} from "react-router-dom";
import ArchitectureHouse from '../../static/img/free-3-bedroom-house-plans.jpeg'
import DesignHouse from '../../static/img/designCategory.jpeg'
import {useProjectsData} from "../../CustomHooks/useProjectsData";
import {useDeleteCategory} from "../../CustomHooks/useCategoriesData";
import { showSuccessNotification, showErrorNotification} from  "../../CustomHooks/useToast"

const CategoryCard = ({el, idx, alreadyHave}) => {

    const {data: projects} = useProjectsData();
    const {mutate: deleteCategory, isLoading: deletedDataIsLoading} = useDeleteCategory(showSuccessNotification, showErrorNotification)

    const handleDelete = (id) => {
        deleteCategory(id)
    }

    const sortedAndFilteredProjects = useMemo(() => {
        let filteredProducts = [];

        if (projects?.data) {
            filteredProducts = projects?.data.filter((project) =>
                project.category.name.toLowerCase() === el.name.toLowerCase()
            );
        }

        return filteredProducts;
    }, [projects?.data]);

    return (
        <tr className="table__list">
            <td className="table__item">{idx + 1}</td>
            <td className="table__item">
                {
                    el.name === "architecture" && <img src={ArchitectureHouse} className="table__img"
                                                       alt="tableImage"/>
                }
                {
                    el.name === "design" && <img src={DesignHouse} className="table__img"
                                                 alt="tableImage"/>
                }
                {el.name}
            </td>
            <td className="table__item">{sortedAndFilteredProjects.length} </td>
            <td className="table__item">
                <Link to={`/admin/categories/${el._id}`}>
                    <button className={alreadyHave ? "table__button product__table-non" : "table__button product__table-btn"} disabled={alreadyHave}>
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

export default CategoryCard;