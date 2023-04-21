import { useState } from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
    const [saved, setSaved] = useState(false);
    function handleSave() {
        setSaved(!saved)
    }

    return (
        <article className="movie-card">
            <div className='movie-card__wrapper'>
                <h2 className="movie-card__title">33 слова о дизайне</h2>
                <button onClick={handleSave} className={`movie-card__save ${saved ? 'movie-card__save_active' : ''}`}></button>
                <p className="movie-card__duration">1ч 47м</p> 
            </div>
            <img src={props.cardImage} className="movie-card__image" />
        </article>
    )
}

export default MoviesCard;