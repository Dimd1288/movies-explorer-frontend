import './Portfolio.css';

function Portfolio() {
    return (
        <article className='portfolio'>
            <h5 className='portfolio__title'>Портфолио</h5>
            <nav>
                <ul className='portfolio__list'>
                    <li className='portfolio__item'>Статичный сайт
                        <a className='portfolio__link' href='https://dimd1288.github.io/how-to-learn/' target='_blank' rel="noreferrer">
                        </a>
                    </li>
                    <li className='portfolio__item'>Адаптивный сайт
                        <a className='portfolio__link' href='https://dimd1288.github.io/russian-travel/' target='_blank' rel="noreferrer">
                        </a>
                    </li>
                    <li className='portfolio__item'>Одностраничное приложение
                        <a className='portfolio__link' href='https://dimd1288.github.io/react-mesto-auth/' target='_blank' rel="noreferrer">
                        </a>
                    </li>
                </ul>
            </nav>
        </article>
    )
}

export default Portfolio;