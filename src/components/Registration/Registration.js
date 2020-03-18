import React, {useState} from "react";
import classes from "./Registration.module.css";

export const user = {
    name: '',
    secondName: ''
};

function Registration(props) {

    const popupRegistration = React.createRef();
    const submitButton = React.createRef();
    const validatorsData = {
        emailValidator: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        errorFields: document.getElementsByClassName(`${classes.registrationForm__textError}`)
    };
    const registrationInputs = document.getElementsByClassName(`${classes.registrationFormInput}`);

    function showPopup(elem) {
        const target = elem.target;
        if (target.className === `${classes.wrapperPopupRegistration}` ||
            target.className === `${classes.popupRegistration__cross}`) {
            props.showPopup();
            elem.preventDefault();
        }
    }

    function setClassForValidate(elem) {
        elem.target.classList.add('touched');
        validate(elem.target);
    }

    function validate(validatingElem) {
        switch (validatingElem.name) {
            case 'email':
                if (!validatorsData.emailValidator.test(validatingElem.value.toLowerCase())) {
                    validatingElem.nextSibling.innerHTML = 'you entered incorrect email';
                } else {
                    validatingElem.nextSibling.innerHTML = '';
                }
                break;
            case 'password':
            case 'password-repeat':
                if (validatingElem.value.length < 7) {
                    validatingElem.nextSibling.innerHTML = 'password must be more than 6 symbols';
                } else {
                    validatingElem.nextSibling.innerHTML = '';
                }
                break;
            case 'first-name':
            case 'last-name':
                if (validatingElem.value.length < 5) {
                    validatingElem.nextSibling.innerHTML = 'your name must be longer than 5 symbols';
                } else {
                    validatingElem.nextSibling.innerHTML = '';
                }
                break;
            case 'date':
                if (validatingElem.value === '') {
                    validatingElem.nextSibling.innerHTML = 'you didn\'t chose date';
                } else {
                    validatingElem.nextSibling.innerHTML = '';
                }
        }
        if (registrationInputs[1].className.indexOf('touched') !== -1 &&
            registrationInputs[2].className.indexOf('touched') !== -1) {
            isFieldsHaveEqualValue(registrationInputs[1], registrationInputs[2]);
        }
        submitButton.current.disabled = !isCorrectForm();
    }

    function isFieldsHaveEqualValue(elem1, elem2) {
        switch (elem1.name) {
            case 'password':
            case 'password-repeat':
                if (elem1.value !== elem2.value) {
                    if (elem1.nextSibling.innerHTML === '' || elem1.nextSibling.innerHTML === 'passwords are not equal') {
                        elem1.nextSibling.innerHTML = 'passwords are not equal';
                    } else {
                        elem1.nextSibling.innerHTML = 'password must be more than 6 symbols and passwords are not equal';
                    }
                    if (elem2.nextSibling.innerHTML === '' || elem2.nextSibling.innerHTML === 'passwords are not equal') {
                        elem2.nextSibling.innerHTML = 'passwords are not equal';
                    } else {
                        elem2.nextSibling.innerHTML = 'password must be more than 6 symbols and passwords are not equal';
                    }
                } else {
                    elem1.nextSibling.innerHTML = '';
                    elem2.nextSibling.innerHTML = '';
                }
        }
    }

    function isCorrectForm() {
        for (let i = 0; i < registrationInputs.length; i++) {
            if ((registrationInputs[i].value === '') || (validatorsData.errorFields[i].innerHTML !== '')) {
                return false;
            }
        }
        return true;
    }

    function registerUser() {
        props.showPopup();
        user.name = registrationInputs[3];
        user.secondName = registrationInputs[4];
    }

    if (props.isShowPopup) {
        return (

            // ревью  выглядит избыточным сразу несколько последовательных вложений в одним и тем же обработчиком.
            <div onClick={showPopup}>
                <div className={classes.wrapperPopupRegistration}>

                </div>
                <div className={classes.popupRegistration} ref={popupRegistration}>
                    <a href=""><span className={classes.popupRegistration__cross}>x</span></a>
                    <form action="" className={classes.registrationForm} onChange={setClassForValidate}>
                        // ревью: элементы формы можно разбить на отдельные компоненты со своими валидаторами и всем
                        таким прочим.
                        <h1 className=''>Registration form</h1>
                        <label htmlFor="email" className=''>
                            Email
                        </label>
                        <input name="email" type="text" className={classes.registrationFormInput}/>
                        <span className={classes.registrationForm__textError}></span>
                        <br/>
                        <label htmlFor="password" className=''>
                            Password
                        </label>
                        <input name="password" type="password" className={classes.registrationFormInput}/>
                        <span className={classes.registrationForm__textError}></span>
                        <br/>
                        <label htmlFor="password-repeat" className=''>
                            Password repeat
                        </label>
                        <input name="password-repeat" type="password" className={classes.registrationFormInput}/>
                        <span className={classes.registrationForm__textError}></span>
                        <br/>
                        <label htmlFor="first-name" className=''>
                            First Name
                        </label>
                        <input name="first-name" type="text" className={classes.registrationFormInput}/>
                        <span className={classes.registrationForm__textError}></span>
                        <br/>
                        <label htmlFor="last-name" className=''>
                            Last Name
                        </label>
                        <input name="last-name" type="text" className={classes.registrationFormInput}/>
                        <span className={classes.registrationForm__textError}></span>
                        <br/>
                        <label htmlFor="password-repeat" className=''>
                            Birthday
                        </label>
                        <input name="date" type="date" className={classes.registrationFormInput}/>
                        <span className={classes.registrationForm__textError}></span>
                        <br/>
                        <button ref={submitButton}
                                type="button"
                                className={classes.registrationForm__buttonSubmit}
                                onClick={registerUser}
                        >Registration
                        </button>
                    </form>
                </div>
            </div>
        )
    } else {
        return <span></span>
    }
}

export default Registration;
