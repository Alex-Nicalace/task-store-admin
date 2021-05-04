import React from "react";
import './props-list.scss';

const PropsList = ({ propsArr, delProp }) => {

    const renderRows = propsArr.map(item => {
        return (
            <tr key={item.id} >
                <td>{item.propName}</td>
                <td>{item.propType}</td>
                <td><span className="as-link" onClick={() => delProp(item.id)} >Удалить</span></td>
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