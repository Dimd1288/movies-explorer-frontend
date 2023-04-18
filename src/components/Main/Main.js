import AboutProject from './AboutProject/AboutProject';
import './Main.css';
import Promo from './Promo/Promo';

function Main(props) {
    return(
        <main>
            <Promo/>
            <AboutProject/>
        </main>
    )
}

export default Main;