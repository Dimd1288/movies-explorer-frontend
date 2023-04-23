import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useState, useEffect } from 'react';

function SavedMovies(props) {
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        handlePreloader()
    }, [])
    
    function handlePreloader() {
        setLoaded(false);
        setTimeout(() => setLoaded(true), 2000);
    }

    return (
        <main className='saved-movies'>
            <SearchForm/>
            {loaded && <MoviesCardList/>}
            {!loaded && <Preloader/>}
        </main>
    )
}

export default SavedMovies;