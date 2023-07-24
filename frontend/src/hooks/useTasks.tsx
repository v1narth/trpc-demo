import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  CreateTaskPayload,
  Task,
  UpdateTaskPayload,
} from '../types/task.types';
import axiosInstance from '../utils/axiosInstance';

const getTasksFn = async () => {
  const { data } = await axiosInstance.get<Task[]>('/tasks');
  return data;
};

const getTaskFn = async (taskId?: string) => {
  const { data } = await axiosInstance.get<Task>(`/tasks/${taskId}`);
  return data;
};

const createTaskFn = async (input: CreateTaskPayload) => {
  const { data } = await axiosInstance.post<Task>('/tasks', input);
  return data;
};

const updateTaskFn = async ({ id, ...payload }: UpdateTaskPayload) => {
  const { data } = await axiosInstance.put<Task>(`/tasks/${id}`, payload);
  return data;
};

const deleteTaskFn = async (taskId: string) => {
  const { data } = await axiosInstance.delete<Task>(`/tasks/${taskId}`);
  return data;
};

const useTasksQuery = () => {
  return useQuery<Task[], Error>(['tasks'], getTasksFn);
};

const useTaskQuery = (taskId?: string) => {
  return useQuery<Task, Error>(['tasks', taskId], () => getTaskFn(taskId));
};

const useCreateTaskMutation = () => {
  return useMutation<Task, Error, CreateTaskPayload>(createTaskFn);
};

const useUpdateTaskMutation = (
  options?: UseMutationOptions<Task, Error, UpdateTaskPayload>
) => {
  return useMutation<Task, Error, UpdateTaskPayload>(updateTaskFn, options);
};

const useDeleteTaskMutation = (
  options?: UseMutationOptions<Task, Error, string>
) => {
  return useMutation<Task, Error, string>(deleteTaskFn, options);
};

const useTasks = () => {
  return {
    useTaskQuery,
    useTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
  };
};

export default useTasks;
