interface Task {
  id: number;
  title: string;
  content: string;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateTaskPayload {
  title: string;
  content: string;
}
