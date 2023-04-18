import './Promo.css';
import promoLogo from '../../../images/title-logo.svg'

function Promo(props) {
    return(
        <section className='promo'>
            <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            <img src={promoLogo} className='promo__logo'/>
        </section>
    )
}

export default Promo;