const initialState = {
    tasks: [],
    tasksInfo: {
        length: 0,
        doneCount: 0,
        inProgressCount: 0,
        notStartedCount: 0,
        filteredLength: 0
    },
    popover: {
        type: '',
        props: null
    },
    filter: {
        page: 1,
        amount: 10,
        sort: {
            by: 'createdAt',
            type: 'descending'
        },
        date: {
            by: 'createdAt',
            from: null,
            to: null
        }
    }

}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TASKS':
            return { ...state, tasks: [...action.tasks] }
        case 'SET_TASKS_INFO':
            return { ...state, tasksInfo: action.tasksInfo }
        case 'SET_POPOVER':
            return { ...state, popover: { ...action.popover } }
        case 'SET_FILTER':
            return { ...state, filter: { ...action.filter } }
        default:
            return state
    }
}