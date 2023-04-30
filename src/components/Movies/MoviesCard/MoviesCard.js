import { useState } from 'react';
import './MoviesCard.css';
import { convertTime } from '../../../utils/utils';

function MoviesCard(props) {
    const [saved, setSaved] = useState(false);
    const duration = convertTime(props.movie.duration)

    function handleSave() {
        setSaved(!saved)
    }

    return (
        <li className="movie-card">
            <div className='movie-card__wrapper'>
                <h2 className="movie-card__title">{props.movie.nameRU}</h2>
                <button onClick={handleSave} className={`movie-card__save ${saved ? 'movie-card__save_active' : ''}`}></button>
                <p className="movie-card__duration">{duration}</p> 
            </div>
            <img src={`https://api.nomoreparties.co${props.movie.image.url}`} alt="Карточка фильма" className="movie-card__image" />
        </li>
    )
}

export default MoviesCard;