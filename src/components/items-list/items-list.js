import React from 'react';
import './item-list.scss';
import {NavLink} from "react-router-dom";

const ItemsList = () => {
    const items = [
        {
            name: 'CASHES VALLEY LANE',
            cost: 500000,
            dateModify: '01.11.2018',
        },
        {
            name: 'DURUN DURUN HOUSE',
            cost: 1216000,
            dateModify: '01.11.2018',
        },
        {
            name: 'Mercedes S550 4matic',
            cost: 118000,
            dateModify: '31.10.2018',
        },
    ]

    const cols = [
        'Перечень товаров',
        'Стоимость',
        'Дата изменения',
        'Управление'
    ]

    const renderRows = items.map(item => {
        return (
            <tr >
                <td>
                    <NavLink to='#'> {item.name} </NavLink>
                </td>
                <td>{item.cost}$</td>
                <td>{item.dateModify}</td>
                <td>
                    <NavLink to='#'>Ред.</NavLink>
                </td>
                <td>
                    <NavLink to='#'>Удалить</NavLink>
                </td>
            </tr>
        )
    })

    return (
        <div className="item-list">
            <table className="table table-hover">
                <thead className=''>
                <tr>
                    <th className="first-column">Перечень товаров</th>
                    <th>Стоимость</th>
                    <th>Дата изменения</th>
                    <th>Управление</th>
                    <th></th>
                </tr>
                </thead>

                <tbody className="">
                {
                    renderRows
                }
                </tbody>
            </table>
        </div>
    )
}

export default ItemsList;