import React, {useState, useEffect} from "react";
import Header from "../../components/Header/Header";
import ShopItems from "../../components/ShopItems/ShopItems";
import Search from "../../components/Search/Search";
import PaginationContainer from "../../components/Pagination/PaginationConainer";

function Main(props) {

    return (
        <div>
            <Header isMain={true}/>
            <span>main</span>
            <Search searchProduct={props.searchProduct}/>
            <ShopItems shopItems={props.data}
                       changeBucketList={props.changeBucketList}
                       storageArrayOfIDs={props.storageArrayOfIDs}
                       countOfBeersPerPage={props.countOfBeersPerPage}
            />
            <PaginationContainer data={props.data}
                                 changePage={props.changePage}
                                 page={props.page}
                                 maxCountOfPages={props.maxCountOfPages}
                                 storageArrayOfIDs={props.storageArrayOfIDs}
                                 countOfBeersPerPage={props.countOfBeersPerPage}
                                 goal={props.goal}
                                 foundItems={props.foundItems}
            />
        </div>
    )
}

export default Main;
