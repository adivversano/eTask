export const utilService = {
    formatStatus
}

function formatStatus(string) {
    switch (string) {
        case 'notStarted': return 'Not started';
        case 'inProgress': return 'In progress';
        case 'done': return 'Done';
        default: return '';
    }
}