import React from 'react';
import './Form.css';

function Form(props) {
    let formClassName = props.isLoggedIn.isLoggedIn ? 'form form_edit' : 'form';
    let formTitleClassName = props.isLoggedIn.isLoggedIn ? 'form__title form__title_edit' : 'form__title';

    return (
        <form
            className={props.formName !== 'search' ? formClassName : 'search'}
            name={props.formName}
            onSubmit={props.onSubmit}>
            {props.formName !== 'search' && (<h1 className={formTitleClassName}>{props.formTitle}</h1>)}
            {props.children}
        </form>
    );
}

export default Form;
