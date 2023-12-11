import React from 'react';
import './Button.css';

function Button(props) {
    return (
        <button className={props.buttonClassName} type={props.type} name={props.buttonName} onClick={props.onClick} disabled={props.disabled} >{props.buttonTitle}</button>
    );
}

export default Button;