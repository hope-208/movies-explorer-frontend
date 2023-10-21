import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
    return (
        <div className="filter-checkbox">
            <input
                className="filter-checkbox__input"
                type="checkbox"
                name="checkbox"
                id="checkbox"
                onChange={props.onChange}
                checked={props.checked} />
            <label className="filter-checkbox__label" htmlFor="checkbox"></label>
            <span className="filter-checkbox__text">Короткометражки</span>
        </div>
    );
}

export default FilterCheckbox;