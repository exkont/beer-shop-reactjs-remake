import React, {useState, useEffect} from "react";


// ревью: плохо то что у тебя в одно компоненте находится сразу вся логика..
// тут и работа с поиском и с пагинацией, такие вещи надо разносить по разным компонентам.
//
function ShopContent(props) {

    const url = 'https://api.punkapi.com/v2/beers?';
    let [goal, setGoal] = useState(props.goal);
    let [data, setData] = useState([]);
    let [page, setPage] = useState(1);
    let [countOfPages, setCountOfPages] = useState(1);
    // где используется setMaxCountOfPages? Есмли ни где то нет смысла в useState
    const maxCountOfPages = 5;
    // тоже самое что и выше.
    const countOfBeersPerPage = 20;
    // ревью: очень сложная конструкция, лучше разделить на переменные
    // плюс сомневаюсь что тут вообще надо useState.
    let [storageArrayOfIDs, setStorageArrayOfIDs] = useState(localStorage.getItem('listOfIDs') ?
        new Set(localStorage.getItem('listOfIDs').split('|').map(e => Number(e))) : new Set([]));
    let [searchString, setSearchString] = useState('');
    let [searchParameter, setSearchParameter] = useState('');

    function changeSearchParameters(searchString, searchParameter) {
        setSearchString(searchString);
        setSearchParameter(searchParameter);
        setGoal('search');
    }

    function changeBucketList(id) {
        if (storageArrayOfIDs.has(id)) {
            setStorageArrayOfIDs(storageArrayOfIDs.delete(id));
        } else {
            setStorageArrayOfIDs(storageArrayOfIDs.add(id));
        }
        //ревью: сортировать надо только при добавлении нового элемента.. а у тебя логика работает и при удалении.
        // плюс лучше сначала взять добавить отсортировать а пото записать в state. А не два раза делать запись.
        const newStorageArrayOfIDs = new Set(([...storageArrayOfIDs].sort((a, b) => a - b)));
        setStorageArrayOfIDs(newStorageArrayOfIDs);
        localStorage.setItem('listOfIDs', `${[...newStorageArrayOfIDs].join('|')}`);
    }

    function changeCountOfPages() {
        switch (goal) {
            case 'list':
                setCountOfPages(maxCountOfPages);
                break;
            case 'bucket':
                setCountOfPages(Math.ceil(storageArrayOfIDs.size / countOfBeersPerPage));
                break;
            case 'search':
                setCountOfPages(Math.ceil(data.length / countOfBeersPerPage));
        }
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

    useEffect(() => {
        if (goal === 'list' || goal === 'bucket') {
            sendRequest(createUrlRequest(goal, page, countOfBeersPerPage)).then(data => {
                setData(data);
                changeCountOfPages();
            });
        }
        if (goal === 'search') {
            //ревью: Зачем тут самовызывающаяся фунция?
            (function searchProduct() {
                if (searchString === '' || searchParameter === '') {
                    setGoal('list');
                    setPage(1);
                    sendRequest(createUrlRequest(goal, page, countOfBeersPerPage)).then(data => {
                        changeCountOfPages();
                        setData(data);
                    });
                } else {
                    setGoal('search');
                // ревью:  функции в нутри функции лучше не объявляй, старайся боле плоскую форму кода делать.
                     async function* fetchCommits() {
                        let pageRequest = 1;
                        while (true) {
                            let url = createUrlRequest('list', pageRequest, maxCountOfPages);
                            const response = await fetch(url);
                            const answers = await response.json();
                            if (answers.length === 0) {
                                console.log('больше нет данных, удовлетворяющих поиск');
                                return;
                            }
                            pageRequest++;
                            for (let answer of answers) {
                                yield answer;
                            }
                        }
                    }

                    //ревью: самовызывающие функции не особо уместны, лучше разбивать всё на более мелкие спецэффичиские
                    (async () => {
                        let searchItems = [];
                        let countOfItemsToSkip;
                        //ревью: конструкция await выглядит странно. между проходами генератора, асинхронное действие
                        // будет только первым вызовом, остальные синхронные.
                        for await (const commit of fetchCommits()) {
                            console.log(commit)
                                // ревью: трудночитаемое условие.
                            if ((commit[searchParameter].toLowerCase().indexOf(`${searchString.toLowerCase()}`) >= 0) &&
                                (searchItems.find(elem => elem.id === commit.id) === undefined)) {
                                searchItems.push(commit);
                            }
                            if (searchItems.length >= maxCountOfPages * countOfBeersPerPage) {
                                break;
                            }
                        }
                        searchItems = searchItems.sort((a, b) => {
                            if (a[searchParameter].toLowerCase() > b[searchParameter].toLowerCase()) return 1;
                            if (a[searchParameter].toLowerCase() < b[searchParameter].toLowerCase()) return -1;
                            return 0;
                            // return a.id - b.id;
                        });
                        setCountOfPages(Math.ceil(searchItems.length / countOfBeersPerPage));
                        searchItems = searchItems.slice(countOfBeersPerPage*(page-1), countOfBeersPerPage*page);
                        setData(searchItems);
                    })()
                }
            }())
        }
    }, [page, goal, searchString, searchParameter]);

    return <props.component data={data}
                            page={page}
                            changePage={setPage}
                            countOfPages={countOfPages}
                            changeBucketList={changeBucketList}
                            storageArrayOfIDs={storageArrayOfIDs}
                            countOfBeersPerPage={countOfBeersPerPage}
                            searchProduct={changeSearchParameters}
    />;
}

export default ShopContent;
