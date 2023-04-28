import './AboutMe.css';
import '../Main.css';
import myImage from '../../../images/student-image.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <section className='about-me'>
            <h3 className='main__subtitle'>Студент</h3>
            <div className='about-me__container'>
                <article className='about-me__info'>
                    <h4 className='about-me__title'>Дмитрий</h4>
                    <p className='about-me__profession'>Фронтенд-разработчик, 34 года</p>
                    <p className='about-me__description'>Я родился и вырос в городе Йошкар-Ола.
                        Закончил Марийский Государственный Университет по специальности "Физика".
                        В настоящее время работаю тестировщиком - составляю тест кейсы и пишу автотесты на Java.
                        Хочу связать свою дальнейшую карьеру с разработкой.
                    </p>
                    <a href='https://github.com/Dimd1288' className='about-me__link'>Github</a>
                </article>
                <img src={myImage} alt="Мое фото" className='about-me__image' />
            </div>
            <Portfolio/>
        </section>
    )
}

export default AboutMe;