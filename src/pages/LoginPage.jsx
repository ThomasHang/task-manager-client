import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/tasks");
    } catch {
      setError("登录失败");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">登录</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="border p-2 mb-3 w-full rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="用户名"
          />
          <input
            className="border p-2 mb-3 w-full rounded"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密码"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            登录
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          还没有账号？
          <Link to="/register" className="text-blue-500 hover:underline ml-1">
            去注册
          </Link>
        </p>
      </div>
    </div>
  );
}
