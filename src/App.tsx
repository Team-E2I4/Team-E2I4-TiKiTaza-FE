import './index.css';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
