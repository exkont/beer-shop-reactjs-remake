import React, {useEffect, useState} from "react";
import Pagination from "./Pagination";

function PaginationContainer(props) {

    let [countOfPages, setCountOfPages] = useState(1);

    useEffect(() => {
        if (props.data) {
            switch (props.goal) {
                case 'list':
                    setCountOfPages(props.maxCountOfPages);
                    break;
                case 'bucket':
                    setCountOfPages(Math.ceil(props.storageArrayOfIDs.size / props.countOfBeersPerPage));
                    break;
                case 'search':
                    setCountOfPages(Math.ceil(props.foundItems.length / props.countOfBeersPerPage));
            }
        }
    }, [props.foundItems, props.storageArrayOfIDs, props.data]);

    return (
        <Pagination countOfPages={countOfPages} changePage={props.changePage} page={props.page}/>
    )
}

export default PaginationContainer;
