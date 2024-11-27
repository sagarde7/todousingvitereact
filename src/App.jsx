import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('todos')) {
      const savedTodos = JSON.parse(localStorage.getItem('todos'));
      setTodos(savedTodos);
    }
  }, []);

  const saveToLs = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const delFromLS = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  const handleEdit = (e, id) => {
    const t = todos.find((item) => item.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLs(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo('');
    saveToLs(newTodos);
  };

  const handleDel = () => {
    delFromLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLs(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLs(newTodos);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="container  mx-auto my-5 p-5 rounded-xl bg-violet-500 min-h-[92vh] lg:w-1/2 md:w-full">
        <div className="todos">
          <h2 className="font-bold underline text-xl text-center text-white">JUST DO IT</h2>
          <h3 className="ml-10 underline font-bold mb-2 text-white">ADD A TASK</h3>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="rounded-xl h-12 w-4/6"
          />
          <button
            onClick={handleAdd} disabled={todo.length < 3} className="add disabled:bg-slate-400 bg-white ml-8 rounded-md p-3 hover:underline hover:font-bold decoration-blue-400">
            Add
          </button>
          <button
            onClick={handleDel}
            className="add bg-white ml-8 rounded-md p-3 hover:underline hover:font-bold decoration-blue-400"
          >
            Remove All
          </button>

          {todos.map((items) => (
            <div className="todo flex" key={items.id}>
              <input
                onClick={handleCheckbox}
                type="checkbox"
                name={items.id}
                checked={items.isCompleted}
                className="mt-2 mr-5"
              />
              <div
                className={
                  items.isCompleted
                    ? 'line-through text text-lg align-middle mt-1 text-black w-4/6'
                    : 'text text-lg align-middle mt-1 text-white w-4/6'
                }
              >
                {items.todo}
              </div>
              <div className="buttons ml-2 mt-2">
                <button
                  onClick={(e) => handleEdit(e, items.id)}
                  className="mr-2 bg-white rounded-sm w-10"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDelete(e, items.id)}
                  className="bg-white rounded-sm w-14"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
