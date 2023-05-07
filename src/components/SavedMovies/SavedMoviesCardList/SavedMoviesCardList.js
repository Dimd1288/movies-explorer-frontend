import './SavedMoviesCardList.css';
import SavedMoviesCard from '../MoviesCard/SavedMoviesCard';

function SavedMoviesCardList(props) {

    return (
        <section className='saved-movies-list'>
            <ul className='saved-movies-list__items'>
                {props.movies.map((message, i) =>
                (<SavedMoviesCard movie={message} key={i} />
                ))}
            </ul>
        </section>
    )
}

export default SavedMoviesCardList;