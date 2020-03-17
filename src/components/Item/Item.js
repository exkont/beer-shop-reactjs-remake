import React, {useEffect, useState} from "react";
import classes from './Item.module.css';

function Item(props) {

    return (
        <div key={props.item.id}>
            <h1>{props.item.name}</h1>
            <h3>{props.item.tagline}</h3>
            <h6>{props.item.description}</h6>
            <label className={classes.containerCheckbox}>Add
                <input className={classes.containerCheckboxInput}
                       type="checkbox"
                       name={props.item.id}
                       checked={props.storageArrayOfIDs.has(props.item.id)}
                />
                <span className={classes.checkmark}/>
            </label>
        </div>
    )
}


export default Item;
