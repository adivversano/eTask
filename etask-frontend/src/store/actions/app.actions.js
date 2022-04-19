import { taskService } from "../../services/task.service";

// Dispatchers
const _setTasks = (tasks) => ({ type: 'SET_TASKS', tasks });
const _setTasksInfo = (tasksInfo) => ({ type: 'SET_TASKS_INFO', tasksInfo });
const _setPopover = (popover) => ({ type: 'SET_POPOVER', popover });
const _setFilter = (filter) => ({ type: 'SET_FILTER', filter });

// THUNK

export function loadTasks(filter) {
    return async dispatch => {
        try {
            const { tasks, tasksInfo } = await taskService.getByFilter(filter);
            dispatch(_setTasks(tasks));
            dispatch(_setTasksInfo(tasksInfo));
        } catch (err) {
            console.log(err)
        }
    }
}

export function onSetFilter(filter) {
    return dispatch => {
        dispatch(_setFilter(filter));
    }
}

export function onSetPopover(popover) {
    return dispatch => {
        dispatch(_setPopover(popover));
    }
}

export function onResetPopover() {
    return dispatch => {
        dispatch(_setPopover({ type: '', props: null }));
    }
}