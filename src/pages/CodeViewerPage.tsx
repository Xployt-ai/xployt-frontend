"use client";

import CodeViewer from "@/components/CodeViewer";
import FileTree from "@/components/FileTree";

const files = [
  { name: "index.tsx", type: "file" },
  { name: "App.tsx", type: "file" },
  {
    name: "components",
    type: "folder",
    children: [
      { name: "CodeViewer.tsx", type: "file" },
      { name: "Sidebar.tsx", type: "file" },
    ],
  },
];

export default function CodeViewerPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-700  p-4">
        <h4 className="text-gray-100 font-semibold mb-4">Files</h4>
        <FileTree files={files} />
      </aside>

      {/* Main Code Viewer */}
      <main className="flex-1 p-6 ">
<CodeViewer
  code={`import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`}
  language="typescript"
  errors={[{ line: 5, message: "Missing return type on function" }]}
/>
      </main>
    </div>
  );
}
