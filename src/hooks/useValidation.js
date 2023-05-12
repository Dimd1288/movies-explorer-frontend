import { useState, useCallback } from "react";
import { EMAIL_ERROR, NAME_ERROR } from "../utils/constants";

export function useValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [failed, setFailed] = useState(false)
    const [isValid, setIsValid] = useState(false);
    const isEmail = (email) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const isCorrectName = (name) => /^[^\s-\d][A-Za-zА-Яа-яё-\s]+$/i.test(name);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setFailed(false);
        handleErrors(event);
        setValues({ ...values, [name]: value });
    };

    const handleErrors = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        if (name === 'email') {
            if (!isEmail(value)) {
                errors[name] = EMAIL_ERROR;
            } else {
                errors[name] = '';
            }
        }
        if (name === 'name') {
            if (!isCorrectName(value)) {
                errors[name] = NAME_ERROR;
            } else {
                errors[name] = ''
            }
        }
        if (name !== 'email' && name !== 'name') {
            errors[name] = target.validationMessage;
        }
        if (!errors['email'] && !errors['name']) {
            setIsValid(target.closest("form").checkValidity());
        } else setIsValid(false)
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );


    const checkIsChanged = (initialValues) => {
        if (JSON.stringify(initialValues) === JSON.stringify(values)) {
            setIsValid(false)
        }
    }

    return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, failed, setFailed, checkIsChanged };
}