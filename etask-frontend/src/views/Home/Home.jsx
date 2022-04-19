import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TaskList } from '../../cmps/TaskList/TaskList';
import { loadTasks, onSetFilter, onSetPopover } from '../../store/actions/app.actions';
import { useEffect } from 'react';
import { Pagination } from '@mui/material';
import { DateFilter } from '../../cmps/DateFilter/DateFilter';
import { Pie } from '../../cmps/Pie/Pie';

export const Home = () => {

  const dispatch = useDispatch();
  const { tasks, tasksInfo, filter } = useSelector(state => state.appModule);


  useEffect(() => {
    dispatch(loadTasks(filter))
  }, [dispatch, filter]);

  const onAddTask = () => {
    dispatch(onSetPopover({ type: 'saveTask', props: null }));
  }

  const handlePagination = (ev, value) => {
    dispatch(onSetFilter({ ...filter, page: value }));
  }

  const { amount } = filter;
  const { doneCount, length } = tasksInfo;

  return (
    <div className="home">
      <div className="information">
        <Pie done={doneCount} total={length} />
        <div className="pie-info">
          <h6>Total: {length}</h6>
          <h6>Completed: {doneCount}</h6>
          <h6>Remaining: {length - doneCount}</h6>
        </div>
      </div>

      <div className="tasks-options">
        <button className="add-task-btn clean-btn" onClick={onAddTask}><span>Create a Task</span></button>

        <DateFilter />
      </div>


      <TaskList tasks={tasks} filter={filter} />
      <Pagination
        className="task-pagination"
        onChange={handlePagination}
        variant="outlined"
        shape="rounded"
        page={filter?.page}
        count={Math.ceil(tasksInfo.filteredLength / amount) <= 1 ? 0 : Math.ceil(tasksInfo.filteredLength / amount)}
      />
    </div >
  )
}
