import { RouterInputs, RouterOutputs } from '../utils/trpc';

interface TaskProps {
  task?: RouterOutputs['tasks']['get'];
  onDelete: () => void;
  onUpdate: (payload: RouterInputs['tasks']['update']) => void;
}

const Task = ({ task, onUpdate, onDelete }: TaskProps) => {
  const handleIsCompleteChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!task) return;

    const { checked } = event.currentTarget;
    onUpdate({ id: task.id, isComplete: checked });
  };

  return (
    <div>
      <h2>Task</h2>
      {!task && <div>Loading...</div>}
      {task && (
        <>
          <span>ID: {task.id}</span>
          <div>{task.title}</div>
          <div>{task.content}</div>
          <div className='my-2'>
            <input
              type='checkbox'
              checked={task.isComplete}
              onChange={handleIsCompleteChange}
            />
            <label>Is completed</label>
          </div>

          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Task;
