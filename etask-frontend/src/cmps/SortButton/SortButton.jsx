import './SortButton.scss';
import { useDispatch, useSelector } from 'react-redux';
import { onSetFilter } from '../../store/actions/app.actions';

export const SortButton = ({ name, isSorting, type, value }) => {
    const dispatch = useDispatch();
    const { filter } = useSelector(state => state.appModule);

    const onSort = () => {
        if (isSorting) {
            const toggledType = type === 'ascending' ? 'descending' : 'ascending';
            dispatch(onSetFilter({ ...filter, sort: { by: name, type: toggledType } }))
        } else {
            dispatch(onSetFilter({ ...filter, sort: { by: name, type: 'descending' } }))
        }
    }
    return (
        <div className="sort-btn-container">
            <button className={`sort-btn clean-btn${isSorting ? ` ${type}` : ''}`} onClick={onSort}>
                <span>{value}</span>
                <div className="arrows">
                    <span className="ascending"></span>
                    <span className="descending"></span>
                </div>
            </button>
        </div>
    )
}
