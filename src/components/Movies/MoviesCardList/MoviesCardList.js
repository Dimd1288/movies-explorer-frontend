import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

    return (
        <section className='movies-list'>
            <ul className='movies-list__items'>
                {props.movies.map((message) =>
                (<MoviesCard onSave={props.onSave} onDelete={props.onDelete} movie={message} key={message.id} onSetSavedMovies={props.onSetSavedMovies} savedMovies={props.savedMovies}/>
                ))}
            </ul>
        </section>
    )
}

export default MoviesCardList;

