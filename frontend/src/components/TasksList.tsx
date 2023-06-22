import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';
import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';

const TasksList = () => {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const { data: tasks } = useQuery(['tasks'], async () => {
    const { data } = await axiosInstance.get<Task[]>('/tasks');
    return data;
  });

  const { mutate: createTask } = useMutation(
    async ({ title, content }: CreateTaskPayload) => {
      const { data } = await axiosInstance.post<Task>('/tasks', {
        title,
        content,
      });
      return data;
    }
  );

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
    <div>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <input name='title' type='text' placeholder='Title' />
        <textarea name='content' placeholder='Content' />
        <button type='submit'>Create</button>
      </form>

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
