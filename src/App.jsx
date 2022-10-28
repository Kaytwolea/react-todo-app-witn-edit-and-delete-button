import React, { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "./navbar";

function App() {
  const [todos, setTodos] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [todoIndex, setTodoIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [editing, setEditing] = useState(false);

  const ref = useRef(null);

  const addTodo = useCallback(() => {
    const oldTodo = [...todos];

    if (userInput === " ") {
      return;
    } else {
      const newTodo = {
        id: Math.floor(Math.random() * 1000),
        text: userInput,
      };

      const newTodos = oldTodo.concat(newTodo);
      setTodos(newTodos);
      console.log(todos);
    }

    setUserInput("");
  }, [todos, userInput]);

  const deleteHandler = useCallback(
    (id) => {
      const oldTodos = [...todos];
      const newTodos = oldTodos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    },
    [todos]
  );

  const handleEdit = useCallback((index) => {
    setTodoIndex(index);
    setEditing(true);
  }, []);

  const saveEdit = useCallback(
    (id) => {
      setEditing(false);
      setTodoIndex(null);

      const oldTodos = [...todos];

      const Newtodos = oldTodos.map((todo) => {
        if (todo.id === id) {
          if (editText !== "") {
            todo.text = editText;
          } else {
            return todo;
          }
        }
        return todo;
      });

      setTodos(Newtodos);
    },
    [editText, todos]
  );

  useEffect(() => {
    ref.current.focus();
  });

  return (
    <div>
      <Navbar />
      <div className='h-screen w-full bg-blue-900'>
        <h2 className='text-xl text-white font-semibold pt-4 text-center lg:text-right pr-8'>
          Total Tasks: {todos.length}
        </h2>
        <div className='lg:w-1/2 w-full mx-auto h-auto'>
          <div className='rounded-3xl h-16 w-full bg-white relative'>
            <input
              className='placeholder:text-black text-center text-xl border-none w-[60%] h-full rounded-full'
              type='text'
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              ref={ref}
              placeholder='Enter your Task'
            />
            <button
              onClick={addTodo}
              className='rounded-full w-[37%] h-[80%] my-auto bg-[#F5167E] text-white font-semibold text-xl'>
              Add Task
            </button>
          </div>
          <div className='h-96 w-full mt-6 border-4 border-white rounded-3xl'>
            <div className=''>
              {todos.map((todo, index) => (
                <div className='flex justify-between items-center rounded-lg pl-4 pr-4 text-white mt-4 w-5/6 mx-auto text-xl font-semibold h-14 bg-[#f5167e]'>
                  {editing && todoIndex === index ? (
                    <div className='flex gap-1 w-full'>
                      <input
                        type='text'
                        className='rounded-3xl text-black'
                        defaultValue={todo.text}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className='text-white h-10 w-40'>
                        Save
                      </button>
                    </div>
                  ) : (
                    <h4 key={todo.id}>{todo.text}</h4>
                  )}
                  <div className='flex gap-6'>
                    <button onClick={() => deleteHandler(todo.id)}>
                      <i className='fa fa-trash'></i>
                    </button>
                    <button onClick={() => handleEdit(index)}>
                      <i className='fa-solid fa-pen-to-square'></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;