import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { allFilms } from '../../utils/initialsFilms.js';


function Movies(props) {
    return (
        <>
            <Header main={props.main} authForm={props.authForm} isLoggedIn={props.isLoggedIn} />
            <main className="main">
                <SearchForm />
                <MoviesCardList buttonName="like" buttonTitle="" movies={allFilms} />
            </main>
            <Footer />
        </>
    );
}

export default Movies;
