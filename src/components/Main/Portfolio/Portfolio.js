import './Portfolio.css';
import icon from '../../../images/portfolio__icon.svg';

function Portfolio() {
    return (
        <article className='portfolio'>
            <h5 className='portfolio__title'>Портфолио</h5>
            <nav>
                <ul className='portfolio__list'>
                    <li className='portfolio__item'>Статичный сайт
                        <a className='portfolio__link' href='#'>
                            {/* <img src={icon} /> */}
                        </a>
                    </li>
                    <li className='portfolio__item'>Адаптивный сайт
                        <a className='portfolio__link' href='#'>
                            {/* <img src={icon} /> */}
                        </a>
                    </li>
                    <li className='portfolio__item'>Одностраничное приложение
                        <a className='portfolio__link' href='#'>
                            {/* <img src={icon} /> */}
                        </a>
                    </li>
                </ul>
            </nav>
        </article>
    )
}

export default Portfolio;