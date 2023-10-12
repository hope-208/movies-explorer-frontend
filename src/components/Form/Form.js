import React from 'react';
import './Form.css';

function Form(props) {
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
                formTitle = 'Привет, Виталий!';
            };

    return (
        <form className={formClassName} name={props.formName} >
            <h1 className={formTitleClassName}>{formTitle}</h1>
            {props.children}
        </form>
    );
}

export default Form;
