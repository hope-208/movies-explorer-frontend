import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { allFilms } from '../../utils/initialsFilms.js';


function Movies() {

    return (
        <>
            <SearchForm />
            <MoviesCardList buttonName="like" buttonTitle="" movies={allFilms} />
        </>
    );
}

export default Movies;
