
import { useDispatch } from 'react-redux';
import { onResetPopover } from '../../../store/actions/app.actions';
import './Popover.scss';
// import { useEffect } from 'react';
// import { ReactComponent as CloseIcon } from '../../assets/close.svg';

export const Popover = ({ children }) => {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(onResetPopover());
    }
    return (
        <div className={`popover-overlay`} onMouseDown={onClose}>
            <div className="popover" onMouseDown={ev => ev.stopPropagation()}>
                {children}
            </div>
        </div >
    )
}
