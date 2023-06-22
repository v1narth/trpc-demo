import { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from './pages';
import TaskPage from './pages/tasks/id';
import TasksPage from './pages/tasks';
import { trpc } from './utils/trpc';
import { httpBatchLink } from '@trpc/client';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3005/trpc',
        }),
      ],
    });
  });

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
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
