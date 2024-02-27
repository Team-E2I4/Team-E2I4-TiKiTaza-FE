import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import AuthRoute from './common/AuthRoute/AuthRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<div>연유를 모르는 에러</div>}>
        <AuthRoute>
          <Outlet />
        </AuthRoute>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
