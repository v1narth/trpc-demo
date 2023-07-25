import { useRef } from 'react';
import TasksList from '../../components/TasksList';
import { useQueryClient } from '@tanstack/react-query';
import useTasks from '../../hooks/useTasks';

const TasksPage = () => {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const { useTasksQuery, useCreateTaskMutation } = useTasks();
  const { data: tasks } = useTasksQuery();
  const { mutate: createTask, error: createTaskError } =
    useCreateTaskMutation();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, content } = e.currentTarget.elements as unknown as {
      title: HTMLInputElement;
      content: HTMLTextAreaElement;
    };

    createTask(
      { title: title.value, content: content.value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['tasks']);
          formRef.current?.reset();
        },
      }
    );
  };
  return (
    <div className='flex justify-center p-10'>
      <div className='w-[50%]'>
        <form
          className='flex flex-col gap-2'
          ref={formRef}
          onSubmit={handleFormSubmit}
        >
          <input
            className='border'
            name='title'
            type='text'
            placeholder='Title'
          />
          <textarea className='border' name='content' placeholder='Content' />
          <button className='border' type='submit'>
            Create
          </button>
        </form>

        <div className='text-red-500'>{createTaskError?.message}</div>
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
};

export default TasksPage;
