import './StatusBadge.scss';

export const StatusBadge = ({ status }) => {
    const getBadge = () => {
        switch (status) {
            case 'done': return <span className="done">Done</span>
            case 'inProgress': return <span className="in-progress">In progress</span>
            case 'notStarted': return <span className="not-started">Not started</span>
            default: return;
        }
    }
    return (
        <>
            {getBadge()}
        </>
    )
}
