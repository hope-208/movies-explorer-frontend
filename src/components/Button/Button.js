import React from 'react';
import './Button.css';

function Button(props) {
    return (
        <>
            <button className={props.buttonClassName} type="button" name={props.buttonName} onClick={props.onClick}>{props.buttonTitle}</button>
        </>
    );
}

export default Button;