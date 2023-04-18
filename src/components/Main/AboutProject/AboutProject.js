import './AboutProject.css';
import '../Main.css';

function AboutProject(props) {
    return (
        <section className='about'>
            <h2 className='main__subtitle'>О проекте</h2>
            <section className='about__diploma'>
                <article className='about__article'>
                    <h3 className='about__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='about__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
                <article className='about__article'>
                    <h3 className='about__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </article>
            </section>
            <div className='about__weeks-container'>
                <div className='about__weeks about__weeks_color_black'>1 неделя</div>
                <div className='about__weeks'>4 недели</div>
                <div className='about__weeks-caption'>Back-end</div>
                <div className='about__weeks-caption'>Front-end</div>
            </div>
        </section>
    )
}

export default AboutProject;