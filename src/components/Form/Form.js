import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import './Form.css';

function Form(props) {
    const currentUser = useContext(CurrentUserContext);
    let formClassName = props.isLoggedIn.isLoggedIn ? 'form form_edit' : 'form';
    let formTitleClassName = props.isLoggedIn.isLoggedIn ? 'form__title form__title_edit' : 'form__title';
    let formTitle;
    if (props.formName === 'register') {
        formTitle = 'Добро пожаловать!';
    } else
        if (props.formName === 'login') {
            formTitle = 'Рады видеть!';
        } else
            if (props.formName === 'profile') {
                formTitle = `Привет, ${currentUser.name}!`;
            };

    return (
        <form
            className={props.formName !== 'search' ? formClassName : 'search'}
            name={props.formName}
            onSubmit={props.onSubmit} >
            {props.formName !== 'search' && (<h1 className={formTitleClassName}>{formTitle}</h1>)}
            {props.children}
        </form>
    );
}

export default Form;
