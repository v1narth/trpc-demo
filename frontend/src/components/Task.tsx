import { NavLink } from 'react-router-dom';

interface TaskProps {
  task?: Task;
  onDelete: () => void;
}

const Task = ({ task, onDelete }: TaskProps) => {
  return (
    <div>
      <NavLink to='/tasks'>Back</NavLink>

      <h2>Task</h2>
      {!task && <div>Loading...</div>}
      {task && (
        <>
          <span>ID: {task.id}</span>
          <div>{task.title}</div>

          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Task;
