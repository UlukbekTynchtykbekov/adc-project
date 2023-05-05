import React from 'react';
import Avatar from "../../static/img/avatar.jpeg";
import {Link} from "react-router-dom";

const UserCard = ({user, index}) => {
    return (
        <tr className="table__list">
            <td className="table__item">
                {index+1}
            </td>
            <td className="table__item">
                <img src={Avatar} className="table__img"
                     alt="tableImage"/>
                {user.firstName}
            </td>
            <td className="table__item">
                {user.lastName}
            </td>
            <td className="table__item">
                {user.email}
            </td>
            <td className="table__item">
                <Link to={`/admin/users/${user._id}`}>
                    <button className="table__button product__table-btn">
                        Показывать
                    </button>
                </Link>
            </td>
        </tr>
    );
};

export default UserCard;