import React from "react";
import Header from "../../components/Header/Header";
import ShopItems from "../../components/ShopItems/ShopItems";
import Pagination from "../../components/Pagination/Pagination";

function Bucket(props) {
    return (
        <div>
            <Header isMain={false}/>
            <span>bucket</span>
            <ShopItems shopItems={props.data}
                       changeBucketList={props.changeBucketList}
                       storageArrayOfIDs={props.storageArrayOfIDs}
                       countOfBeersPerPage={props.countOfBeersPerPage}
            />
            <Pagination countOfPages={props.countOfPages} changePage={props.changePage} page={props.page}/>
        </div>
    )
}

export default Bucket;
