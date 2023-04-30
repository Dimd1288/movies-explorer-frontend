import { useState } from "react";

export function useFilter() {
    const [value, setValue] = useState('');
    const [filteredArray, setFilteredArray] = useState([]);
    const [message, setMessage] = useState("Поиск фильмов по названию")

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleFilter = (initialArray, switched) => {
        const arr = !switched ? initialArray.filter((item) => {
            return item.nameRU.toLowerCase().includes(value.toLowerCase())
        }) : initialArray.filter((item) => {
            return item.nameRU.toLowerCase().includes(value.toLowerCase()) && (item.duration < 40)
        })
        setFilteredArray(arr);
        return new Promise((resolve, reject) => {
            resolve(arr);
        });
    }

  


    return { filteredArray, handleFilter, handleChange, value, message, setMessage }
}