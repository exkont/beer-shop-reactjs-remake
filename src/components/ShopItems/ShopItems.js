import React, {useEffect, useState} from "react";
import classes from './ShopItems.module.css';
import Item from "../Item/Item";

function ShopItems(props) {
    const [items, setItems] = useState(props.shopItems);

    function changeBucketItem(elem) {
        const target = elem.target;
        if (target.tagName === 'INPUT') {
            props.changeBucketList(Number(target.name));
        }
    }

    useEffect(() => {
        if (props.shopItems) {
            let countOfBeersPerPage = 0;
            let itemsArr = [];
            //ревью: нет смысла в map тут, лучше просто for.
            for (let i = 0; i < props.shopItems.length; i++) {
                if (countOfBeersPerPage < props.countOfBeersPerPage) {
                    countOfBeersPerPage++;
                    // ревью: лучше вынести это в отдельный комопнент, который отвечает чисто только за представление.
                    itemsArr.push(<Item item={props.shopItems[i]} storageArrayOfIDs={props.storageArrayOfIDs}/>);
                }
            }
            setItems(<div onClick={changeBucketItem}>{itemsArr}</div>);
        }
    }, [props.shopItems, props.storageArrayOfIDs]);

    return items;
}


export default ShopItems;
