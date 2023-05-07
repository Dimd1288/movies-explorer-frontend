import { useState } from 'react';
import './MoviesCard.css';
import { convertTime } from '../../../utils/utils';
import { BEST_MOVIE_URL } from '../../../utils/constants';

function MoviesCard(props) {
    const [saved, setSaved] = useState(false);
    const duration = convertTime(props.movie.duration)

    function handleSave() {
        props.onSave({
           country: props.movie.country,
           director: props.movie.director,
           duration: props.movie.duration,
           year: props.movie.year,
           description: props.movie.description,
           image: `${BEST_MOVIE_URL}${props.movie.image.url}`,
           trailerLink: props.movie.trailerLink,
           thumbnail: `${BEST_MOVIE_URL}${props.movie.image.formats.thumbnail.url}`,
           movieId: props.movie.id,
           nameRU: props.movie.nameRU,
           nameEN: props.movie.nameEN 
        })
        setSaved(!saved)
    }

    return (
        <li className="movie-card">
            <div className='movie-card__wrapper'>
                <h2 className="movie-card__title">{props.movie.nameRU}</h2>
                <p className='movie-card__title-hint'>{props.movie.nameRU}</p>
                <button onClick={handleSave} className={`movie-card__save ${saved ? 'movie-card__save_active' : ''}`}></button>
                <p className="movie-card__duration">{duration}</p>
            </div>
            <a className='movie-card__link' href={props.movie.trailerLink} target='_blank'><img src={`${BEST_MOVIE_URL}${props.movie.image.url}`} alt="Карточка фильма" className="movie-card__image" /></a>
        </li>
    )
}

export default MoviesCard;