import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import './Main.css';
import Promo from './Promo/Promo';

function Main(props) {
    return(
        <main>
            <Promo/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
        </main>
    )
}

export default Main;