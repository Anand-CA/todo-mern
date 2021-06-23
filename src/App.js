import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import React, { forwardRef } from "react";
import FlipMove from "react-flip-move";
import TodoItem from "./components/TodoItem";

function App() {
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [addAction, setAddAction] = useState(false);
  const searchInput = useRef(null);

  const addTodoList = (e) => {
    e.preventDefault();
    if (input !== "") {
      axios
        .post("http://localhost:9000/add-todo", {
          text: input,
          finished: false,
        })
        .then((response) => {
          if (response.data.addStatus) {
            setDeleted(true);
          }
        });
      setInput("");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:9000/get-todo").then((response) => {
      setTodos(response.data);
      setDeleted(false);
      setAddAction(false);
      setUpdated(false);
    });
  }, [deleted, addAction, updated]);

  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  console.log(deleted);
  const handleDarkMode = () => {
    if (darkMode) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  };

  return (
    <div
      className={`app ${darkMode && "dark bg-black-100"}  flex min-h-screen `}
    >
      {/* container */}
      <div className="w-full max-w-3xl bg-white dark:bg-black-100 mx-auto flex flex-col items-center">
        {/* heading */}
        <div className="flex sm:flex-row flex-col p-8 items-center space-y-4 sm:space-x-3">
          <h1 className="text-5xl dark:text-white">Todo App</h1>
          <button
            onClick={handleDarkMode}
            className="bg-black-100 text-white focus:outline-none dark:bg-white dark:text-black-100 font-semibold px-3 py-2 rounded-full"
          >
            Toggle 🌙
          </button>
        </div>

        {/* search */}
        <div className=" border-2 border-purple-700 px-3">
          <form className="flex" onSubmit={addTodoList}>
            <input
              type="text"
              className="py-2 px-3 bg-transparent dark:text-white focus:outline-none"
              placeholder="Today's note"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="focus:outline-none border-none" type="submit">
              <img
                src={`/images/${
                  darkMode ? "plus-circle-white.svg" : "add-black.svg"
                } `}
                alt=""
              />
            </button>
          </form>
        </div>

        {/* list container */}
        <div className="w-full py-4 px-2">
          <FlipMove enterAnimation="fade" leaveAnimation="fade">
            {todos?.map((todo) => (
              <TodoItem
                key={todo._id}
                id={todo._id}
                text={todo.text}
                setUpdated={setUpdated}
                setDeleted={setDeleted}
              />
            ))}
          </FlipMove>
        </div>
      </div>
    </div>
  );
}

export default App;
