import { useParams } from 'react-router-dom';
import Task from '../../components/Task';
import { trpc } from '../../utils/trpc';

const TaskPage = () => {
  const { id: taskId } = useParams<{ id: string }>();
  const { data: task } = trpc.tasks.get.useQuery({ taskId });
  const { mutate: handleDelete } = trpc.tasks.delete.useMutation();

  return <Task task={task} onDelete={() => handleDelete({ taskId })} />;
};

export default TaskPage;
