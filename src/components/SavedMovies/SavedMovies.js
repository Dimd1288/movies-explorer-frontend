import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import SavedMoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useState, useEffect } from 'react';
import { useFilter } from '../../hooks/useFilter';
import { NAME } from '../../utils/constants';

function SavedMovies(props) {
    const [loading, setLoader] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const { handleFilter, handleChange, value, setValue, message, setMessage, checked, setChecked, handleCheck } = useFilter();

    useEffect(() => {
        if (props.movies.length === 0) {
            setMessage("У вас нет сохраненных фильмов")
        }
    })
    
    function handlePreloader() {
        setLoaded(false);
        setTimeout(() => setLoaded(true), 2000);
    }

    return (
        <main className='saved-movies'>
            <SearchForm
                value={value}
                name={NAME}
                checked={checked}
                onCheck={setChecked}
                handleCheck={handleCheck}
                onInputChange={handleChange}
                onSetMessage={setMessage}
                onLoaded={props.onLoaded}
            />
            {props.movies.length!==0 && loaded && <SavedMoviesCardList movies={props.movies} />}
            {loading && <Preloader/>}
            {props.movies.length === 0 && !loading && <span className='movies__message'>{message}</span>}
        </main>
    )
}

export default SavedMovies;