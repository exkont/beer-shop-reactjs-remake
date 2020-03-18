import React, {useState, useEffect} from "react";
import {getSearchingData} from './SearchFunction';

// ревью: плохо то что у тебя в одно компоненте находится сразу вся логика..
// тут и работа с поиском и с пагинацией, такие вещи надо разносить по разным компонентам.
//
function ShopContent(props) {

    const url = 'https://api.punkapi.com/v2/beers?';
    let [goal, setGoal] = useState(props.goal);
    let [data, setData] = useState([]);
    let [page, setPage] = useState(1);
    let [foundItems, setFoundItems] = useState();
    // где используется setMaxCountOfPages? Есмли ни где то нет смысла в useState
    const maxCountOfPages = 5;
    // тоже самое что и выше.
    const countOfBeersPerPage = 20;
    // ревью: очень сложная конструкция, лучше разделить на переменные
    // плюс сомневаюсь что тут вообще надо useState.
    const listOfIDsLocalStorage = localStorage.getItem('listOfIDs');
    let [storageArrayOfIDs, setStorageArrayOfIDs] = useState(listOfIDsLocalStorage ?
        new Set(listOfIDsLocalStorage.split('|').map(e => Number(e))) : new Set([]));
    let [searchString, setSearchString] = useState('');
    let [searchParameter, setSearchParameter] = useState('');

    function changeSearchParameters(searchString, searchParameter) {
        setSearchString(searchString);
        setSearchParameter(searchParameter);
        setGoal('search');
    }

    function changeBucketList(id) {
        if (storageArrayOfIDs.has(id)) {
            storageArrayOfIDs.delete(id);
        } else {
            storageArrayOfIDs.add(id);
            storageArrayOfIDs = new Set(([...storageArrayOfIDs].sort((a, b) => a - b)));
        }
        //ревью: сортировать надо только при добавлении нового элемента.. а у тебя логика работает и при удалении.
        // плюс лучше сначала взять добавить отсортировать а пото записать в state. А не два раза делать запись.
        setStorageArrayOfIDs(new Set([...storageArrayOfIDs]));
        localStorage.setItem('listOfIDs', `${[...storageArrayOfIDs].join('|')}`);
    }

    const sendRequest = (url) => {
        return fetch(url).then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(error => {
                const err = new Error('Something wrong');
                err.data = error;
                throw err;
            });
        });
    };

    const createUrlRequest = (goal, page, countOfBeersPerPage) => {
        switch (goal) {
            case 'list':
                return url + 'page=' + page + '&per_page=' + countOfBeersPerPage;
            case 'bucket':
                if (localStorage.getItem('listOfIDs')) {
                    return url + 'ids=' + localStorage.getItem('listOfIDs').split('|')
                        .slice(countOfBeersPerPage * (page - 1)).join('|');
                } else {
                    return url + 'ids=';
                }
        }
    };

    function searchProduct() {
        if (searchString === '' || searchParameter === '') {
            setGoal('list');
            setPage(1);
            sendRequest(createUrlRequest(goal, page, countOfBeersPerPage)).then(data => {
                setData(data);
            });
        } else {
            setGoal('search');
            //ревью: самовызывающие функции не особо уместны, лучше разбивать всё на более мелкие спецэффичиские
            getSearchingData(searchParameter, searchString, createUrlRequest).then(searchItems => {
                setFoundItems([...searchItems]);
                searchItems = searchItems.slice(countOfBeersPerPage * (page - 1), countOfBeersPerPage * page);
                setData(searchItems);
            });
        }
    }

    useEffect(() => {
        if (goal === 'list' || goal === 'bucket') {
            sendRequest(createUrlRequest(goal, page, countOfBeersPerPage)).then(data => {
                setData(data);
            });
        }
        if (goal === 'search') {
            searchProduct();
        }
    }, [page, goal, searchString, searchParameter]);

    return <props.component data={data}
                            page={page}
                            goal={goal}
                            changePage={setPage}
                            changeBucketList={changeBucketList}
                            storageArrayOfIDs={storageArrayOfIDs}
                            countOfBeersPerPage={countOfBeersPerPage}
                            searchProduct={changeSearchParameters}
                            maxCountOfPages={maxCountOfPages}
                            foundItems={foundItems}
    />;
}

export default ShopContent;
