import React from "react";
import classes from './Search.module.css';

function Search(props) {

    // ревью: рефами лучше сильно не увлекаться, если есть возможность сделать без них, лучше без них.
    const searchStringInput = React.createRef();
    const radioButtons = Array.from(document.getElementsByClassName(`${classes.formRadioBtnBtn}`));

    function sendSearchParameters(elem) {
        let searchString = '';
        let searchParameter = '';
        const target = elem.target;
        if (target.tagName === 'LABEL') {
            const checkedElem = radioButtons.find(el => el.value === target.innerHTML);
            checkedElem.checked = true;
        }
        if (target.tagName === 'LABEL' || target.tagName === 'INPUT') {
            //ревью: return можно убрать просто ставив el.current.checked после =>
            const checkedElem = radioButtons.find(el => el.checked);
            //ревью: сравнение с Undefined не обязательно, тут сработает приведение типов.
            searchParameter = checkedElem ? checkedElem.value : '';
            searchString = searchStringInput.current.value;
        }
        if (searchString || searchParameter) {
            props.searchProduct(searchString, searchParameter);
        }
    }

    return (
        <div className={classes.findingSection} onClick={sendSearchParameters} onChange={sendSearchParameters}>
            // ревью: это всё можно сделать через цикл.
            {
                ['name', 'tagline', 'description'].map((value, index) => {
                    return (
                        <div className={classes.formRadioBtn} key={index}>
                            <input className={classes.formRadioBtnBtn} type="radio" name="radio" value={value}/>
                            <label htmlFor="">{value}</label>
                        </div>
                    )
                })
            }
            <label className={classes.searchString}>Search
                <input type="text" className={classes.searchStringInput} ref={searchStringInput} name="searchString"/>
            </label>
        </div>
    )
}

export default Search;
