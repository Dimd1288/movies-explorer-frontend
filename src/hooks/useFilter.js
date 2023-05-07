import { useState } from "react";

export function useFilter() {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState("Поиск фильмов по названию");
    const [checked, setChecked] = useState(false);

    function handleCheck() {
        setChecked(!checked);
    }

    const handleChange = (e) => {
        setValue(e.target.value);
        localStorage.setItem(e.target.name, e.target.value);
    }

    const handleFilter = (initialArray) => {
        const arr = !checked ? initialArray.filter((item) => {
            return item.nameRU.toLowerCase().includes(value.toLowerCase())
        }) : initialArray.filter((item) => {
            return item.nameRU.toLowerCase().includes(value.toLowerCase()) && (item.duration <= 40)
        });
        localStorage.setItem("movies", JSON.stringify(arr));
        return new Promise((resolve, reject) => {
            resolve(arr.slice(0));
        });
    }

    return { handleFilter, handleChange, value, setValue, message, setMessage, checked, setChecked, handleCheck }
}