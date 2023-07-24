import { NavLink } from 'react-router-dom';
import { RouterOutputs } from '../utils/trpc';

interface TasksListProps {
  tasks?: RouterOutputs['tasks']['list'];
}

const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <div>
      {tasks?.map((task) => (
        <div>
          <NavLink to={`/tasks/${task.id}`} key={task.id}>
            {task.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
