import './TaskPreview.scss';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { onSetPopover } from '../../store/actions/app.actions';
import { StatusBadge } from '../StatusBadge/StatusBadge';

export const TaskPreview = ({ task }) => {
    const { idx, title, status, deadline, createdAt } = task;
    const dispatch = useDispatch();


    const handleDeadline = () => {
        return Date.parse(deadline) > Date.now() ? moment(deadline).fromNow() : moment(deadline).format('lll').split(',').join(' ');
    }

    const onEdit = () => {
        dispatch(onSetPopover({ type: 'saveTask', props: { task } }))
    }
    
    return (
        <li className="task" onClick={onEdit}>
            <span>{idx}</span>
            <span className="title">{title}</span>
            <span>{handleDeadline()}</span>
            <span className="task-status" >
                <StatusBadge status={status} />
            </span>
            <span>{moment(createdAt).format('lll').split(',').join(' ')}</span>
        </li>
    )
}
