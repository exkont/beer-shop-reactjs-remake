import React from "react";
import classes from './Search.module.css';

function Search(props) {

    // ревью: рефами лучше сильно не увлекаться, если есть возможность сделать без них, лучше без них.
    const radioName = React.createRef();
    const radioTagline = React.createRef();
    const radioDescription = React.createRef();
    const radioButtons = [radioName, radioTagline, radioDescription];
    const searchStringInput = React.createRef();

    function sendSearchParameters(elem) {
        let searchString = '';
        let searchParameter = '';
        const target = elem.target;
        if (target.tagName === 'LABEL') {
            const checkedElem = radioButtons.find(el => {
                return el.current.value === target.innerHTML;
            });
            checkedElem.current.checked = true;
        }
        if (target.tagName === 'LABEL' || target.tagName === 'INPUT') {
            //ревью: return можно убрать просто ставив el.current.checked после =>
            const checkedElem = radioButtons.find(el => el.current.checked);
            //ревью: сравнение с Undefined не обязательно, тут сработает приведение типов.
            searchParameter = checkedElem ? checkedElem.current.value : '';
            searchString = searchStringInput.current.value;
        }
        if (searchString || searchParameter) {
            props.searchProduct(searchString, searchParameter);
        }
    }

    return (
        <div className={classes.findingSection} onClick={sendSearchParameters} onChange={sendSearchParameters}>
            // ревью: это всё можно сделать через цикл.
            <div className={classes.formRadioBtn}>
                <input className={classes.formRadioBtnBtn} ref={radioName} type="radio" name="radio" value="name"/>
                <label htmlFor="">name</label>
            </div>
            <div className={classes.formRadioBtn}>
                <input className={classes.formRadioBtnBtn} ref={radioTagline} type="radio" name="radio"
                       value="tagline"/>
                <label htmlFor="">tagline</label>
            </div>
            <div className={classes.formRadioBtn}>
                <input className={classes.formRadioBtnBtn} ref={radioDescription} type="radio" name="radio"
                       value="description"/>
                <label htmlFor="">description</label>
            </div>
            <label className={classes.searchString}>Search
                <input type="text" className={classes.searchStringInput} ref={searchStringInput} name="searchString"/>
            </label>
        </div>
    )
}

export default Search;
