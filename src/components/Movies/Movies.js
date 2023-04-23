
import { useEffect, useState } from 'react';
import './Movies.css'
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        handlePreloader()
    }, [])
    
    function handlePreloader() {
        setLoaded(false);
        setTimeout(() => setLoaded(true), 2000);
    }

    return(
        <main className='movies'>
            <SearchForm/>
            {loaded && <MoviesCardList/>}
            {!loaded && <Preloader/>}
            <button onClick={handlePreloader} className='movies__more'>Ещё</button>
        </main>
    )
}

export default Movies;