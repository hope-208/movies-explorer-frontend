import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props) {
    return (
        <>
            <Header main={props.main} authForm={props.authForm} isLoggedIn={props.isLoggedIn} />
            <main className="main">
                <SearchForm onSubmit={props.onSubmit} isLoggedIn={props.isLoggedIn}
                    handleInput={props.handleInput} onChange={props.onChange}
                    checked={props.checked} searchString={props.searchString} />
                <MoviesCardList buttonName="like" movies={props.movies}
                    savedMovies={props.savedMovies}
                    isLoading={props.isLoading}
                    handleClickButtonSavedMovie={props.handleClickButtonSavedMovie}
                    handleDeleteMovie={props.handleDeleteMovie}
                    messageError={props.messageError}
                    buttonShowMore={props.buttonShowMore} />
            </main>
            <Footer />
        </>
    );
}

export default Movies;
