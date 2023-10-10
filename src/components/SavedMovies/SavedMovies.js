import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { allFilms } from '../../utils/initialsFilms.js';


function SavedMovies() {
    const savedFilms = allFilms.filter(function (film) {
        if (film.isLiked) {
            return true;
        } else {
            return false;
        }
    });
    return (
        <>
            <SearchForm />
            <MoviesCardList buttonName="delete" buttonTitle="" movies={savedFilms} />
        </>
    );
}

export default SavedMovies;
