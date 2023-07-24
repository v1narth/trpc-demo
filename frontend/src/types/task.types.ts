export interface Task {
  id: number;
  title: string;
  content: string;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskPayload {
  title: string;
  content: string;
}

export interface UpdateTaskPayload {
  id: number;
  title?: string;
  content?: string;
  isComplete?: boolean;
}
