import { useState } from 'react';
import './SearchForm.css';
import Switch from "react-switch";

function SearchForm() {
    const [checked, setChecked] = useState(false);

    function handleCheck() {
        setChecked(!checked)
    }

    return (
        <section className='search-form'>
            <form className='search-form__wrapper'>
                <input type="search" className='search-form__input' placeholder="Фильм" />
                <button className='search-form__button' type='submit'>Найти</button>
            </form>
            <label className='search-form__filter'>
                <Switch onChange={handleCheck} checked={checked} uncheckedIcon={false}
                    checkedIcon={false} handleDiameter={16} width={36} height={20} onColor='#2BE080'
                    offColor='#EBEBEB' offHandleColor='#F5F5F5' />
                <span className='search-form__caption'>Короткометражки</span>
            </label>
        </section>
    )
}

export default SearchForm;