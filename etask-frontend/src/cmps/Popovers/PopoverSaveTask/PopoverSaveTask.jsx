import './PopoverSaveTask.scss';

import moment from 'moment';

import { useState } from 'react';
import { Popover } from '../Popover/Popover'
import { Select } from '../../Select/Select';
import { TextareaAutosize } from '@mui/material';
import { taskService } from '../../../services/task.service';
import { utilService } from '../../../services/utils.service';
import { loadTasks, onResetPopover } from '../../../store/actions/app.actions';
import { useDispatch, useSelector } from 'react-redux';

export const PopoverSaveTask = ({ task }) => {
    const dispatch = useDispatch();
    const { filter } = useSelector(state => state.appModule);
    const [savedTask, setSavedTask] = useState(task ? task : {
        title: 'Task Title',
        description: '',
        deadline: moment().format('YYYY-MM-DDTHH:mm'),
        status: 'notStarted',
        createdAt: moment().format('YYYY-MM-DDTHH:mm')
    });
    const [editMap, setEditMap] = useState({
        title: (task ? false : true),
    });
    const [error, setError] = useState('');

    const onToggleEdit = ({ target }) => {
        const name = target.getAttribute('name');
        setEditMap(prevEditMap => {
            return { ...prevEditMap, [name]: !prevEditMap[name] };
        });
    }

    const handleChange = (ev, name, value) => {
        setError('');
        name = name || ev.target.name;
        value = value || ev.target.value;
        setSavedTask(prevSavedTask => ({ ...prevSavedTask, [name]: value }))
    }

    const { title, deadline, description, status } = savedTask;

    const onSave = async () => {
        if (Date.parse(deadline) + (1000 * 60 * 3) <= Date.now() && !task) {
            setError('Please choose a future due date time.');
            return;
        }
        if (!title) {
            setError('You must have title in order to save.');
            return;
        }
        try {
            const res = await taskService.save(savedTask);
            if (res) {
                dispatch(onResetPopover());
                dispatch(loadTasks(filter));
            }
        } catch (msg) {
            setError(msg);
        }
    }

    const onRemove = async () => {
        try {
            const sixDaysMs = 1000 * 60 * 60 * 24 * 6;
            if (Date.parse(deadline) - sixDaysMs > Date.now()) {
                setError('You can not delete task with due date larger than 6 days.');
                return;
            }
            const res = await taskService.remove(task.id);
            if (res) {
                dispatch(onResetPopover());
                dispatch(loadTasks(filter));
            }
        } catch (msg) {
            setError(msg);
        }
    }

    return (
        <Popover>
            <div className="popover-add-task">
                {editMap.title ?
                    <TextareaAutosize
                        className="title"
                        spellCheck="false"
                        tabIndex="1"
                        name="title"
                        type="text"
                        defaultValue={title}
                        autoFocus={task ? false : true}
                        onFocus={ev => ev.target.select()}
                        onKeyDown={ev => ev.key === 'Enter' && ev.target.blur()}
                        onBlur={ev => {
                            handleChange(ev)
                            onToggleEdit(ev);
                        }}
                    />
                    :
                    <h4 className="title" name="title" onClick={(ev) => onToggleEdit(ev)} >{title}</h4>
                }
                <TextareaAutosize
                    className="description"
                    spellCheck="false"
                    tabIndex="2"
                    name="description"
                    defaultValue={description}
                    autoFocus={task ? true : false}
                    type="text"
                    minRows={5}
                    onFocus={ev => ev.target.select()}
                    onBlur={ev => {
                        handleChange(ev)
                    }}
                />

                <div className="task-menu">
                    <div className="btns-container">
                        <button className="save-btn clean-btn" tabIndex="5" onClick={onSave}>Save</button>
                        {task &&
                            <button className="delete-btn clean-btn" onClick={onRemove}>Delete</button>
                        }
                    </div>

                    <div className="task-properties">
                        <Select
                            handleSelect={handleChange}
                            tabIndex="3"
                            defaultValue={utilService.formatStatus(status)}
                            variant="secondary"
                            fieldName="status"
                            options={[
                                { value: 'notStarted', preview: 'Not started' },
                                { value: 'inProgress', preview: 'In progress' },
                                { value: 'done', preview: 'Done' }
                            ]}
                        />

                        <div className="date">
                            <input
                                type="datetime-local"
                                name="deadline"
                                defaultValue={moment(deadline).format('YYYY-MM-DDTHH:mm')}
                                min={moment().format('YYYY-MM-DDTHH:mm')}
                                onChange={handleChange}
                                tabIndex="4"
                            />
                        </div>
                    </div>
                </div>
                {error && <span className="error">{error}</span>}
            </div>
        </Popover>
    )
}
