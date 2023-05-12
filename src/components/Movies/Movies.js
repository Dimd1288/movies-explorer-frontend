
import { useEffect, useState } from 'react';
import './Movies.css'
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { useFilter } from '../../hooks/useFilter';
import { NAME_RU } from '../../utils/constants';

function Movies(props) {
    const [loading, setLoader] = useState(false);
    const { handleFilter, handleChange, value, setValue, message, setMessage, checked, setChecked, handleCheck } = useFilter();
    const [displayedCards, setDisplayedCards] = useState({});
    const [moreMovies, setMoreMovies] = useState(false);
    const localMovies = JSON.parse(localStorage.getItem("movies")) || [];

    useEffect(() => {
        setDisplayedCards(localMovies.length >= props.size.max ? props.size.max : localMovies.length);
        setChecked(JSON.parse(localStorage.getItem(`${NAME_RU}-checked`)) || false);
        setValue(localStorage.getItem(NAME_RU))
        handleMoreButtonCheck();
    }, [props.loaded, window.innerWidth]);

    useEffect(() => {
        handleMoviesCheck();
    }, [])

    useEffect(() => {
        handleMoreButtonCheck();
    }, [displayedCards])

    function handleSwitchPreloader(isLoading) {
        setLoader(isLoading);
    }

    function handleMoviesCheck() {
        if (localMovies.length !== 0) {
            props.onLoaded(true);
            setMessage("")
        } else setMessage("Поиск фильмов")
    }

    function handleMoreButtonCheck() {
        if ((displayedCards < localMovies.length)) {
            setMoreMovies(true)
        } else {
            setMoreMovies(false)
        }
    }

    function handleMoreButtonClick() {
        setDisplayedCards(displayedCards + props.size.max);
    }

    return (
        <main className='movies'>
            <SearchForm
                page='movies'
                onLoading={props.onLoading}
                onFilter={handleFilter}
                name={NAME_RU}
                onInputChange={handleChange}
                onLoaded={props.onLoaded}
                onMoreMovies={setMoreMovies}
                value={value}
                checked={checked}
                onCheck={setChecked}
                handleCheck={handleCheck}
                onSetMessage={setMessage}
                movies={localMovies}
                onSetMovies={props.onSetMovies}
                onStartLoader={handleSwitchPreloader} />
            {loading && <Preloader />}
            {!loading && <span className='movies__message'>{message}</span>}
            {props.loaded && <MoviesCardList movies={localMovies.slice(0, displayedCards)} onSave={props.onSave} onDelete={props.onDelete} onSetSavedMovies={props.onSetSavedMovies} savedMovies={props.savedMovies} />}
            {(moreMovies && !loading) && <button onClick={handleMoreButtonClick} className='movies__more'>Ещё</button>}
        </main>
    )
}

export default Movies;