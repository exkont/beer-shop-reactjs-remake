import React, {useEffect, useState} from "react";
import classes from './ShopItems.module.css';

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
            setItems(
                //ревью: нет смысла в map тут, лучше просто for.
                props.shopItems.map(item => {
                    if (countOfBeersPerPage < props.countOfBeersPerPage) {
                        countOfBeersPerPage++;
                        return (
                            // ревью: лучше вынести это в отдельный комопнент, который отвечает чисто только за представление.
                            <div key={item.id} onClick={changeBucketItem}>
                                <h1>{item.name}</h1>
                                <h3>{item.tagline}</h3>
                                <h6>{item.description}</h6>
                                <label className={classes.containerCheckbox}>Add
                                    <input className={classes.containerCheckboxInput}
                                           type="checkbox"
                                           name={item.id}
                                           checked={props.storageArrayOfIDs.has(item.id)}
                                    />
                                    <span className={classes.checkmark}/>
                                </label>
                            </div>
                        )
                    }
                })
            );
        }
    }, [props.shopItems, props.storageArrayOfIDs]);

    return items;
}


export default ShopItems;
