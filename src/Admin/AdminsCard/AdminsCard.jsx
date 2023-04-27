import React from 'react';
import Avatar from "../../static/img/avatar.jpeg";

const AdminsCard = ({user, index}) => {
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
        </tr>
    );
};

export default AdminsCard;