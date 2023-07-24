import { NavLink, useNavigate, useParams } from 'react-router-dom';
import TaskComponent from '../../components/Task';
import trpc from '../../utils/trpc';

const TaskPage = () => {
  const utils = trpc.useContext();
  const navigate = useNavigate();
  const { id: taskId } = useParams<{ id: string }>();
  const { data: task } = trpc.tasks.get.useQuery({ taskId });
  const { mutate: handleUpdate } = trpc.tasks.update.useMutation({
    onSuccess: () => {
      utils.tasks.get.invalidate({ taskId });
    },
  });
  const { mutate: handleDelete } = trpc.tasks.delete.useMutation({
    onSuccess: () => {
      navigate('/tasks');
    },
  });

  return (
    <div className='flex justify-center'>
      <div className='w-[50%] p-10'>
        <NavLink className='block mb-12' to='/tasks'>
          Back
        </NavLink>

        <TaskComponent
          task={task}
          onDelete={() => handleDelete({ taskId })}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default TaskPage;
