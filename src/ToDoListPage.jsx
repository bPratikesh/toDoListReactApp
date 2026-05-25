import React from "react";
import { useState } from "react";
import ToDoItem from "./ToDoItem";

const ToDoListPage = () => {
  const [todos, setTodos] = useState([]);

  function handleFormSubmit(e) {
    e.preventDefault(); //for some browser on click of submit button the page refreshes, to avoid that call preventDefault method
    const toDoText = e.target["todo"].value;
    console.log(toDoText);
    const newTodos = [
      ...todos,
      {
        text: toDoText,
        id: crypto.randomUUID(),
        completed: false,
      },
    ];
    setTodos(newTodos);
    e.target.reset();
  }

  function handleOnToDoToggleIsChecked(id, checked) {
    const newToDos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: checked };
      }
      return item;
    });
    setTodos(newToDos);
  }

  function handleOnToDoDelete(id) {
    const newToDos = todos.filter((item) => item.id !== id);
    setTodos(newToDos);
  }

  const emptyState = <h3>Nothing is here, Add a Todo</h3>;

  return (
    <div>
      <h1>Super To Do</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="todo" placeholder="Enter your todo here..." />
        <button>Submit</button>
      </form>

      {todos.length > 0 ? (
        <div>
          {todos.map((item) => (
            <ToDoItem
              key={item.id}
              item={item}
              onToDoToggleIsChecked={handleOnToDoToggleIsChecked}
              onToDoDelete={handleOnToDoDelete}
            />
          ))}
        </div>
      ) : (
        emptyState
      )}
    </div>
  );
};

export default ToDoListPage;
