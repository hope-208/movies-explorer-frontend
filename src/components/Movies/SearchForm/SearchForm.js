import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <section className="search-form" aria-label="Блок поиска фильмов.">
            <form className="search">
                <div className="search__container">
                    <input className="search__input" type="search" placeholder="Фильм" id="search" name="search" />
                    <button className="search__submit" type="submit"></button>
                </div>
                <FilterCheckbox />
            </form>
        </section>
    );
}

export default SearchForm;