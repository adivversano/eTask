import './TaskList.scss';
import { SortButton } from '../SortButton/SortButton';
import { TaskPreview } from '../TaskPreview/TaskPreview';

export const TaskList = ({ tasks, filter }) => {
    const { sort } = filter;
    
    return (
        <ul className="task-list clean-list">
            <li className="task-list-header">
                <span>#</span>
                <span><SortButton value={'Title'} name="title" isSorting={sort.by === 'title'} type={sort.type} /></span>
                <span><SortButton value={'Due Date'} name="deadline" isSorting={sort.by === 'deadline'} type={sort.type} /></span>
                <span><SortButton value={'Status'} name="status" isSorting={sort.by === 'status'} type={sort.type} /></span>
                <span><SortButton value={'Created At'} name="createdAt" isSorting={sort.by === 'createdAt'} type={sort.type} /></span>
            </li>
            <ul className="task-list-body clean-list">
                {tasks.map(task =>
                    <TaskPreview key={task.id} task={task} />
                )}
            </ul>
        </ul>
    )
}
