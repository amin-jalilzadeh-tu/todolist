const { useState, useEffect } = React;

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, text: input, dueDate, priority } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: input, completed: false, dueDate, priority }]);
    }

    setInput('');
    setDueDate('');
    setPriority('medium');
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    setInput(todos[index].text);
    setDueDate(todos[index].dueDate || '');
    setPriority(todos[index].priority || 'medium');
    setEditIndex(index);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'active') return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const diff =
      (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3);
    if (diff !== 0) return diff;
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">My Todo List</h1>

      <div className="mb-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow border p-2 mr-2 rounded"
          placeholder="Add a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 mr-2 rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          className="border p-2 mr-2 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={addTodo} className="bg-blue-500 text-white p-2 rounded">
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={() => setFilter('all')}
            className={`mr-2 ${filter === 'all' ? 'font-bold' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`mr-2 ${filter === 'active' ? 'font-bold' : ''}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`${filter === 'completed' ? 'font-bold' : ''}`}
          >
            Completed
          </button>
        </div>
        <button onClick={clearCompleted} className="text-sm text-red-500">
          Clear Completed
        </button>
      </div>

      <ul className="list-disc pl-5">
        {sortedTodos.map((todo, index) => (
          <li key={index} className="flex items-center justify-between mb-2">
            <div className="flex flex-col" onClick={() => toggleComplete(index)}>
              <span
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
              >
                {todo.text}
              </span>
              <div className="flex space-x-2">
                {todo.dueDate && (
                  <span className="text-xs text-gray-500">{todo.dueDate}</span>
                )}
                {todo.priority && (
                  <span
                    className={`text-xs ${
                      todo.priority === 'high'
                        ? 'text-red-500'
                        : todo.priority === 'medium'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    }`}
                  >
                    {todo.priority}
                  </span>
                )}
              </div>
            </div>
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

      <p className="text-sm mt-4">{activeCount} tasks left</p>
    </div>
  );
}
