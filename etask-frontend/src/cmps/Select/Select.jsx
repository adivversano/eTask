import './Select.scss';
import { useState } from 'react';

export const Select = ({ handleSelect, options, defaultValue, variant, tabIndex, fieldName }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(defaultValue ? defaultValue : options[0]?.preview)

    const onSelect = (ev) => {
        const { target } = ev;
        const name = target.getAttribute('name');
        const value = target.innerText;
        setSelected(value)
        setIsOpen(false);
        handleSelect(null, fieldName, name)
    }

    return (
        <div
            className={`select${variant ? ` ${variant}` : ' secondary'}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <label className={`header-selected${isOpen ? ' active' : ''}`}>
                <input
                    tabIndex={tabIndex}
                    type="button"
                    value={selected}
                    className="clean-btn"
                    onBlur={() => setIsOpen(false)}
                />
            </label>
            <ul className={`menu clean-list${isOpen ? ' visible' : ''}`}>
                {options.map(option =>
                    <li
                        className={selected === option.preview ? 'selected' : ''}
                        key={option.value}
                        name={option.value}
                        //onMouseDown prevent onBlur event of header-selected to be called after onClick event
                        onMouseDown={ev => ev.preventDefault()}
                        onClick={ev => onSelect(ev)}
                    >
                        {option.preview}
                    </li>
                )}
            </ul>
        </div>
    )
}
