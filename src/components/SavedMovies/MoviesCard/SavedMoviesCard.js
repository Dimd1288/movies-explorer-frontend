import './SavedMoviesCard.css';
import { convertTime } from '../../../utils/utils';

function SavedMoviesCard(props) {
    const duration = convertTime(props.movie.duration)
   
    return (
        <li className="saved-movie-card">
            <div className='saved-movie-card__wrapper'>
                <h2 className="saved-movie-card__title">{props.movie.nameRU}</h2>
                <p className='saved-movie-card__title-hint'>{props.movie.nameRU}</p>
                <button className="saved-movie-card__delete"></button>
                <p className="saved-movie-card__duration">{duration}</p> 
            </div>
            <img src={props.movie.image} alt="Карточка фильма" className="saved-movie-card__image" />
        </li>
    )
}

export default SavedMoviesCard;