import React from 'react';
import { useLocation } from "react-router-dom";
import './MoviesCardList.css';
import Preloader from '../../Preloader/Preloader.js';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../../Button/Button';
import { useDefineWindowWidth, useSizeMoviesList } from '../../../utils/SizeMoviesList.js';

function MoviesCardList(props) {
    let { pathname } = useLocation();
    const windowWidth = useDefineWindowWidth();
    const { movies: moviesList, useHandleClickShowMore: handleClickShowMore } = useSizeMoviesList(windowWidth);

    function defineStatusSaved(movie) {
        return props.savedMovies.some((card) => {
            if (card.movieId === movie.id) {
                movie._id = card._id;
                return true;
            } else {
                return false;
            }
        });
    }


    return (
        <>
            <section className="elements" aria-label="Фильмы.">

                {props.isLoading
                    ? <Preloader />
                    : (
                        (props.movies.length === 0)
                            ? (<p className="elements__span">{props.messageError}</p>)
                            : (pathname === "/movies"
                                ? (props.movies.slice(0, moviesList).map((card) =>
                                (
                                    <MoviesCard
                                        key={card.id}
                                        card={card}
                                        handleClickButtonSavedMovie={props.handleClickButtonSavedMovie}
                                        handleDeleteMovie={props.handleDeleteMovie}
                                        defineStatusSaved={defineStatusSaved(card)}
                                    />
                                )
                                ))
                                : (
                                    props.movies.map((card) =>
                                    (
                                        <MoviesCard
                                            key={card._id}
                                            card={card}
                                            handleClickButtonSavedMovie={props.handleClickButtonSavedMovie}
                                            handleDeleteMovie={props.handleDeleteMovie}
                                            defineStatusSaved={defineStatusSaved(card)}
                                        />
                                    )
                                    ))
                            ))}

            </section>
            {(pathname === "/movies" && props.movies.length > moviesList)
                && (<Button
                    buttonClassName="button-more"
                    buttonName="more"
                    buttonTitle="Ещё"
                    onClick={handleClickShowMore} />)

            }
        </>
    );
}

export default MoviesCardList;
