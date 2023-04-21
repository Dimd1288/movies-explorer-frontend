
import './Movies.css'
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

function Movies(props) {
    return(
        <main className='movies'>
            <SearchForm/>
            <MoviesCardList/>
            <button className='movies__more'>Ещё</button>
        </main>
    )
}

export default Movies;