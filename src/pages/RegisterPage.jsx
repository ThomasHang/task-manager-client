import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/register", { username, password });
      setSuccess(true);
      setError("");
      setTimeout(() => navigate("/login"), 1500); // 注册后 1.5 秒跳转登录页
    } catch {
      setSuccess(false);
      setError("注册失败：用户名可能已存在");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">注册</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && (
          <p className="text-green-600 mb-2">注册成功，正在跳转登录...</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            className="border p-2 mb-3 w-full rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="用户名"
          />
          <input
            className="border p-2 mb-3 w-full rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密码"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            注册
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          已有账号？
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            返回登录
          </Link>
        </p>
      </div>
    </div>
  );
}
