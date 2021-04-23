import React, { useState, useEffect, useRef } from 'react';
import AsyncSelect from 'react-select/async';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

import api from '~/services/api';

function Select({ name, multiple, request, ...rest }) {
    const ref = useRef(null);
    const { fieldName, registerField, defaultValue } = useField(name);

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    function parseSelectValue(selectRef) {
        const selectValue = selectRef.select.state.value;

        if (!multiple) {
            return selectValue ? selectValue.id : '';
        }

        return selectValue ? selectValue.map((option) => option.id) : [];
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'state.value',
            parseValue: parseSelectValue,
            clearValue: (selectRef) => {
                selectRef.select.clearValue();
            },
        });
    }, [ref.current, fieldName]); // eslint-disable-line

    function getDefaultValue() {
        if (!defaultValue) return null;

        if (!multiple) {
            console.tron.log(defaultValue);
            return options.find((option) => option.label === defaultValue);
        }

        return options.filter((option) => defaultValue.includes(option.label));
    }

    useEffect(() => {
        async function loadOptions() {
            const response = await api.get(`/${request}`, {
                params: { q: inputValue },
            });

            const data = response.data.map((option) => ({
                id: option.id,
                label: option.name,
                value: option.name,
            }));

            setOptions(data);
        }

        loadOptions();
    }, [inputValue, request]);

    function filterOptions(inputValue) {
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    }

    function loadOptions(inputValue, callback) {
        setTimeout(() => {
            callback(filterOptions(inputValue));
        }, 1000);
    }

    function handleInputChange(newValue) {
        const inputValue = newValue.replace(/\W/g, '');
        setInputValue(inputValue);
        return inputValue;
    }

    return (
        <Container>
            <AsyncSelect
                name={fieldName}
                aria-label={fieldName}
                options={options}
                isMulti={multiple}
                defaultValue={getDefaultValue()}
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                onInputChange={handleInputChange}
                ref={ref}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                {...rest}
            />
        </Container>
    );
}

export default Select;
