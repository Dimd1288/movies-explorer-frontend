import './MoviesCard.css';

function MoviesCard(props) {
   
    return (
        <article className="movie-card">
            <div className='movie-card__wrapper'>
                <h2 className="movie-card__title">33 слова о дизайне</h2>
                <button className="movie-card__delete"></button>
                <p className="movie-card__duration">1ч 47м</p> 
            </div>
            <img src={props.cardImage} alt="Карточка фильма" className="movie-card__image" />
        </article>
    )
}

export default MoviesCard;