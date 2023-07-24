import { NavLink, useNavigate, useParams } from 'react-router-dom';
import TaskComponent from '../../components/Task';
import useTasks from '../../hooks/useTasks';
import { useQueryClient } from '@tanstack/react-query';

const TaskPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: taskId } = useParams<{ id: string }>();
  const { useTaskQuery, useUpdateTaskMutation, useDeleteTaskMutation } =
    useTasks();
  const { data: task } = useTaskQuery(taskId);
  const { mutate: handleUpdate } = useUpdateTaskMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', taskId]);
    },
  });
  const { mutate: handleDelete } = useDeleteTaskMutation({
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
          onDelete={() => handleDelete(String(task?.id))}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default TaskPage;
