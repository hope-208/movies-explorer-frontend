import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <div className="filter-checkbox">
            <input className="filter-checkbox__input" type="checkbox" name="checkbox" id="checkbox" />
            <label className="filter-checkbox__label" htmlFor="checkbox"></label>
            <span className="filter-checkbox__text">Короткометражки</span>
        </div>
    );
}

export default FilterCheckbox;