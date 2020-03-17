import React, {useState} from "react";
import classes from "./RegistrationBoard.module.css";

function RegistrationBoard(props) {
    let [user, setUser] = useState(props.user);


    // ревью: лишняя функция.
    function showPopup() {
        props.showPopup();
    }

    return <button onClick={showPopup}
                   className={classes.registrationButton}>
        {props.user.name ? `${props.user.name.value + ' ' + props.user.secondName.value}` : 'registration'}
    </button>
}

export default RegistrationBoard;
