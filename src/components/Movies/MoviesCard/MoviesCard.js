import { useLocation } from "react-router-dom";
import Button from '../../Button/Button';
import './MoviesCard.css';

function MoviesCard(props) {
    let { pathname } = useLocation();
    // const [buttonClassName, setButtonClassName] = useState('button-like');

    // useEffect(() => {
    //     
    //     if (props.defineStatusSaved === true) {
    //         setButtonClassName('button-like button-like_active');
    //     } else {
    //         setButtonClassName('button-like');
    //     }
    // }, [props.defineStatusSaved]
    // )
    // console.log(props.defineStatusSaved);
    function handleButtonSaveMovieClick() {
        console.log(props.card);
        // 
        props.handleClickButtonSavedMovie(props.card);

        console.log(props.savedMovies);
        // 
        // console.log(props);
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


                {pathname === "/movies" && props.defineStatusSaved === false && <Button buttonClassName={props.defineStatusSaved === false ? 'button-like' : 'button-like button-like_active'} buttonName={props.buttonName} type="button" onClick={props.defineStatusSaved === false ? handleButtonSaveMovieClick : handleButtonDeleteMovieClick} />}
                {pathname === "/saved-movies" && <Button buttonClassName="button-delete" buttonName={props.buttonName} type="button" onClick={handleButtonDeleteMovieClick} />}

            </div>
        </article>
    );
}

export default MoviesCard;