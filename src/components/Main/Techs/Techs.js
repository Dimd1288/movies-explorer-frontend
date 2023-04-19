import '../Main.css';
import './Techs.css';

function Techs() {
    return (
        <section className='techs'>
            <div className='techs-wrapper'>
                <h3 className='main__subtitle'>Технологии</h3>
                <h4 className='techs__title'>7 технологий</h4>
                <p className='techs__description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className='techs__list'>
                    <li className='techs__item'>HTML</li>
                    <li className='techs__item'>CSS</li>
                    <li className='techs__item'>JS</li>
                    <li className='techs__item'>React</li>
                    <li className='techs__item'>Git</li>
                    <li className='techs__item'>Express.js</li>
                    <li className='techs__item'>mongoDB</li>
                </ul>
            </div>
        </section>
    )
}

export default Techs;