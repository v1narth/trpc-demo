import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from './pages';
import TaskPage from './pages/tasks/id';
import TasksPage from './pages/tasks';

function App() {
  const [queryClient] = useState(() => new QueryClient());

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Index />,
    },
    {
      path: '/tasks',
      element: <TasksPage />,
    },
    {
      path: '/tasks/:id',
      element: <TaskPage />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
