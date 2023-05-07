
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
    const [rows, setRows] = useState({});
    const [moreMovies, setMoreMovies] = useState(false);
    const localMovies = JSON.parse(localStorage.getItem("movies")) || [];

    useEffect(() => {
        setRows(props.size.row);
        setChecked(JSON.parse(localStorage.getItem(`${NAME_RU}-checked`)) || false);
        setValue(localStorage.getItem(NAME_RU))
        handleMoreButtonCheck();
    }, [props.loaded, window.innerWidth]);

    useEffect(() => {
        handleMoviesCheck();
    }, [])

    function handleSwitchPreloader(isLoading) {
        setLoader(isLoading);
    }

    function handleMoviesCheck() {
        if (localMovies.length !== 0) {
            props.onLoaded(true);
            setMessage("")
        }
    }

    function handleMoreButtonCheck() {
        if ((localMovies.slice(0, props.size.max).length <= (rows + props.size.add)) || localMovies.length === 0) {
            setMoreMovies(false);
        } else if (localMovies.length > props.size.row) {
            setMoreMovies(true);
        }
    }

    function handleMoreButtonClick() {
        setRows(rows + props.size.add);
        handleMoreButtonCheck();
    }

    return (
        <main className='movies'>
            <SearchForm
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
            {!loading && <span className='movies__message'>{ message }</span>}
            {props.loaded && <MoviesCardList movies={localMovies.slice(0, rows)} onSave={props.onSave} />}
            {(moreMovies && !loading) && <button onClick={handleMoreButtonClick} className='movies__more'>Ещё</button>}
        </main>
    )
}

export default Movies;