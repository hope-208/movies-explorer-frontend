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
        //     console.log(movie);
        //     console.log(props.savedMovies);

        return props.savedMovies.some((card) => {
            // console.log(card);

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

                {props.isLoading ? <Preloader /> : ((props.movies.length === 0)
                    ? (<p className="elements__span">{props.messageError}</p>)
                    : (props.movies.slice(0, moviesList).map((card) => (
                        <MoviesCard
                            key={`${pathname === "/saved-movies" ? card._id : card.id}`}
                            card={card}
                            handleClickButtonSavedMovie={props.handleClickButtonSavedMovie}
                            handleDeleteMovie={props.handleDeleteMovie}
                            defineStatusSaved={defineStatusSaved(card)}
                        />
                    ))))
                }


            </section>
            {(props.buttonShowMore && props.movies.length > moviesList)
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
