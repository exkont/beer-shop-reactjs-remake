async function* fetchPagersData(createUrlRequest) {
    let pageRequest = 1;
    while (true) {
        let url = createUrlRequest('list', pageRequest, 20);
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

export async function getSearchingData(searchParameter, searchString, createUrlRequest) {
    let searchItems = [];
    for await (const PageData of fetchPagersData(createUrlRequest)) {
        // ревью: трудночитаемое условие.
        const isDataContainSearchingParameters = PageData[searchParameter].toLowerCase().indexOf(`${searchString.toLowerCase()}`) >= 0;
        const isUniqueItems = searchItems.find(elem => elem.id === PageData.id) === undefined;
        if (isDataContainSearchingParameters && isUniqueItems) {
            searchItems.push(PageData);
        }
    }
    searchItems = searchItems.sort((a, b) => {
        if (a[searchParameter].toLowerCase() > b[searchParameter].toLowerCase()) return 1;
        if (a[searchParameter].toLowerCase() < b[searchParameter].toLowerCase()) return -1;
        return 0;
        // return a.id - b.id;
    });
    return searchItems;
}

