import React, { useState } from 'react';
import './MoviesCardList.css';
import Preloader from '../../Preloader/Preloader.js';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../../Button/Button';

function MoviesCardList(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonShow, setIsButtonShow] = useState(true);

    const handleClickShowMore = () => {
        setIsButtonShow(false);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    return (
        <>
            <section className="elements" aria-label="Фильмы.">

                {isLoading ? <Preloader /> : props.movies.map((card, key) => (
                    <MoviesCard
                        key={key}
                        card={card}
                        buttonClassName={card.isLiked && (props.buttonName === 'like') ? `button-${props.buttonName} button-${props.buttonName}_active` : `button-${props.buttonName}`}
                        buttonName={props.buttonName}
                        buttonTitle={props.buttonTitle}
                    />
                ))}


            </section>
            {isButtonShow && (<Button
                buttonClassName="button-more"
                buttonName="more"
                buttonTitle="Ещё"
                onClick={handleClickShowMore} />)}
        </>
    );
}

export default MoviesCardList;
