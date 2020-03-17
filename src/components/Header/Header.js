import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import classes from './Header.module.css';
import bucket from '../../images/bucket.jpg';
import notBucket from '../../images/notBucket.jpg';
import Registration, {user} from "../Registration/Registration";
import RegistrationBoard from "../RegistrationBoard/RegistrationBoard";

function Header(props) {

    let [isShowPopup, setIsShowPopup] = useState(false);

    function showPopup() {
        setIsShowPopup(!isShowPopup);
    }

    return (
        <div>
            <div className={classes.header} onClick={isShowPopup ? showPopup : null}>
                <NavLink to={props.isMain ? '/bucket' : '/'} className={classes.nextSection}>
                    <div className={classes.nextSectionContent}>
                        <img src={props.isMain ? bucket : notBucket} className={classes.nextSectionContentPreview}/>
                        <h4 className={classes.nextSectionContentName}>{props.isMain ? 'Bucket' : 'Main'}</h4>
                    </div>
                </NavLink>
                <RegistrationBoard showPopup={showPopup} user={user}/>
            </div>
            <Registration isShowPopup={isShowPopup} showPopup={showPopup}/>
        </div>
    )
}

export default Header;
