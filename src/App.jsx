import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';

export default function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? '/tasks' : '/login'} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/tasks"
        element={
          isLoggedIn ? <TaskPage /> : <Navigate to="/login" />
        }
      />
      <Route path="*" element={<h2>404 页面不存在</h2>} />
    </Routes>
  );
}
