
import { useEffect, useState } from 'react';
import './Movies.css'
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { useFilter } from '../../hooks/useFilter';
import { useWindowSize } from '../../hooks/useWindowSize';

function Movies(props) {
    const [loading, setLoader] = useState(false);
    const { handleFilter, handleChange, filteredArray, value, message, setMessage, handleSwitch } = useFilter();
    const { sizeMode, handleSize } = useWindowSize();
    const [rows, setRows] = useState({});
    const [moreMovies, setMoreMovies] = useState(false);

    useEffect(() => {
        handleSize();
        setRows(sizeMode.row);
        handleMoreButtonCheck();
    }, [props.loaded])

    function handleSwitchPreloader(isLoading) {
        setLoader(isLoading);
    }

    function handleMoreButtonCheck() {
        if ((filteredArray.length <= (rows + sizeMode.add))) {
            console.log(filteredArray.length);
            console.log(rows)
            setMoreMovies(false);
        } else if (filteredArray.length > sizeMode.row) {
            setMoreMovies(true);
        }
    }

    function handleMoreButtonClick() {
        setRows(rows + sizeMode.add);
        handleMoreButtonCheck();
    }

    return (
        <main className='movies'>
            <SearchForm
                onLoading={props.onLoading}
                onFilter={handleFilter}
                onInputChange={handleChange}
                onLoaded={props.onLoaded}
                value={value}
                onSwitch={handleSwitch}
                onSetMessage={setMessage}
                movies={filteredArray}
                onSetMovies={props.onSetMovies}
                onStartLoader={handleSwitchPreloader} />
            {loading && <Preloader />}
            {!loading && <span className='movies__message'>{message}</span>}
            {props.loaded && <MoviesCardList movies={filteredArray.slice(0, rows)} />}
            {moreMovies && <button onClick={handleMoreButtonClick} className='movies__more'>Ещё</button>}
        </main>
    )
}

export default Movies;