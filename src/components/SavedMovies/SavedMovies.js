import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useState, useEffect } from 'react';
import { useFilter } from '../../hooks/useFilter';
import { NAME } from '../../utils/constants';

function SavedMovies(props) {
    const [loaded, setLoaded] = useState(true);
    const { handleFilter, handleChange, value, setValue, message, setMessage, checked, setChecked, handleCheck } = useFilter();

    useEffect(() => {
        handlePreloader()
    }, [])
    
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
            />
            {loaded && <MoviesCardList/>}
            {!loaded && <Preloader/>}
        </main>
    )
}

export default SavedMovies;