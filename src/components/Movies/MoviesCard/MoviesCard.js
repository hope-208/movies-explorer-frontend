import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from '../../Button/Button';
import './MoviesCard.css';

function MoviesCard(props) {
    let { pathname } = useLocation();
    const [buttonClassName, setButtonClassName] = useState('button-like');

    useEffect(() => {
        if (props.defineStatusSaved === true) {
            setButtonClassName('button-like button-like_active');
        } else {
            setButtonClassName('button-like');
        }
    }, [props.defineStatusSaved]
    )

    function handleButtonSaveMovieClick() {
        props.handleClickButtonSavedMovie(props.card);
    }

    function handleButtonDeleteMovieClick() {
        props.handleDeleteMovie(props.card);
    }

    return (
        <article className="element">
            <a className="element__link" href={props.card.trailerLink} target="_blank" rel="noopener noreferrer">
                <img
                    className="element__cover"
                    src={`${pathname === "/saved-movies"
                        ? props.card.image
                        : (`https://api.nomoreparties.co/${props.card.image.url}`)
                        } `}
                    alt={props.card.nameRU}
                /></a>
            <div className="element__caption">
                <div className="element__caption-container">
                    <h2 className="element__title">{props.card.nameRU}</h2>
                    <p className="element__duration">{props.card.duration / 60 | 0}ч {props.card.duration % 60}м</p>
                </div>


                {pathname === "/movies" && props.defineStatusSaved === false && <Button buttonClassName={buttonClassName} buttonName={props.buttonName} type="button" onClick={handleButtonSaveMovieClick} />}
                {pathname === "/saved-movies" && <Button buttonClassName="button-delete" buttonName={props.buttonName} type="button" onClick={handleButtonDeleteMovieClick} />}

                {props.defineStatusSaved === true && pathname === "/movies" && <Button buttonClassName={buttonClassName} buttonName={props.buttonName} type="button" onClick={handleButtonDeleteMovieClick} />}

            </div>
        </article>
    );
}

export default MoviesCard;