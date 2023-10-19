import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Error from '../../Form/Error/Error';
import Button from '../../Button/Button';
import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';

function SearchForm(props) {
    const [error, setError] = useState("");
    const [keyWordSearchMovie, setKeyWordSearchMovie] = useState(props.searchString);

    function handleError(evt) {
        setError(evt.target.validationMessage);
        setKeyWordSearchMovie(evt.target.value);
        props.handleInput(evt);
    }

    const handleSubmit = (evt) => {
        console.log(keyWordSearchMovie);
        evt.preventDefault();
        if (keyWordSearchMovie === '') {
            return setError("Нужно ввести ключевое слово.")
        }
        props.onSubmit();
    };
    console.log(error);
    return (
        <section className="search-form" aria-label="Блок поиска фильмов.">
            <Form formName="search" isLoggedIn={props.isLoggedIn} onSubmit={handleSubmit}>
                <div className="search__container">
                    <Input name="search" type="search" title="Введите ключевое(ые) слово(а) для поиска." placeholder="Фильм" isLoggedIn={props.isLoggedIn} onChange={handleError} value={props.searchString} />
                    <Error classNameError="form__error form__error-search" textError={error || ""} />
                    <Button buttonClassName="search__submit" type="submit" />
                </div>
                <FilterCheckbox onChange={props.onChange} checked={props.checked} />
            </Form>
        </section>
    );
}

export default SearchForm;