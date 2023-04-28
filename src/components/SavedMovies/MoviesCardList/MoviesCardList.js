import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import cardImage from '../../../images/cards/1.jpg'

function MoviesCardList() {
    return (
        <section className='movies-list'>
            <ul className='movies-list__items'>
                <li><MoviesCard cardImage={cardImage}/></li>
                <li><MoviesCard cardImage={cardImage}/></li>
                <li><MoviesCard cardImage={cardImage}/></li>
            </ul>
        </section>
    )
}

export default MoviesCardList;

