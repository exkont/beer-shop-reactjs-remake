import React from "react";
import Header from "../../components/Header/Header";
import ShopItems from "../../components/ShopItems/ShopItems";
import PaginationContainer from "../../components/Pagination/PaginationConainer";

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
            <PaginationContainer data={props.data}
                                 changePage={props.changePage}
                                 page={props.page}
                                 maxCountOfPages={props.maxCountOfPages}
                                 storageArrayOfIDs={props.storageArrayOfIDs}
                                 countOfBeersPerPage={props.countOfBeersPerPage}
                                 goal={props.goal}
            />
        </div>
    )
}

export default Bucket;
