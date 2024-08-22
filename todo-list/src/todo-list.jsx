import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3001/todos');
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const newTask = {
      title: newTodo,
      completed: false,
    };

    const response = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      fetchTodos();
      setNewTodo("");
    }
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchTodos();
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    if (response.ok) {
      fetchTodos();
    }
  };

  const startEditing = (id, currentTitle) => {
    setEditingId(id);
    setEditedTodo(currentTitle);
  };

  const saveTodo = async (id) => {
    const updatedTodo = { title: editedTodo, completed: false };
    await updateTodo(id, updatedTodo);
    setEditingId(null);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <button onClick={() => saveTodo(todo.id)}>Salvar</button>
              </>
            ) : (
              <>
                <span className="task-title">{todo.title}</span>
                <div>
                  <button className="edit" onClick={() => startEditing(todo.id, todo.title)}>
                    Editar
                  </button>
                  <button className="delete" onClick={() => deleteTodo(todo.id)}>Deletar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
