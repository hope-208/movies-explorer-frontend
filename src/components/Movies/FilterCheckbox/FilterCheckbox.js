import React, { useEffect, useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(Boolean(props.checked));
    }, [props.checked]);

    function handleClickCheckbox(evt) {
        props.onChange(evt);
    }

    return (
        <div className="filter-checkbox">
            <input
                className="filter-checkbox__input"
                type="checkbox"
                name="checkbox"
                id="checkbox"
                onChange={handleClickCheckbox}
                value={isChecked} />
            <label className="filter-checkbox__label" htmlFor="checkbox"></label>
            <span className="filter-checkbox__text">Короткометражки</span>
        </div>
    );
}

export default FilterCheckbox;
