import { useState } from 'react';
import Button from '../../Button/Button';
import './MoviesCard.css';

function MoviesCard(props) {

    const [isLiked, setIsLiked] = useState(props.card.isLiked);
    const cardLikeButtonClassName = `button-like ${isLiked && 'button-like_active'
        }`;

    function handleLikeClick() {
        setIsLiked(!isLiked);
    }

    function handleDeleteClick() {
    }

    return (
        <article className="element">
            <img
                className="element__cover"
                src={props.card.image}
                alt={props.card.nameRU}
            />
            <div className="element__caption">
                <div className="element__caption-container">
                    <h2 className="element__title">{props.card.nameRU}</h2>
                    <p className="element__duration">{props.card.duration / 60 | 0}ч {props.card.duration % 60}м</p>
                </div>
                <Button buttonClassName={props.buttonName === 'like' ? cardLikeButtonClassName : props.buttonClassName} buttonName={props.buttonName} buttonTitle={props.buttonTitle} onClick={() => { props.buttonName === 'like' ? handleLikeClick() : handleDeleteClick() }} />
            </div>
        </article>
    );
}

export default MoviesCard;