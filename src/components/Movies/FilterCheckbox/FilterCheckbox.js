import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
    const [isChecked, setIsChecked] = useState(Boolean(props.checked) || false);
    function handleClickCheckbox(evt) {
        props.onChange(evt);
        setIsChecked(evt.target.checked);
    }

    // useEffect(() => {
    //     setIsChecked(Boolean(props.checked));
    // }, [props.checked])

    return (
        <div className="filter-checkbox">
            <input
                className="filter-checkbox__input"
                type="checkbox"
                name="checkbox"
                id="checkbox"
                defaultChecked={isChecked || false}
                onChange={handleClickCheckbox} />
            <label className="filter-checkbox__label" htmlFor="checkbox"></label>
            <span className="filter-checkbox__text">Короткометражки</span>
        </div>
    );
}

export default FilterCheckbox;
