import './DateFilter.scss';
import moment from 'moment';
import { useRef, useState } from 'react'
import { useOutsideEvent } from '../../services/customHooks/useOutsideEvent';
import { useDispatch, useSelector } from 'react-redux';
import { onSetFilter } from '../../store/actions/app.actions';

export const DateFilter = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector(state => state.appModule);
    const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
    const ref = useRef();
    useOutsideEvent(ref, () => setIsDateFilterOpen(false));

    const handleChange = (ev) => {
        let { name, value } = ev.target;
        if (!value) value = null; // converting value to be null for db because input only accept empty string as nullish value;
        const sortBy = (name === 'by' && (filter?.date?.from || filter?.date?.to)) ? value : filter?.sort?.by;
        dispatch(onSetFilter({
            ...filter,
            page: 1,
            date: { ...filter.date, [name]: value },
            sort: { by: sortBy, type: 'ascending' }
        }));
    }

    const onClear = () => {
        dispatch(onSetFilter({
            ...filter,
            page: 1,
            date: { by: 'deadline', from: null, to: null },
            sort: { by: 'createdAt', type: 'descending' }
        }));
    }

    const from = moment(filter?.date.from).format() === 'Invalid date' ? '' : moment(filter?.date.from).format('YYYY-MM-DDTHH:mm');
    const to = moment(filter?.date.to).format() === 'Invalid date' ? '' : moment(filter?.date.to).format('YYYY-MM-DDTHH:mm');

    return (
        <div className="date-filter-container">
            <button className={`date-filter-btn clean-btn${isDateFilterOpen ? ' active' : ''}`} onClick={(ev) => {
                ev.stopPropagation();
                setIsDateFilterOpen(!isDateFilterOpen)
            }}><span>Dates</span></button>
            {isDateFilterOpen &&
                <div className="date-filter-wrapper" ref={ref}>
                    <h4 className="title">Dates:</h4>
                    <div className="date-filter-by-container">
                        <label htmlFor="date-filter-deadline">
                            Deadline
                            <input
                                id="date-filter-deadline"
                                type="radio"
                                name="by"
                                value="deadline"
                                checked={filter?.date?.by === 'deadline'}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="date-filter-createdAt">
                            Created At
                            <input
                                id="date-filter-createdAt"
                                type="radio"
                                name="by"
                                value="createdAt"
                                checked={filter?.date?.by === 'createdAt'}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <h6>From:</h6>
                    <div className="date">
                        <input type="datetime-local" name="from" value={from} onChange={handleChange} />
                    </div>
                    <h6>Up to:</h6>
                    <div className="date date-to">
                        <input type="datetime-local" name="to" value={to} onChange={handleChange} />
                    </div>

                    <button className="clear-btn clean-btn" onClick={onClear}>Clear</button>
                </div>
            }
        </div>
    )
}
