import React from "react";
import classes from './Pagination.module.css';

function Pagination(props) {
    let pages = [];
    let pagination = Array.prototype.slice.call(document.getElementsByClassName(`${classes.paginationNextPage}`));
    for (let i = 1; i <= props.countOfPages; i++) {
        if (i === props.page) {
            pages.push(
                <a className={classes.paginationNextPageActive + ' ' + classes.paginationNextPage} key={i}>{i}</a>
            )
        } else {
            pages.push(
                <a className={classes.paginationNextPage} key={i}>{i}</a>
            )
        }
    }

    function changePage(elem) {
        const target = elem.target;
        if (target.tagName === 'A') {
            props.changePage(Number(target.innerHTML));
            pagination.forEach(el => {
                el.className = classes.paginationNextPage;
            });
            // ревью: можно использовать шаблонные строки.
            target.className = `${classes.paginationNextPageActive} ${classes.paginationNextPage}`;
        }
    }

    return (
        <div className={classes.pagination} onClick={changePage}>
            {pages}
        </div>
    )
}

export default Pagination;
