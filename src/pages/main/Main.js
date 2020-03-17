import React, {useState, useEffect} from "react";
import Header from "../../components/Header/Header";
import ShopItems from "../../components/ShopItems/ShopItems";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";

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
            <Pagination countOfPages={props.countOfPages} changePage={props.changePage} page={props.page}/>
        </div>
    )
}

export default Main;
