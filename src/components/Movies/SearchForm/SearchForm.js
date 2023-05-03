import { useState } from 'react';
import './SearchForm.css';
import Switch from "react-switch";

function SearchForm(props) {
    function handleSearch(e) {
        e.preventDefault();
        if (props.value === null || props.value.match(/^ *$/) !== null) {
            props.onSetMessage("Поле не должно быть пустым");
            props.onMoreMovies(false);
            props.onCheck(false);
            localStorage.removeItem(`${props.name}-checked`);
            props.onLoaded(false);
            localStorage.removeItem("movies")
        } else {
            props.onStartLoader(true);
            props.onLoaded(false);
            props.onLoading().then(res => {
                localStorage.setItem(`${props.name}-checked`, props.checked);
                props.onLoaded(true);
                props.onStartLoader(false);
                props.onFilter(res).then(res => {
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
                <input name={props.name} onChange={props.onInputChange} value={props.value || ''} type="search" className='search-form__input' placeholder="Фильм" required />
                <button className='search-form__button' type='submit'>Найти</button>
            </form>
            <label className='search-form__filter'>
                <Switch onChange={props.handleCheck} checked={props.checked} uncheckedIcon={false}
                    checkedIcon={false} handleDiameter={16} width={36} height={20} onColor='#2BE080'
                    offColor='#EBEBEB' offHandleColor='#F5F5F5' />
                <span className='search-form__caption'>Короткометражки</span>
            </label>
        </section>
    )
}

export default SearchForm;