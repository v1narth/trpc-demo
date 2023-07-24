import { NavLink } from 'react-router-dom';
import { Task } from '../types/task.types';

interface TasksListProps {
  tasks?: Task[];
}

const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <div>
      {tasks?.map((task) => (
        <div className={task.isComplete ? 'line-through' : ''} key={task.id}>
          <NavLink className='text-slate-900' to={`/tasks/${task.id}`}>
            {task.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
