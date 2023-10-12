import React from 'react';
import './Error.css';

function Error(props) {
    return (
        <span className="form__error">{props.textError}</span>
    );
}

export default Error;
