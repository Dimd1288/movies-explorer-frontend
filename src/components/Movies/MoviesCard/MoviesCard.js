import './MoviesCard.css';
import { convertTime } from '../../../utils/utils';
import { BEST_MOVIE_URL } from '../../../utils/constants';

function MoviesCard(props) {
    const isSaved = props.savedMovies.some(i => i.nameRU === props.movie.nameRU);
    const currentMovie = props.savedMovies.filter((item) => {return item.nameRU === props.movie.nameRU});
    const duration = convertTime(props.movie.duration);
    const movieId = Math.floor(Math.random() * 100000)

    function handleSave() {
        clearLocalSavedMovies();
        if (!isSaved) {
            props.onSave({
                country: props.movie.country,
                director: props.movie.director,
                duration: props.movie.duration,
                year: props.movie.year,
                description: props.movie.description,
                image: `${BEST_MOVIE_URL}${props.movie.image.url}`,
                trailerLink: props.movie.trailerLink,
                thumbnail: `${BEST_MOVIE_URL}${props.movie.image.formats.thumbnail.url}`,
                movieId: movieId,
                nameRU: props.movie.nameRU,
                nameEN: props.movie.nameEN 
             }).then(savedMovie => {
                props.onSetSavedMovies([savedMovie, ...props.savedMovies]);
             })
        } else {
            props.onDelete(currentMovie[0]._id).then(res => {
                props.onSetSavedMovies((state) => state.filter((movie) => movie._id !== res._id));
            })
        }
    }
    
    function clearLocalSavedMovies() {
        localStorage.removeItem("saved-movies");
        localStorage.setItem("name", "");
        localStorage.removeItem("name-checked");
      }

    return (
        <li className="movie-card">
            <div className='movie-card__wrapper'>
                <h2 className="movie-card__title">{props.movie.nameRU}</h2>
                <p className='movie-card__title-hint'>{props.movie.nameRU}</p>
                <button onClick={handleSave} className={`movie-card__save ${isSaved ? 'movie-card__save_active' : ''}`}></button>
                <p className="movie-card__duration">{duration}</p>
            </div>
            <a className='movie-card__link' href={props.movie.trailerLink} target='_blank' rel="noreferrer"><img src={`${BEST_MOVIE_URL}${props.movie.image.url}`} alt="Карточка фильма" className="movie-card__image" /></a>
        </li>
    )
}

export default MoviesCard;