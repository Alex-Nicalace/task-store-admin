import React, {useState} from "react";
import './pagination.scss'

const range = (from, to, step = 1) => {
    let pagesArr = [];
    for (let i = from; i <= to; i = i + step) {
        pagesArr.push(i);
    }
    return pagesArr
}

const Pagination = ({
                        countRow,
                        sizePage = 30,
                        currentPage,
                        onSetPage,
                        portionSize = 5
                    }) => {
    sizePage = typeof sizePage === 'number' ? sizePage : 30;
    countRow = typeof countRow === 'number' ? countRow : 0;
    portionSize = typeof portionSize === 'number' ? portionSize : 5;

    const totalPages = Math.ceil(countRow / sizePage);
    const portionCount = Math.ceil(totalPages / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = Math.min(portionNumber * portionSize, totalPages);


    let pagesArr = range(leftPortionPageNumber, rightPortionPageNumber, 1);

    const pagesRender = pagesArr.map((item, ind) =>
        <div
            key={ind}
            onClick={() => onSetPage(item)}
            className={`${item === currentPage ? 'currentPage' : ""} /*page-link*/ page `}
        >
            {item}
        </div>)

    const onChangeCurrentPortion = (step) => () => {
        setPortionNumber((portionNumber) => {
            const newPortionNumber = portionNumber + step
            return (newPortionNumber < 1 || newPortionNumber > portionCount)
                ? portionNumber
                : newPortionNumber
        });
    }

    const setCurrentPortion = (numPage) => () => {
        setPortionNumber(numPage);
        //console.log(portionNumber);
    }

    if (totalPages < 1) return null;
    return (
        <div className="my-pagination">
            <div className="my-pagination__pages">
                <div className={`page ${portionNumber <= 1 && "disable-btn"}`}
                     onClick={setCurrentPortion(1)}> |&lt;
                </div>
                <div className={`page ${portionNumber <= 1 && "disable-btn"}`}
                     onClick={onChangeCurrentPortion(-1)}> &lt;
                </div>
                {leftPortionPageNumber > currentPage
                    ? <>
                        <div className="currentPage page">{currentPage}</div>
                        <div className="page">...</div>
                    </>
                    : null
                }

                {pagesRender}

                {rightPortionPageNumber < currentPage
                    ? <>
                        <div className="page">...</div>
                        <div className="page currentPage">{currentPage}</div>
                    </>
                    : null}

                <div className={`page page ${portionNumber >= portionCount && "disable-btn"}`}
                     onClick={onChangeCurrentPortion(1)}> &gt;
                </div>
                <div className={`page ${portionNumber >= portionCount && "disable-btn"}`}
                     onClick={setCurrentPortion(portionCount)}> &gt;|
                </div>
            </div>
            <div className="my-pagination__info">
                {`страница ${currentPage} из ${totalPages}`}
            </div>


        </div>
    )
}

export default Pagination;