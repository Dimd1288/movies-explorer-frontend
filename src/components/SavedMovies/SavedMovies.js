import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import SavedMoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useState, useEffect } from 'react';
import { useFilter } from '../../hooks/useFilter';
import { NAME } from '../../utils/constants';

function SavedMovies(props) {
    const [loading, setLoader] = useState(false);
    const { handleFilter, handleChange, value, setValue, message, setMessage, checked, setChecked, handleCheck } = useFilter();
    const localMovies = JSON.parse(localStorage.getItem('saved-movies')) || [];

    useEffect(() => {
        setChecked(JSON.parse(localStorage.getItem(`${NAME}-checked`)) || false);
        setValue(localStorage.getItem(NAME))
        checkMoviesLoaded();
    }, [])

    function handleSwitchPreloader(isLoading) {
        setLoader(isLoading);
    }

    function checkMoviesLoaded() {
        props.onLoaded(false);
        props.onLoading().then((res) => {
            if (res.length === 0) {
                props.onSetMovies([]);
                setMessage("У вас нет сохраненных фильмов");
            } else {
                if (localMovies.length !== 0) {
                    props.onSetMovies(localMovies)
                }
                setMessage("");
                props.onLoaded(true)
            }
        })
    }

    return (
        <main className='saved-movies'>
            <SearchForm
                page='saved-movies'
                value={value}
                name={NAME}
                checked={checked}
                onCheck={setChecked}
                handleCheck={handleCheck}
                onInputChange={handleChange}
                onSetMessage={setMessage}
                onLoaded={props.onLoaded}
                onStartLoader={handleSwitchPreloader}
                onLoading={props.onLoading}
                onFilter={handleFilter}
                onSetMovies={props.onSetMovies}
            />
            {props.loaded && <SavedMoviesCardList movies={props.movies} onDelete={props.onDelete}/>}
            {loading && <Preloader />}
            {props.movies.length === 0 && !loading && <span className='movies__message'>{message}</span>}
        </main>
    )
}

export default SavedMovies;