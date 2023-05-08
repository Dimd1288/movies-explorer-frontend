import './SavedMoviesCard.css';
import { convertTime } from '../../../utils/utils';

function SavedMoviesCard(props) {
    const duration = convertTime(props.movie.duration)

    function handleDelete() {
        props.onDelete(props.movie._id)
    }
   
    return (
        <li className="saved-movie-card">
            <div className='saved-movie-card__wrapper'>
                <h2 className="saved-movie-card__title">{props.movie.nameRU}</h2>
                <p className='saved-movie-card__title-hint'>{props.movie.nameRU}</p>
                <button onClick={handleDelete} className="saved-movie-card__delete"></button>
                <p className="saved-movie-card__duration">{duration}</p> 
            </div>
            <a className='saved-movie-card__link' href={props.movie.trailerLink} target='_blank' rel="noreferrer"><img src={props.movie.image} alt="Карточка фильма" className="saved-movie-card__image" /></a>
        </li>
    )
}

export default SavedMoviesCard;