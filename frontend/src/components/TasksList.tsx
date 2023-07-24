import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { trpc } from '../utils/trpc';

const TasksList = () => {
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
          utils.tasks.invalidate();
          formRef.current?.reset();
        },
      }
    );
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <input name='title' type='text' placeholder='Title' />
        <textarea name='content' placeholder='Content' />
        <button type='submit'>Create</button>
      </form>

      {<div>{createTaskError?.message}</div>}

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
