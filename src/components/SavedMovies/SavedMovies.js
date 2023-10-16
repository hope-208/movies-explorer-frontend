import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { allFilms } from '../../utils/initialsFilms.js';


function SavedMovies(props) {
    const savedFilms = allFilms.filter(function (film) {
        if (film.isLiked) {
            return true;
        } else {
            return false;
        }
    });
    return (
        <>
            <Header main={props.main} authForm={props.authForm} isLoggedIn={props.isLoggedIn} />
            <main className="main">
                <SearchForm />
                <MoviesCardList buttonName="delete" buttonTitle="" movies={savedFilms} />
            </main>
            <Footer />

        </>
    );
}

export default SavedMovies;
