import { useParams } from 'react-router-dom';
import Task from '../../components/Task';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axiosInstance';

const TaskPage = () => {
  const { id: taskId } = useParams<{ id: string }>();
  const { data: task } = useQuery(['tasks', taskId], async () => {
    const { data } = await axiosInstance.get<Task>(`/tasks/${taskId}`);
    return data;
  });
  const { mutate: handleDelete } = useMutation(async () => {
    const { data } = await axiosInstance.delete<Task>(`/tasks/${taskId}`);
    return data;
  });

  return <Task task={task} onDelete={handleDelete} />;
};

export default TaskPage;
