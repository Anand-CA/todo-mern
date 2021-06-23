import axios from "axios";
import "./TodoItem.css";
import React, { useState, forwardRef } from "react";

const TodoItem = forwardRef(({ id, text, setUpdated, setDeleted }, ref) => {
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState("");
  console.log("id ", id);
  const editTodo = (Id) => {
    console.log("todo id ??", Id);
    if (input !== "") {
      axios
        .post(`http://localhost:9000/update-todo/${Id}`, {
          newText: input,
        })
        .then((res) => {
          if (res.data.updateTodo) {
            setUpdated(true);
            setUpdate(false);
          }
        });
    }
  };

  const deleteTodo = (id) => {
    console.log("id >>>", id);
    axios.get(`http://localhost:9000/delete-todo/${id}`).then((response) => {
      if (response.data.deleteStatus) {
        setDeleted(true);
      }
    });
  };
  return (
    <div
      ref={ref}
      className="row text-white flex font-semibold items-center px-3 py-3 sm:py-5 rounded-md my-3"
    >
      {!update ? (
        <div className="flex w-full">
          <p className="flex-1">{text}</p>
          <div className="flex space-x-3">
            <img
              onClick={() => setUpdate(true)}
              src="/images/edit.svg"
              alt=""
            />

            <img
              onClick={() => deleteTodo(id)}
              src="/images/x-circle.svg"
              alt=""
            />
          </div>
        </div>
      ) : (
        <form
          className="w-full flex"
          onSubmit={(e) => {
            e.preventDefault();
            editTodo(id);
          }}
        >
          <input
            autoFocus={true}
            placeholder={`${text}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="py-1 px-2 flex-1 mr-2 text-black-100"
          />
          <div className="space-x-3">
            <button type="submit">update</button>
            <button onClick={() => setUpdate(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
});

export default TodoItem;
