import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const res = await api.get("/tasks");
    setTasks(res.data);
  }

  async function addTask() {
    if (!title.trim()) return;
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  }

  async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditCompleted(task.completed);
  }

  async function saveEdit(id) {
    await api.put(`/tasks/${id}`, {
      title: editTitle,
      completed: editCompleted,
    });
    setEditingId(null);
    fetchTasks();
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📝 我的任务</h2>

      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 border border-gray-300 p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="请输入任务标题"
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          添加
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={logout}
        >
          退出
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="bg-white p-4 shadow rounded flex items-center justify-between"
          >
            {editingId === t.id ? (
              <div className="flex-1">
                <input
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={editCompleted}
                    onChange={(e) => setEditCompleted(e.target.checked)}
                  />
                  <label>已完成</label>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(t.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <span className="text-lg">
                    {t.completed ? "✅" : "❌"} {t.title}
                  </span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(t)}
                    className="text-blue-500 hover:underline"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="text-red-500 hover:underline"
                  >
                    删除
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
