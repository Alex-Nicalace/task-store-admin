import React from 'react';
import './items-list.scss';
import {NavLink} from "react-router-dom";
import SearchPanel from "../search-panel";
import Pagination from "../pagination";

const ItemsList = ({
                       items,
                       itemDelete,
                       setSortedFieldHandle,
                       sorted,
                       changeSearchHandle,
                       pageCurrent,
                       pagePortionSize,
                       pageSize,
                       countRow,
                       setPageHandler
                   }) => {
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
                    <span className="as-link" onClick={() => itemDelete(item.id)}>Удалить</span>
                </td>
            </tr>
        )
    })

    const markSorted = (fName) => {
        if (fName === sorted.sortedField)
            return <i className={`fa fa-fw fa-sort${sorted.sortDesc ? '-desc' : '-asc'}`}> </i>
    }

    return (
        <div className="item-list">
            <div className="search-panel">
                <SearchPanel changeSearchHandle={changeSearchHandle}/>
            </div>

            <table className="table table-hover table-sortable">
                <thead>
                <tr>
                    <th onClick={() => setSortedFieldHandle('name', false)}
                        className="first-column th-pointer">{markSorted('name')}Перечень товаров
                    </th>
                    <th className="th-pointer"
                        onClick={() => setSortedFieldHandle('cost', true)}>{markSorted('cost')}Стоимость
                    </th>
                    <th className="th-pointer"
                        onClick={() => setSortedFieldHandle('dateModify', true)}>{markSorted('dateModify')}Дата
                        изменения
                    </th>
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

            <Pagination countRow={countRow} currentPage={pageCurrent} onSetPage={setPageHandler}
                        portionSize={pagePortionSize} sizePage={pageSize}/>
        </div>
    )
}

export default ItemsList;
