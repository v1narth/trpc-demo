import { useRef } from 'react';
import TasksList from '../../components/TasksList';
import trpc from '../../utils/trpc';

const TasksPage = () => {
  const utils = trpc.useContext();
  const formRef = useRef<HTMLFormElement>(null);

  const { data: tasks } = trpc.tasks.list.useQuery();

  const { mutate: createTask, error: createTaskError } =
    trpc.tasks.create.useMutation();

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
          utils.tasks.list.invalidate();
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
