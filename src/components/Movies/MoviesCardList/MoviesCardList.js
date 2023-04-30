import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import cardImage from '../../../images/cards/1.jpg'

function MoviesCardList(props) {

    return (
        <section className='movies-list'>
            <ul className='movies-list__items'>
                {props.movies.map((message) =>
                (<MoviesCard cardImage={cardImage} movie={message} key={message.id} />
                ))}
            </ul>
        </section>
    )
}

export default MoviesCardList;

