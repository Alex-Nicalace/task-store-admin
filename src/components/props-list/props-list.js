import React from "react";
import './props-list.scss';
import {NavLink} from "react-router-dom";

const PropsList = (props) => {
    // const propsArr = [
    //     {
    //         propName: 'Цвет авто',
    //         propType: 'Dropdown',
    //     },
    //     {
    //         propName: 'Год выпуска',
    //         propType: 'Number',
    //     },
    //     {
    //         propName: 'Тип топлива',
    //         propType: 'String',
    //     },
    // ]

    const { propsArr } = props;

    const renderRows = propsArr.map(item => {
        return (
            <tr key={item.id} >
                <td>{item.propName}</td>
                <td>{item.propType}</td>
                <td><NavLink to='#'>Удалить</NavLink></td>
            </tr>
        )
    })

    return (
        <div className="props-list">
            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="first-column">Свойство</th>
                    <th>Тип</th>
                    <th>Управление</th>
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

export default PropsList;