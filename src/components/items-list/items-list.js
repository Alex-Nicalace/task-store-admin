import React from 'react';
import './items-list.scss';
import {NavLink} from "react-router-dom";

const ItemsList = (props) => {
    // const items = [
    //     {
    //         name: 'CASHES VALLEY LANE',
    //         cost: 500000,
    //         dateModify: '01.11.2018',
    //     },
    //     {
    //         name: 'DURUN DURUN HOUSE',
    //         cost: 1216000,
    //         dateModify: '01.11.2018',
    //     },
    //     {
    //         name: 'Mercedes S550 4matic',
    //         cost: 118000,
    //         dateModify: '31.10.2018',
    //     },
    // ]

    const { items, itemDelete } = props;

    const renderRows = items.map(item => {
        return (
            <tr key={item.id}>
                <td>
                    <NavLink to={`/item-card/${item.id}`}> {item.name} </NavLink>
                </td>
                <td>{item.cost}$</td>
                <td>{new Date(item.dateModify).toLocaleString()}</td>
                <td>
                    <NavLink to={`/item-edit/${item.id}`}>Ред.</NavLink>
                </td>
                <td>
                    <NavLink onClick={() => itemDelete(item.id)} to='#'>Удалить</NavLink>
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
