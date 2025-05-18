import React, { useState, useEffect } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, text: input } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: input, completed: false }]);
    }

    setInput('');
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    setInput(todos[index].text);
    setEditIndex(index);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">My Todo List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow border p-2 mr-2 rounded"
          placeholder="Add a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo} className="bg-blue-500 text-white p-2 rounded">
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <ul className="list-disc pl-5">
        {todos.map((todo, index) => (
          <li key={index} className="flex items-center justify-between mb-2">
            <span
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
              onClick={() => toggleComplete(index)}
            >
              {todo.text}
            </span>
            <div>
              <button onClick={() => editTodo(index)} className="text-sm text-green-500 mr-2">
                Edit
              </button>
              <button onClick={() => deleteTodo(index)} className="text-sm text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
