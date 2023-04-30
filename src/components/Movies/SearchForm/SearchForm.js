import { useState } from 'react';
import './SearchForm.css';
import Switch from "react-switch";

function SearchForm(props) {
    const [checked, setChecked] = useState(false);
    const [isShortMeter, setShortMeter] = useState(checked);

    function handleCheck() {
        setChecked(!checked)
    }

    function handleSearch(e) {
        e.preventDefault();
        if (props.value === null || props.value.match(/^ *$/) !== null) {
            props.onSetMessage("Поле не должно быть пустым")
            props.onLoaded(false);
        } else {
            props.onStartLoader(true);
            props.onLoaded(false);
            props.onLoading().then(res => {
                props.onLoaded(true);
                props.onStartLoader(false);
                props.onFilter(res, checked).then(res => {
                    console.log(props.movies)
                    if (res.length !== 0) {
                        props.onSetMessage("")
                    } else {
                        props.onSetMessage("По вашему запросу ничего не найдено")
                    }
                });
            });
        }
    }

    return (
        <section className='search-form'>
            <form className='search-form__wrapper' onSubmit={handleSearch} noValidate>
                <input onChange={props.onInputChange} type="search" className='search-form__input' placeholder="Фильм" required />
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