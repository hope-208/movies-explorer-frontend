import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


function SavedMovies(props) {
    return (
        <>
            <Header main={props.main} authForm={props.authForm} isLoggedIn={props.isLoggedIn} />
            <main className="main">
                <SearchForm onSubmit={props.onSubmit} isLoggedIn={props.isLoggedIn}
                    handleInput={props.handleInput} onChange={props.onChange}
                    checked={props.checked} searchString={props.searchString} />
                <MoviesCardList
                    buttonName="delete"
                    movies={props.movies}
                    isLoading={props.isLoading}
                    handleClick={props.handleClick}
                    handleDeleteMovie={props.handleDeleteMovie}
                    savedMovies={props.savedMovies}
                    messageError={props.messageError}
                    buttonShowMore={props.buttonShowMore} />
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;
