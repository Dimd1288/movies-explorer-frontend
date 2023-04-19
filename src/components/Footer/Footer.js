import './Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className='footer__copyright-container'>
                <p className='footer__copyright'>&copy; 2023</p>
                <ul className='footer__items'>
                    <li>Яндекс.Практикум</li>
                    <li>Github</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;