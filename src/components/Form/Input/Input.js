import React from 'react';
import './Input.css';

function Input(props) {
    const labelClassName = props.isLoggedIn.isLoggedIn ? 'form__input-container form__input-container_edit' : 'form__input-container';
    const spanClassName = props.isLoggedIn.isLoggedIn ? 'form__label form__label_edit' : 'form__label';
    const inputClassName = props.isLoggedIn.isLoggedIn ? 'form__input form__input_edit' : 'form__input';
    return (
        <label className={labelClassName} htmlFor={props.name}>
            <span className={spanClassName}>{props.title}</span>
            <input
                id={props.name}
                name={props.name}
                type={props.type}
                className={inputClassName}
                minLength={props.minLength || null}
                maxLength={props.maxLength || null}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                disabled={props.disabled || false}
                required
            />
        </label>
    );
}

export default Input;
