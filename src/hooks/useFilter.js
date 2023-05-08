import { useState } from "react";

export function useFilter() {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState("");
    const [checked, setChecked] = useState(false);

    function handleCheck() {
        setChecked(!checked);
    }

    const handleChange = (e) => {
        setValue(e.target.value);
        localStorage.setItem(e.target.name, e.target.value);
    }

    const handleFilter = (initialArray, page) => {
        const arr = !checked ? initialArray.filter((item) => {
            return item.nameRU.toLowerCase().includes(value.toLowerCase())
        }) : initialArray.filter((item) => {
            return item.nameRU.toLowerCase().includes(value.toLowerCase()) && (item.duration <= 40)
        });
        localStorage.setItem(page, JSON.stringify(arr));
        return new Promise((resolve, reject) => {
            resolve(arr);
        });
    }

    return { handleFilter, handleChange, value, setValue, message, setMessage, checked, setChecked, handleCheck }
}